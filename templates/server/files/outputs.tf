output "vm_public_ip" {
  value       = google_compute_address.static_ip.address
  description = "Die statische oeffentliche IP-Adresse der VM"
}