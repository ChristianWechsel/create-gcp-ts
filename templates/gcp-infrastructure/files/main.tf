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
  format        = "NPM"
  
  depends_on = [google_project_service.artifact_registry_api]
}

resource "google_service_account" "cloudbuild_sa" {
  account_id   = var.account_id
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

resource "google_secret_manager_secret_iam_member" "cloudbuild_secret_accessor" {
  secret_id = var.npm_secret_name
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloudbuild_sa.email}"
}