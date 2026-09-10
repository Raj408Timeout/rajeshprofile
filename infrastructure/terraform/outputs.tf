# =====================================================================
# Rajesh Profile Portal — Terraform Outputs
# These values are used by CI/CD pipelines and deployment scripts
# =====================================================================

output "container_registry_url" {
  description = "The login server URL for the Azure Container Registry. Use this to push/pull Docker images."
  value       = azurerm_container_registry.main.login_server
}

output "container_registry_name" {
  description = "The name of the Azure Container Registry resource."
  value       = azurerm_container_registry.main.name
}

output "postgresql_fqdn" {
  description = "The fully qualified domain name of the PostgreSQL Flexible Server. Used to construct DATABASE_URL."
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

output "postgresql_server_name" {
  description = "The name of the PostgreSQL Flexible Server resource."
  value       = azurerm_postgresql_flexible_server.main.name
}

output "storage_account_name" {
  description = "The name of the Azure Blob Storage account."
  value       = azurerm_storage_account.main.name
}

output "storage_account_primary_endpoint" {
  description = "The primary blob service endpoint URL for the storage account."
  value       = azurerm_storage_account.main.primary_blob_endpoint
}

output "key_vault_uri" {
  description = "The URI of the Azure Key Vault. Use this to reference secrets at runtime."
  value       = azurerm_key_vault.main.vault_uri
}

output "key_vault_name" {
  description = "The name of the Azure Key Vault resource."
  value       = azurerm_key_vault.main.name
}

output "static_web_app_url" {
  description = "The default hostname of the Azure Static Web App hosting the Angular portal."
  value       = "https://${azurerm_static_web_app.angular_portal.default_host_name}"
}

output "static_web_app_api_key" {
  description = "The deployment API key for the Static Web App. Used in the GitHub Actions deploy workflow."
  value       = azurerm_static_web_app.angular_portal.api_key
  sensitive   = true
}

output "profile_service_url" {
  description = "The fully qualified domain name of the Profile Service Container App."
  value       = "https://${azurerm_container_app.profile_service.ingress[0].fqdn}"
}

output "ai_service_url" {
  description = "The fully qualified domain name of the AI Orchestration Service Container App."
  value       = "https://${azurerm_container_app.ai_service.ingress[0].fqdn}"
}

output "application_insights_instrumentation_key" {
  description = "Application Insights instrumentation key for SDK initialization in all services."
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

output "application_insights_connection_string" {
  description = "Application Insights connection string (preferred over instrumentation key for newer SDKs)."
  value       = azurerm_application_insights.main.connection_string
  sensitive   = true
}

output "resource_group_name" {
  description = "The name of the resource group containing all project resources."
  value       = azurerm_resource_group.main.name
}
