# TypeScript Library for Google Cloud & NPM

A production-ready TypeScript library package pre-configured with strict TypeScript compilation, Jest testing (unit and integration), and automated CI/CD via Google Cloud Build and Terraform.

---

## Features

- **Strict TypeScript**: Configured with modern ESM settings (`tsconfig.json`, `tsconfig.prod.json`, `tsconfig.test.json`).
- **Jest Test Suites**: Split into fast unit tests (`*.test.unit.ts`) and integration tests (`*.test.int.ts`).
- **Dual CI/CD Pipeline (`cloudbuild.yaml`)**:
  - **Internal Releases**: Pushes to the target branch (e.g., `main`) automatically publish to your private **GCP Artifact Registry** NPM repository.
  - **Public Releases**: Pushing a version tag (e.g., `v1.0.0`) automatically publishes to **npmjs.org** using a token from **GCP Secret Manager**.
- **Infrastructure as Code (Terraform)**: Pre-configured Terraform code (`main.tf`, `variables.tf`) to manage Cloud Build triggers connected to your GitHub repository.

---

## Project Structure

```text
├── bin/
│   └── clean.sh                 # Cleans dist/ build outputs
├── src/
│   ├── index.ts                 # Library entry point (public exports)
│   ├── math/                    # Example domain module
│   │   ├── add.ts               # Sample function
│   │   ├── add.testdata.ts      # Test data fixtures
│   │   └── add.test.unit.ts     # Unit test suite
│   └── integration/             # Integration test directory
│       └── add.test.int.ts      # Integration test suite
├── cloudbuild.yaml              # Cloud Build pipeline configuration
├── jest.config.mjs              # Jest configuration with project suites
├── main.tf                      # Terraform Cloud Build triggers
├── package.json                 # Package manifest, scripts, and dependencies
├── provider.tf                  # Terraform Google provider config
├── terraform.tfvars.example     # Example variable values for Terraform
├── tsconfig.json                # Base TypeScript configuration
├── tsconfig.prod.json           # Production build configuration
├── tsconfig.test.json           # Test build configuration
└── variables.tf                 # Terraform variable definitions
```

---

## Getting Started

### 1. Install Dependencies

```shell
npm install
```

### 2. Configure Package Metadata

Open `package.json` and adjust:

- `"name"`: Set your desired package name (e.g., `@your-scope/my-library`).
- `"description"`: Brief summary of the library.
- `"author"`: Your name and email.
- `"repository"`: Git repository URL.

### 3. Setup GCP Cloud Build Triggers (Terraform)

This repository includes Terraform configuration to create the Cloud Build triggers that run your CI/CD pipeline.

1. **Copy the example variables file:**

   ```shell
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Fill in your environment details in `terraform.tfvars`:**

3. **Deploy the triggers:**

   ```shell
   terraform init
   terraform apply
   ```

> **Note:** `terraform.tfvars` contains sensitive environment identifiers and is ignored by `.gitignore`. Do not commit this file.

---

## Local Development Scripts

| Command | Description |
| :--- | :--- |
| `npm run build` | Compiles TypeScript using `tsconfig.json` into `dist/`. |
| `npm run build-prod` | Produces a clean production build (`tsconfig.prod.json`). |
| `npm test` | Builds test configuration and runs all unit and integration tests. |
| `npm run test:unit` | Runs only unit tests (`*.test.unit.ts`). |
| `npm run test:int` | Runs only integration tests (`*.test.int.ts`). |
| `npm run clean` | Removes the `dist/` build directory. |

---

## CI/CD & Publishing Workflow

The included [cloudbuild.yaml](cloudbuild.yaml) pipeline automates testing and deployment:

### 1. Internal Branch Releases (GCP Artifact Registry)

Every push to your target branch (`main`):

1. Runs `npm audit --audit-level=high` for vulnerability scanning.
2. Runs `npm ci` and `npm test` across all suites.
3. Automatically authenticates using Cloud Build service account credentials.
4. Publishes an internal package version to your private GCP Artifact Registry.

### 2. Public Releases (npmjs.org)

When you are ready to publish a release to public npm:

1. Update the version in `package.json`:

   ```shell
   npm version patch # or minor, major
   ```

2. Push the commit and the version tag:

   ```shell
   git push origin main --tags
   ```

3. Cloud Build detects the `v*` tag, retrieves the `NPM_TOKEN` secret from Secret Manager, and publishes the package with public access:

   ```shell
   npm publish --access public
   ```

---

## Consuming this Library

### From GCP Artifact Registry (Internal)

In downstream projects, configure `.npmrc`:

```npmrc
@your-scope:registry=https://<REGION>-npm.pkg.dev/<PROJECT_ID>/<REPOSITORY_ID>/
```

Authenticate your local environment:

```shell
npx google-artifactregistry-auth
npm install @your-scope/my-library
```

### From npmjs.org (Public)

```shell
npm install @your-scope/my-library
```

---

## License

[MIT](LICENSE)
