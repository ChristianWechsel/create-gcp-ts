output "project_id" {
  value       = google_project.project.project_id
  description = "GCP Project ID"
}

output "location" {
  value       = var.location
  description = "GCP Region / Location"
}

output "zone" {
  value       = "${var.location}-a"
  description = "Recommended default GCP Zone"
}

output "docker_repository" {
  value       = google_artifact_registry_repository.docker_repo.repository_id
  description = "Artifact Registry Docker repository ID (pass to server template as repository)"
}

output "docker_registry_url" {
  value       = "${var.location}-docker.pkg.dev/${google_project.project.project_id}/${google_artifact_registry_repository.docker_repo.repository_id}"
  description = "Full Docker registry URL for container images"
}

output "storage_bucket_name" {
  value       = google_storage_bucket.file_storage.name
  description = "GCP Storage Bucket name (pass to server template .env as BUCKET_NAME)"
}

output "cloudbuild_service_account" {
  value       = google_service_account.cloudbuild_custom_sa.email
  description = "Email of the dedicated Cloud Build Service Account"
}
