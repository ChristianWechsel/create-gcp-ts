resource "google_storage_bucket" "file_storage" {
  name          = "${var.project_id}-storage"
  location      = var.location
  project       = var.project_id
  
  uniform_bucket_level_access  = true
  public_access_prevention     = "enforced"
}