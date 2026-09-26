variable "project_id" {
  type        = string
  description = "GCP project ID where resources are managed."
}

variable "location" {
  type        = string
  description = "GCP region for Cloud Build trigger."
}

variable "npm_repository_id" {
  type        = string
  description = "Name of the Artifact Registry repository for npm."
}

variable "npm_secret_name" {
  type        = string
  description = "Name of the secret in Secret Manager for the npm token."
}
