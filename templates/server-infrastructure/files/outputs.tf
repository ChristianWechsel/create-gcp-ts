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

output "storage_bucket_name" {
  value       = google_storage_bucket.file_storage.name
  description = "GCP Storage Bucket name (pass to server template .env as BUCKET_NAME)"
}
