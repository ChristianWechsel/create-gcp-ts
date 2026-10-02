resource "google_artifact_registry_repository" "docker_repo" {
  project       = google_project.project.project_id
  location      = var.location
  repository_id = "docker-repo"
  description   = "Docker Repository for ${var.project_name}"
  format        = "DOCKER"                 

  depends_on = [
    module.project_services
  ]
}