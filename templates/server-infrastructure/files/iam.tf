# ==============================================================================
# Service Account for Build (Cloud Build Triggers)
# ==============================================================================

resource "google_service_account" "cloudbuild_custom_sa" {
  project      = google_project.project.project_id
  account_id   = "cloudbuild-custom-sa"
  display_name = "Cloud Build Service Account"
  description  = "Dedicated account for Cloud Build Triggers (User-managed)"

  depends_on = [module.project_services]
}

resource "google_project_iam_member" "cb_logging" {
  project = google_project.project.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.cloudbuild_custom_sa.email}"
}

resource "google_project_iam_member" "cb_artifact_writer" {
  project = google_project.project.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.cloudbuild_custom_sa.email}"
}

resource "google_project_iam_member" "cb_secret_accessor" {
  project = google_project.project.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.cloudbuild_custom_sa.email}"
}
