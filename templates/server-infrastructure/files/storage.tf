resource "google_storage_bucket" "file_storage" {
  name          = "${google_project.project.project_id}-storage"
  location      = var.location
  project       = google_project.project.project_id
  
  uniform_bucket_level_access  = true
  public_access_prevention     = "enforced"

  depends_on = [google_project.project]
}