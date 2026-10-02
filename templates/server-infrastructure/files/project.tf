terraform {
  required_version = ">= 1.8.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 8.0"
    }
  }
}

resource "google_project" "project" {
  name              = var.project_name
  project_id        = var.project_id
  billing_account   = var.billing_account
}