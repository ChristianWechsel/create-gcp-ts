# Google Cloud Project Baseline Infrastructure for Server Deployments

This Terraform project provisions a dedicated Google Cloud Platform (GCP) project and the baseline cloud resources required to host and run backend server workloads (such as instances scaffolded with the `server` template).

---

## What This Provisions

This configuration sets up the foundational GCP environment and shared resources:

1. **Google Cloud Project & Billing Binding**:
   - Creates a new GCP project (`google_project`) linked to your specified billing account.
2. **GCP API Enablement**:
   - `compute.googleapis.com` (Compute Engine)
   - `cloudbuild.googleapis.com` (Cloud Build)
   - `secretmanager.googleapis.com` (Secret Manager)
   - `firestore.googleapis.com` (Cloud Firestore)
   - `artifactregistry.googleapis.com` (Artifact Registry)
3. **Artifact Registry Docker Repository**:
   - Docker repository (`docker-repo`) for storing container images deployed to your server(s).
4. **Cloud Firestore**:
   - Native mode Firestore database (`(default)`) in the designated region.
5. **Cloud Storage Bucket**:
   - Secure bucket (`<project_id>-storage`) with uniform bucket-level access and public access prevention enforced.
6. **Dedicated Cloud Build Service Account & IAM Roles**:
   - Service account (`cloudbuild-custom-sa`) for user-managed Cloud Build triggers.
   - IAM role bindings:
     - `roles/logging.logWriter`: Grants permission to write build logs.
     - `roles/artifactregistry.writer`: Grants permission to push Docker images.
     - `roles/secretmanager.secretAccessor`: Grants permission to access build-time secrets.

---

## Prerequisites

1. **Google Cloud SDK (`gcloud`)**:
   Authenticated with administrative permissions to create projects and link billing accounts:

   ```shell
   gcloud auth login
   gcloud auth application-default login
   ```

2. **Terraform**: `>= 1.8.0` installed.
3. **GCP Billing Account**: An active billing account where you have the `roles/billing.user` or administrative role.

---

## Provisioning Steps

### 1. Gather Required Information

Determine your Billing Account ID:

```shell
gcloud billing accounts list
```

Identify the target region (e.g., `europe-west3` for Frankfurt):

```shell
gcloud compute regions list --filter="name:europe*"
```

### 2. Configure Terraform Variables

Copy the example variables file:

```shell
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your project parameters:

- `project_name`: Human-readable name for your GCP project.
- `project_id`: Globally unique project ID (lowercase letters, digits, and hyphens).
- `billing_account`: Your Google Cloud billing account ID.
- `location`: Primary GCP region (e.g., `europe-west3`).

### 3. Initialize and Apply Terraform

```shell
terraform init
terraform apply
```

Review the planned execution and confirm with `yes`.

---

## Verification

Once provisioned, verify the project and deployed services:

```shell
# Verify project creation and metadata
gcloud projects describe <PROJECT_ID>

# Verify billing association
gcloud billing projects list --billing-account=<BILLING_ACCOUNT_ID>

# Check enabled APIs
gcloud services list --enabled --project=<PROJECT_ID>

# Check Firestore database
gcloud firestore databases list --project=<PROJECT_ID>

# Check Artifact Registry Docker repository
gcloud artifacts repositories list --project=<PROJECT_ID>

# Check Cloud Storage bucket
gcloud storage buckets list --project=<PROJECT_ID>

# Check Cloud Build service account
gcloud iam service-accounts list --project=<PROJECT_ID>
```

---

## Outputs & Connecting Server Templates

After running `terraform apply`, Terraform outputs the key configuration values needed by server templates (such as `server` scaffolded via `create-gcp-ts`):

| Terraform Output | Target File in Server Template | Variable / Environment Key | Description |
| :--- | :--- | :--- | :--- |
| `project_id` | `terraform.tfvars` / `.env` | `project_id` / `GOOGLE_PROJECT_ID` | GCP Project ID |
| `location` | `terraform.tfvars` | `location` | GCP Region (e.g. `europe-west3`) |
| `zone` | `terraform.tfvars` | `zone` | GCP Zone (e.g. `europe-west3-a`) |
| `docker_repository` | `terraform.tfvars` | `repository` | Artifact Registry repository (`docker-repo`) |
| `storage_bucket_name` | `.env` | `BUCKET_NAME` | Cloud Storage bucket name (`<project_id>-storage`) |
| `cloudbuild_service_account` | Cloud Build Triggers | Service Account | Dedicated build SA (`cloudbuild-custom-sa@...`) |

You can display these output values anytime with:

```shell
terraform output
```

---

## Using This Infrastructure with Server Templates

This project serves as the foundational GCP environment. Once provisioned, you can deploy server workloads into this project:

- Reuse the outputs listed above to populate `terraform.tfvars`, `.env`, and `.npmrc` in your server instances.
- Deploy virtual machines, VPC networking, containers, and application configs on top of this established project baseline.

---

## Cleanup / Deletion

```shell
terraform destroy
gcloud projects delete <PROJECT_ID>
```

---

## License

[MIT](LICENSE)
