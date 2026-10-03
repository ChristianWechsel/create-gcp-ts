import { input } from "@inquirer/prompts";
import { validateNpmScope } from "./validate.js";

export function scopeSelection() {
  return input({
    message: "Project scope:, e.g. @project",
    validate: validateNpmScope,
  });
}
