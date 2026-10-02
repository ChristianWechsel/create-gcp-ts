import { input } from "@inquirer/prompts";
import { ServerConfig } from "../types.js";

export function validateStringLength(
  value: string,
  fieldName: string,
  min: number,
  max: number,
): true | string {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return `${fieldName} must not be empty.`;
  }

  if (trimmed.length < min) {
    return `${fieldName} must be at least ${min} ${min === 1 ? "character" : "characters"} long.`;
  }

  if (trimmed.length > max) {
    return `${fieldName} must not exceed ${max} characters.`;
  }

  return true;
}

export async function serverConfigInput(
  appName: string,
): Promise<ServerConfig> {
  const scope = await input({
    message: "Project scope:",
    validate: (value) => validateStringLength(value, "Scope", 1, 214),
  });
  const projectId = await input({
    message: "Google Cloud project ID:",
    validate: (value) => validateStringLength(value, "Project ID", 6, 30),
  });
  const location = await input({
    message: "Google Cloud location:",
    validate: (value) => validateStringLength(value, "Location", 2, 50),
  });
  const repositoryName = await input({
    message: "Google Cloud repository name:",
    validate: (value) => validateStringLength(value, "Repository name", 1, 63),
  });
  const bucketName = await input({
    message: "Google Cloud bucket name:",
    validate: (value) => validateStringLength(value, "Bucket name", 1, 100),
  });
  const domain = await input({
    message: "Application domain: example.create-gcp-ts.com",
    validate: (value) => validateStringLength(value, "Domain", 1, 100),
  });
  const userName = await input({
    message: "User name:",
    default: process.env.USER ?? "",
    validate: (value) => validateStringLength(value, "User name", 1, 100),
  });
  const userEmail = await input({
    message: "User email:",
    validate: (value) => validateStringLength(value, "User email", 5, 100),
  });

  return {
    app: { name: appName.trim(), domain: domain.trim() },
    user: { name: userName.trim(), email: userEmail.trim() },
    googleCloud: {
      location: location.trim(),
      projectId: projectId.trim(),
      repository: { scope: scope.trim(), name: repositoryName.trim() },
      bucketName: bucketName.trim(),
    },
  };
}
