import { input } from "@inquirer/prompts";
import { extractDirectoryName } from "../utils/directory.js";
import { validateNpmPackageName } from "./validate.js";

export function nameSelection() {
  const defaultName = extractDirectoryName();

  return input({
    message: "Project name:",
    default: defaultName,
    validate: validateNpmPackageName,
  });
}
