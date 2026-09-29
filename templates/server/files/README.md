# Express TypeScript Backend for Google Cloud

A production-ready TypeScript Express backend application pre-configured with strict TypeScript compilation, Jest test suites, containerization (Docker & Docker Compose), automated CI/CD via Google Cloud Build, and full infrastructure provisioning using Terraform on Google Cloud Platform (GCP).

---

## Features

- **TypeScript with ESM**: Modern ES modules setup with strict compiler checks (`tsconfig.json`, `tsconfig.prod.json`, `tsconfig.test.json`).
- **Express & Security Baseline**: Hardened with Helmet security headers, proxy trust configuration, JSON / URL-encoded body parsing, structured logging, and static frontend asset delivery (`public/`).
- **GCP Services Integration with Local Adapters**:
  - **Firestore**: Native Firestore database in production, fast in-memory adapter for local development and testing.
  - **Cloud Storage**: Google Cloud Storage bucket with CORS in production, in-memory storage adapter for local testing.
  - **Secret Manager**: Secure runtime secret and configuration access.
  - **Session Management**: Session store with Firestore adapter for production and in-memory adapter for development.
- **Containerization & Nginx Reverse Proxy**:
  - Multi-stage `Dockerfile` (`node:24-slim`) with non-root security.
  - `docker-compose.yml` orchestrating the Express server and an Nginx reverse proxy.
  - Nginx pre-configured with rate limiting, SSL/TLS termination, and automated Let's Encrypt / Certbot certificate provisioning.
- **Infrastructure as Code (Terraform)**:
  - Compute Engine VM (`e2-micro`) with Ubuntu 24.04 LTS and automated bootstrapping via `cloud-init.yaml`.
  - Custom VPC and dedicated subnet with firewall rules (HTTP 80, HTTPS 443, IAP SSH 22).
  - Artifact Registry Docker repository for container images.
  - Cloud Storage bucket with CORS headers.
  - Firestore database in native mode.
  - Dedicated IAM service accounts and least-privilege role bindings.
  - Automated GCP API enablement (`compute`, `cloudbuild`, `secretmanager`, `firestore`, `artifactregistry`).
- **Automated CI/CD (Cloud Build)**: Pre-configured `cloudbuild.yaml` with dependency audits (`npm audit`), test runs, multi-stage Docker build, and automated push to GCP Artifact Registry.
- **Jest Test Framework**: Separated unit testing (`*.test.unit.ts`) and integration testing (`*.test.int.ts`).

---

## Project Structure

```text
├── bin/
│   └── clean.sh                 # Cleans dist/ build outputs
├── public/                      # Static frontend assets
│   ├── css/
│   ├── js/
│   └── index.html
├── src/
│   ├── container.ts             # Dependency injection container & service wiring
│   ├── index.ts                 # Application entry point & lifecycle
│   ├── server.ts                # Express application factory & middleware
│   ├── core/                    # Environment variables, error handling, secrets
│   ├── database/                # Firestore & in-memory database adapters
│   ├── middleware/              # Request logging and custom middleware
│   ├── routes/                  # Express route handlers
│   ├── storage/                 # Cloud Storage & in-memory storage adapters
│   └── integration/             # Integration tests
├── apis.tf                      # GCP service API enablement
├── cloud-init.yaml              # Cloud-init configuration for VM bootstrapping
├── cloudbuild.yaml              # Cloud Build CI/CD pipeline
├── compute.tf                   # Compute Engine VM and static IP
├── docker-compose.yml           # Docker Compose definition (Server + Nginx)
├── Dockerfile                   # Multi-stage production container build
├── firesore.tf                  # Firestore native database provisioning
├── iam.tf                       # Service accounts and IAM role bindings
├── jest.config.mjs              # Jest project configuration
├── nginx.conf                   # Nginx reverse proxy, rate limiting & SSL
├── outputs.tf                   # Terraform output values (e.g. VM public IP)
├── provider.tf                  # Terraform Google provider config
├── registry.tf                  # Artifact Registry Docker repository
├── storage.tf                   # Cloud Storage bucket resource with CORS
├── terraform.tfvars             # Terraform variables (pre-populated by generator)
├── tsconfig.json                # Base TypeScript compiler options
├── tsconfig.prod.json           # Production build options
├── tsconfig.test.json           # Test build options
├── variables.tf                 # Terraform variable definitions
└── vpc.tf                       # Custom VPC, subnet, and firewall rules
```

---

## Getting Started

### 1. Install Dependencies

```shell
npm install
```

### 2. Local Development

Start the development server with live reload:

```shell
npm run dev
```

In development mode (`NODE_ENV=development`), the application automatically uses in-memory mock adapters for Firestore, Cloud Storage, and sessions, enabling local development without active GCP credentials.

### 3. Review Configuration

Configuration values collected during scaffolding are saved to `.env` and `terraform.tfvars`:

- **`.env`**: Runtime environment variables (port, Google project ID, client ID, bucket name).
- **`terraform.tfvars`**: GCP deployment settings (project ID, region, zone, naming prefix, domain, user, email).

> **Security Note:** `.env` and `terraform.tfvars` contain sensitive configuration and are excluded by `.gitignore`. Do not commit these files to Git.

### 4. Deploy Infrastructure (Terraform)

Provision the complete GCP infrastructure:

```shell
terraform init
terraform apply
```

After Terraform completes:

1. Note the public static IP from the output (`vm_public_ip`).
2. Point your domain's DNS A-record to this static IP.
3. The VM boots via `cloud-init`, installs Docker, acquires a Let's Encrypt SSL certificate for your domain via Certbot, and starts the container stack.

---

## Development Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the server in development mode with hot-reloading (`tsx watch`). |
| `npm run build` | Compiles TypeScript using `tsconfig.json` into `dist/`. |
| `npm run build-prod` | Performs a clean production build (`tsconfig.prod.json`). |
| `npm start` | Starts the compiled production application (`node dist/index.js`). |
| `npm run debug` | Starts Node.js with the debugging inspector enabled (`--inspect-brk`). |
| `npm test` | Runs the full Jest test suite (unit + integration). |
| `npm run test:unit` | Runs only unit tests (`*.test.unit.ts`). |
| `npm run test:int` | Runs only integration tests (`*.test.int.ts`). |
| `npm run clean` | Deletes build outputs in `dist/`. |

---

## CI/CD & Deployment Workflow

The included [cloudbuild.yaml](cloudbuild.yaml) pipeline automates testing and container deployment:

1. **Vulnerability Audit**: Runs `npm audit --audit-level=high`.
2. **Authentication & Dependencies**: Authenticates with Artifact Registry via `google-artifactregistry-auth` and runs `npm ci`.
3. **Automated Testing**: Runs `npm test` across all test suites.
4. **Container Build & Tag**: Builds the production Docker image and tags it with both the version from `package.json` and `latest`.
5. **Registry Deployment**: Pushes the Docker image to your private GCP Artifact Registry Docker repository.

---

## License

[MIT](LICENSE)
