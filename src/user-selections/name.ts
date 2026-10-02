import { input } from "@inquirer/prompts";
import { sep } from "node:path";

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
  const cwd = process.cwd();
  const splittedCwd = cwd.split(sep);
  const defaultName = splittedCwd[splittedCwd.length - 1];

  return input({
    message: "Project name:",
    default: defaultName,
    validate: validateNpmPackageName,
  });
}
