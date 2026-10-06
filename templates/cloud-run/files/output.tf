output "cloud_run_url" {
  description = "Official Standard-URL of Cloud Run Service"
  value       = google_cloud_run_v2_service.resizer_service.uri
}