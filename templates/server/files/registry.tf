resource "google_artifact_registry_repository" "repo" {
  provider      = google
  location      = var.location
  repository_id = "${var.name_prefix}-repo"
  description   = "Docker Repository for ${var.name_prefix}"
  format        = "DOCKER"                 

  depends_on = [
    module.project_services
  ]
}