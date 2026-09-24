variable "project_id" {
  description = "GCP project ID where resources are created."
  type        = string
}

variable "region" {
  description = "GCP region for resources such as Artifact Registry and Cloud Build."
  type        = string
  default     = "europe-west3"
}

variable "github_connection_name" {
  description = "Name of the existing GitHub connection (Cloud Build 2nd Gen)."
  type        = string
}

variable "github_repo_name" {
  description = "Name of the connected GitHub repository."
  type        = string
}

variable "gcp_repository_name" {
  description = "Cloud Build repository resource name from the Name column in the GCP console."
  type        = string
}

variable "target_branch" {
  description = "Branch that triggers Cloud Build when receiving a push."
  type        = string
  default     = "main"
}

variable "npm_repository_id" {
  description = "Artifact Registry repository ID for npm packages."
  type        = string
  default     = "shared-npm-repo"
}
