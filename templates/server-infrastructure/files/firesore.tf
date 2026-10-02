resource "google_firestore_database" "default_db" {
    project     = google_project.project.project_id
    name        = "(default)"
    location_id = var.location
    type        = "FIRESTORE_NATIVE"
    
    depends_on = [module.project_services]
}