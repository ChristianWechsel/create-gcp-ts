import { input } from "@inquirer/prompts";
import { ServerConfig } from "../types.js";
import { validateStringLength } from "./validate.js";

export async function serverConfigInput(params: {
  appName: string;
  scope: string;
}): Promise<ServerConfig> {
  const projectId = await input({
    message: "project_id:",
    validate: (value) => validateStringLength(value, "Project ID", 6, 30),
  });
  const location = await input({
    message: "location:",
    validate: (value) => validateStringLength(value, "Location", 2, 50),
  });
  const repositoryName = await input({
    message: "docker_repository:",
    validate: (value) => validateStringLength(value, "Repository name", 1, 63),
  });
  const bucketName = await input({
    message: "storage_bucket_name:",
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
    app: { name: params.appName.trim(), domain: domain.trim() },
    user: { name: userName.trim(), email: userEmail.trim() },
    googleCloud: {
      location: location.trim(),
      projectId: projectId.trim(),
      repository: { scope: params.scope.trim(), name: repositoryName.trim() },
      bucketName: bucketName.trim(),
    },
  };
}
