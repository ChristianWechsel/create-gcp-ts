variable "project_id" {
  description = "Die GCP Projekt-ID, in der die Ressourcen erstellt werden."
  type        = string
}

variable "region" {
  description = "Die GCP Region für Ressourcen wie Artifact Registry und Cloud Build."
  type        = string
  default     = "europe-west3"
}

variable "github_connection_name" {
  description = "Name der bestehenden GitHub-Verbindung (Cloud Build 2nd Gen)."
  type        = string
}

variable "github_repo_name" {
  description = "Name des verknüpften GitHub-Repositories."
  type        = string
}

variable "gcp_repository_name" {
  description = "Name der Repository-Ressource in Cloud Build (aus Spalte 'Name' in der GCP-Konsole)."
  type        = string
}

variable "target_branch" {
  description = "Branch, auf den der Cloud Build Trigger reagieren soll."
  type        = string
  default     = "main"
}

variable "npm_repository_id" {
  description = "ID des Artifact Registry Repositories für NPM-Pakete."
  type        = string
  default     = "shared-npm-repo"
}
