output "vm_public_ip" {
  value       = google_compute_address.static_ip.address
  description = "Public static IP of VM"
}