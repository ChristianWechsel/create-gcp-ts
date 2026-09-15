# @christian-wechsel/create-gcp-ts

CLI to scaffold production-ready TypeScript projects configured for Google Cloud (Artifact Registry, Cloud Build, Terraform).

## Quick Start

Run inside an empty target directory:

```shell
# Using npm
npm create @christian-wechsel/gcp-ts@latest

# Using npx
npx @christian-wechsel/create-gcp-ts@latest
```

Follow the interactive prompts:

1. **Project Name**: Name of your package/project.
2. **Project Type**: Target runtime/architecture (e.g., `node-project`, `server`).

---

## What's Included

- **TypeScript Config**: Strict settings (`tsconfig.json`, `tsconfig.prod.json`).
- **Testing**: Pre-configured Jest suite with separated unit and integration test configs.
- **CI/CD Pipeline**: `cloudbuild.yaml` with automated build and npm publish to GCP Artifact Registry using workload/service account authentication.
- **Infrastructure as Code**: Terraform configuration (`main.tf`, `variables.tf`) managing:
  - GCP Artifact Registry (NPM repository)
  - Cloud Build 2nd Gen GitHub push triggers
  - IAM bindings for Cloud Build service accounts

---

## Post-Scaffold Setup

1. **Install dependencies:**

   ```shell
   npm install
   ```

2. **Provision GCP Infrastructure (Terraform):**

   ```shell
   cp terraform.tfvars.example terraform.tfvars
   # Fill in project_id, github_connection_name, etc.
   terraform init
   terraform apply
   ```

3. **Configure Placeholders:**
   - `.npmrc`: Set `<SCOPE>`, `<REGION>`, `<PROJECT_ID>`, `<REPOSITORY_ID>`.
   - `cloudbuild.yaml`: Verify your GCP Artifact Registry path and scope.
   - `package.json`: Adjust author and git repository fields.

---

## Available Scripts (in generated projects)

- `npm run build`: Compile TypeScript into `dist/`.
- `npm run build-prod`: Compile using production configuration.
- `npm run test`: Run both unit and integration tests.
- `npm run test:unit`: Run unit tests (`*.test.unit.ts`).
- `npm run test:int`: Run integration tests (`*.test.int.ts`).
- `npm start`: Execute compiled code via Node.js.

---

## License

[MIT](LICENSE)
