module "project_services" {
  source  = "terraform-google-modules/project-factory/google//modules/project_services"
  version = "~> 18.3"

  project_id                  = google_project.project.project_id
  enable_apis                 = true
  
  activate_apis = [
    "compute.googleapis.com",
    "cloudbuild.googleapis.com",
    "secretmanager.googleapis.com",
    "firestore.googleapis.com",
    "artifactregistry.googleapis.com"
  ]

  depends_on = [google_project.project]
}

