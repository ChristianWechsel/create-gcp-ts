# Google Cloud Baseline Infrastructure for TypeScript Projects

This Terraform project provisions the shared baseline infrastructure in Google Cloud Platform (GCP) required by TypeScript libraries (`lib`) and Node.js applications (`node-project`) scaffolded with `create-gcp-ts`.

---

## What This Provisions

This configuration sets up the shared resources needed across multiple repositories:

1. **GCP API Enablement**:
   - `artifactregistry.googleapis.com` (Google Artifact Registry)
   - `cloudbuild.googleapis.com` (Cloud Build)
   - `secretmanager.googleapis.com` (Secret Manager)
2. **Artifact Registry NPM Repository**:
   - Private NPM package registry for hosting internal TypeScript packages and libraries.
3. **Dedicated Cloud Build Service Account**:
   - Service account (`Cloud Build – NPM Publisher`) used by Cloud Build triggers.
4. **IAM Role Bindings**:
   - `roles/artifactregistry.writer`: Grants permission to publish packages to Artifact Registry.
   - `roles/logging.logWriter`: Grants permission to write build logs.
   - `roles/storage.objectViewer`: Grants permission to read build source objects.
   - `roles/secretmanager.secretAccessor`: Grants permission to read the public npm token from Secret Manager for tag releases.

---

## Prerequisites

1. **Google Cloud SDK (`gcloud`)**:
   Authenticated with administrative permissions:

   ```shell
   gcloud auth login
   gcloud auth application-default login
   ```

2. **Terraform**: `>= 1.5.0` installed.
3. **GCP Project**: An existing GCP project with billing enabled.

---

## Provisioning Steps

### 1. Configure Terraform Variables

Copy the example variables file:

```shell
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your project's values:

### 2. Initialize and Apply Terraform

```shell
terraform init
terraform apply
```

Review the planned resources and type `yes` to provision.

---

## Post-Provisioning Steps

### 1. Store NPM Token in Secret Manager (for public releases)

If your projects will publish public releases to `npmjs.org` on Git tag pushes, store your npm automation token in Secret Manager:

```shell
# Create the secret (if not created yet)
gcloud secrets create npm-token --replication-policy="automatic" --project="<PROJECT_ID>"

# Add the token value
echo -n "npm_YourNpmAutomationTokenHere" | gcloud secrets versions add npm-token --data-file=- --project="<PROJECT_ID>"
```

### 2. Set Up Cloud Build 2nd Gen GitHub Connection

To allow Cloud Build triggers in individual repositories to listen to GitHub push events:

1. Navigate to **Google Cloud Console** > **Cloud Build** > **Repositories**.
2. Under **2nd gen**, click **Create host connection**.
3. Select your region (e.g., `europe-west3`) and specify a connection name (e.g., `my-github-connection`).
4. Follow the prompt to install/authorize the Google Cloud Build GitHub App on your GitHub account or organization.

---

## Connecting Repositories to This Shared Infrastructure

When scaffolding projects with `create-gcp-ts` (using `lib` or `node-project`), provide the following values in their respective `terraform.tfvars`:

---

## License

[MIT](LICENSE)
