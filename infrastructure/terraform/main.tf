# =====================================================================
# Rajesh Profile Portal — Azure Infrastructure
# Provider: hashicorp/azurerm ~> 3.100
# =====================================================================

terraform {
  required_version = ">= 1.7.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # Store state in Azure Blob Storage for collaboration and safety
  # backend "azurerm" {
  #   resource_group_name  = "rajesh-profile-tfstate-rg"
  #   storage_account_name = "rajeshtfstate"
  #   container_name       = "tfstate"
  #   key                  = "prod.terraform.tfstate"
  # }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = false
      recover_soft_deleted_key_vaults = true
    }
    resource_group {
      prevent_deletion_if_contains_resources = true
    }
  }
}

# Retrieve current Azure client configuration (used for Key Vault access policies)
data "azurerm_client_config" "current" {}

# Random suffix to ensure globally unique resource names
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# =====================================================================
# Resource Group — Container for all project resources
# =====================================================================
resource "azurerm_resource_group" "main" {
  name     = "${var.project_name}-rg"
  location = var.location

  tags = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
    owner       = "rajeshkumar-kalaimani"
  }
}

# =====================================================================
# Azure Container Registry — Store Docker images for all services
# =====================================================================
resource "azurerm_container_registry" "main" {
  name                = "${replace(var.project_name, "-", "")}${random_string.suffix.result}acr"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = var.acr_sku
  admin_enabled       = true

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# =====================================================================
# Log Analytics Workspace — Required for Container Apps and App Insights
# =====================================================================
resource "azurerm_log_analytics_workspace" "main" {
  name                = "${var.project_name}-logs"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# =====================================================================
# Application Insights — Distributed tracing and performance monitoring
# =====================================================================
resource "azurerm_application_insights" "main" {
  name                = "${var.project_name}-appinsights"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  workspace_id        = azurerm_log_analytics_workspace.main.id
  application_type    = "web"

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# =====================================================================
# Azure Container Apps Environment — Shared environment for all containers
# =====================================================================
resource "azurerm_container_app_environment" "main" {
  name                       = "${var.project_name}-cae"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# =====================================================================
# Profile Service — Container App
# =====================================================================
resource "azurerm_container_app" "profile_service" {
  name                         = "${var.project_name}-profile-svc"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.main.login_server
    username             = azurerm_container_registry.main.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.main.admin_password
  }

  secret {
    name  = "database-url"
    value = "postgresql://${var.db_admin_username}:${random_password.db_password.result}@${azurerm_postgresql_flexible_server.main.fqdn}:5432/rajesh_profile_prod?sslmode=require"
  }

  template {
    min_replicas = 0
    max_replicas = 3

    container {
      name   = "profile-service"
      image  = "${azurerm_container_registry.main.login_server}/profile-service:latest"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name        = "DATABASE_URL"
        secret_name = "database-url"
      }

      liveness_probe {
        path             = "/health"
        port             = 3001
        transport        = "HTTP"
        initial_delay    = 15
        interval_seconds = 30
      }
    }
  }

  ingress {
    external_enabled = true
    target_port      = 3001

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# =====================================================================
# AI Orchestration Service — Container App
# =====================================================================
resource "azurerm_container_app" "ai_service" {
  name                         = "${var.project_name}-ai-svc"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.main.login_server
    username             = azurerm_container_registry.main.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.main.admin_password
  }

  template {
    min_replicas = 0
    max_replicas = 2

    container {
      name   = "ai-orchestration-service"
      image  = "${azurerm_container_registry.main.login_server}/ai-orchestration-service:latest"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      liveness_probe {
        path             = "/health"
        port             = 3002
        transport        = "HTTP"
        initial_delay    = 15
        interval_seconds = 30
      }
    }
  }

  ingress {
    external_enabled = true
    target_port      = 3002

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# =====================================================================
# PostgreSQL Flexible Server — Primary relational database
# =====================================================================

# Generate a secure random password for the database
resource "random_password" "db_password" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
  min_special      = 2
  min_upper        = 4
  min_lower        = 4
  min_numeric      = 4
}

resource "azurerm_postgresql_flexible_server" "main" {
  name                          = "${var.project_name}-pg-${random_string.suffix.result}"
  resource_group_name           = azurerm_resource_group.main.name
  location                      = azurerm_resource_group.main.location
  version                       = "16"
  administrator_login           = var.db_admin_username
  administrator_password        = random_password.db_password.result
  storage_mb                    = 32768     # 32 GB
  sku_name                      = var.db_sku_name
  backup_retention_days         = 7
  geo_redundant_backup_enabled  = false     # Set true for production HA
  public_network_access_enabled = true      # Restrict to Container Apps IP in production

  high_availability {
    mode = "Disabled"  # Enable for production: "ZoneRedundant"
  }

  maintenance_window {
    day_of_week  = 0  # Sunday
    start_hour   = 2  # 2 AM UTC
    start_minute = 0
  }

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# Primary database within the PostgreSQL server
resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = "rajesh_profile_prod"
  server_id = azurerm_postgresql_flexible_server.main.id
  collation = "en_US.utf8"
  charset   = "utf8"
}

# Firewall rule: allow Azure services to connect (Container Apps uses Azure IPs)
resource "azurerm_postgresql_flexible_server_firewall_rule" "azure_services" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# =====================================================================
# Azure Storage Account — Resume PDF storage, file uploads
# =====================================================================
resource "azurerm_storage_account" "main" {
  name                     = "${replace(var.project_name, "-", "")}${random_string.suffix.result}st"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"  # Locally redundant — use GRS for production HA
  min_tls_version          = "TLS1_2"

  blob_properties {
    versioning_enabled = true

    delete_retention_policy {
      days = 7
    }
  }

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# Container for generated resume PDF files
resource "azurerm_storage_container" "resumes" {
  name                  = "generated-resumes"
  storage_account_name  = azurerm_storage_account.main.name
  container_access_type = "private"
}

# =====================================================================
# Azure Key Vault — Secrets management (API keys, DB credentials)
# =====================================================================
resource "azurerm_key_vault" "main" {
  name                        = "${var.project_name}-kv-${random_string.suffix.result}"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  enabled_for_disk_encryption = false
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false  # Set true for production
  sku_name                    = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge", "Recover"
    ]
  }

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}

# Store database password in Key Vault
resource "azurerm_key_vault_secret" "db_password" {
  name         = "db-admin-password"
  value        = random_password.db_password.result
  key_vault_id = azurerm_key_vault.main.id

  depends_on = [azurerm_key_vault.main]
}

# Store App Insights connection string in Key Vault
resource "azurerm_key_vault_secret" "appinsights_connection" {
  name         = "appinsights-connection-string"
  value        = azurerm_application_insights.main.connection_string
  key_vault_id = azurerm_key_vault.main.id

  depends_on = [azurerm_key_vault.main]
}

# =====================================================================
# Azure Static Web Apps — Angular portal hosting
# Provides: Global CDN, automatic SSL, PR preview deployments
# =====================================================================
resource "azurerm_static_web_app" "angular_portal" {
  name                = "${var.project_name}-angular-portal"
  resource_group_name = azurerm_resource_group.main.name
  location            = "eastus2"  # Static Web Apps has limited region support
  sku_tier            = "Free"     # Free tier sufficient for personal portfolio
  sku_size            = "Free"

  tags = {
    project     = var.project_name
    environment = var.environment
  }
}
