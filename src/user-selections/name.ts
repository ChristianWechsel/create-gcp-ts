import { input } from "@inquirer/prompts";

export function validateNpmPackageName(rawName: string): true | string {
  const name = rawName.trim();

  if (name.length === 0) {
    return "The name must not be empty.";
  }

  if (name.length > 214) {
    return "The name must not exceed 214 characters.";
  }

  if (!/^[a-z0-9~][a-z0-9_.~-]*$/.test(name)) {
    return "The name may only contain lowercase letters, numbers, hyphens (-), dots (.), and underscores (_).";
  }

  return true;
}

export function nameSelection() {
  return input({
    message: "Project name:",
    default: "my-gcp-project",
    validate: validateNpmPackageName,
  });
}
