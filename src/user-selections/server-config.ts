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
  const location = await input({
    message: "Google Cloud location:",
    validate: (value) => validateStringLength(value, "Location", 2, 50),
  });
  const projectId = await input({
    message: "Google Cloud project ID:",
    validate: (value) => validateStringLength(value, "Project ID", 6, 30),
  });
  const repositoryName = await input({
    message: "Google Cloud repository name:",
    validate: (value) => validateStringLength(value, "Repository name", 1, 63),
  });
  const scope = await input({
    message: "Google Cloud repository scope:",
    validate: (value) => validateStringLength(value, "Scope", 1, 214),
  });
  const clientId = await input({
    message: "Google Cloud client ID:",
    validate: (value) => validateStringLength(value, "Client ID", 1, 100),
  });
  const bucketName = await input({
    message: "Google Cloud bucket name:",
    validate: (value) => validateStringLength(value, "Bucket name", 1, 100),
  });

  return {
    app: { name: appName.trim() },
    googleCloud: {
      location: location.trim(),
      projectId: projectId.trim(),
      repository: { scope: scope.trim(), name: repositoryName.trim() },
      clientId: clientId.trim(),
      bucketName: bucketName.trim(),
    },
  };
}
