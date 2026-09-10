# =====================================================================
# Rajesh Profile Portal — Terraform Variables
# =====================================================================

variable "environment" {
  type        = string
  description = "Deployment environment. Used in resource naming and tagging."
  default     = "production"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "environment must be one of: development, staging, production."
  }
}

variable "location" {
  type        = string
  description = "Azure region for all resources. Defaults to East US 2 for cost efficiency and availability."
  default     = "eastus2"
}

variable "project_name" {
  type        = string
  description = "Project name used as prefix in all resource names. Must be lowercase with hyphens only."
  default     = "rajesh-profile"

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]{2,20}[a-z0-9]$", var.project_name))
    error_message = "project_name must be 4-22 characters, lowercase alphanumeric and hyphens only, starting and ending with a letter or number."
  }
}

variable "db_admin_username" {
  type        = string
  description = "Administrator username for the PostgreSQL Flexible Server. Cannot be 'postgres', 'admin', or 'root'."
  default     = "rajeshdbadmin"

  validation {
    condition     = !contains(["postgres", "admin", "root", "administrator", "sa", "guest"], var.db_admin_username)
    error_message = "db_admin_username cannot be a reserved username (postgres, admin, root, etc.)."
  }
}

variable "db_sku_name" {
  type        = string
  description = "SKU for the PostgreSQL Flexible Server. B1ms is the lowest cost option suitable for a personal project."
  default     = "B_Standard_B1ms"

  # Available SKUs for reference:
  # B_Standard_B1ms  - 1 vCPU, 2 GB RAM  (~$12/month) — suitable for this project
  # B_Standard_B2s   - 2 vCPU, 4 GB RAM  (~$25/month)
  # GP_Standard_D2s_v3 - 2 vCPU, 8 GB RAM (~$93/month) — production-grade
}

variable "acr_sku" {
  type        = string
  description = "SKU for the Azure Container Registry."
  default     = "Basic"

  validation {
    condition     = contains(["Basic", "Standard", "Premium"], var.acr_sku)
    error_message = "acr_sku must be one of: Basic, Standard, Premium."
  }

  # Basic: 10 GB storage, 2 webhooks — sufficient for personal project
  # Standard: 100 GB storage, 10 webhooks — needed for team collaboration
  # Premium: 500 GB storage, geo-replication — enterprise use
}
