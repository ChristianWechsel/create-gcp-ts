variable "project_name" {
  type        = string
  description = "Human-readable display name"
}

variable "project_id" {
  type        = string
  description = "Globally unique ID (a-z, 0-9, -)"
}

variable "billing_account" {
  type        = string
  description = "Billing Account"
}

variable "location" {
  type        = string
  description = "GCP Region"
}