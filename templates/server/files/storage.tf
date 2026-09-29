resource "google_storage_bucket" "storage" {
  name          = "${var.name_prefix}-storage"
  location      = var.location
  
  uniform_bucket_level_access = true

  cors {
    origin          = var.cors_allowed_origins
    method          = ["GET", "PUT", "OPTIONS"]
    response_header = ["Content-Type"]
    max_age_seconds = 3600
  }
}