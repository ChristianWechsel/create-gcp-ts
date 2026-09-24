locals {
  trigger_name = "${var.github_repo_name}-push-trigger"
}

provider "google" {
  project = var.project_id
  region  = var.region 
}

resource "google_project_service" "artifact_registry_api" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild_api" {
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "secretmanager_api" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "npm_repo" {
  location      = var.region
  repository_id = var.npm_repository_id
  description   = "Central npm repository for internal TypeScript packages"
  format        = "NPM"
  
  depends_on = [google_project_service.artifact_registry_api]
}

resource "google_service_account" "cloudbuild_sa" {
  account_id   = "cloudbuild-npm-publisher"
  display_name = "Cloud Build – NPM Publisher"
  project      = var.project_id
}

resource "google_artifact_registry_repository_iam_member" "cloudbuild_ar_writer" {
  location   = var.region
  repository = google_artifact_registry_repository.npm_repo.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${google_service_account.cloudbuild_sa.email}"
}

resource "google_project_iam_member" "cloudbuild_log_writer" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.cloudbuild_sa.email}"
}

resource "google_project_iam_member" "cloudbuild_storage_viewer" {
  project = var.project_id
  role    = "roles/storage.objectViewer"
  member  = "serviceAccount:${google_service_account.cloudbuild_sa.email}"
}

resource "google_cloudbuild_trigger" "main_branch_trigger" {
  name            = local.trigger_name
  location        = var.region
  description     = "Starts Cloud Build on every push to ${var.target_branch}"
  service_account = google_service_account.cloudbuild_sa.id
  repository_event_config {
    repository = "projects/${var.project_id}/locations/${var.region}/connections/${var.github_connection_name}/repositories/${var.gcp_repository_name}"
    
    push {
      branch = "^${var.target_branch}$"
    }
  }

  filename = "cloudbuild.yaml"

  depends_on = [google_project_service.cloudbuild_api]
}