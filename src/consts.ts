import { resolve } from "path";
import { ProjectType } from "./types.js";

const ROOT = resolve(import.meta.dirname, "..");

export const CONFIG_FOLDERS: Record<ProjectType, string> = {
  "node-project": resolve(ROOT, "templates", "node-project", "config"),
  lib: resolve(ROOT, "templates", "lib", "config"),
  server: resolve(ROOT, "templates", "server", "config"),
};
export const FILES_FOLDERS: Record<ProjectType, string> = {
  "node-project": resolve(ROOT, "templates", "node-project", "files"),
  lib: resolve(ROOT, "templates", "lib", "files"),
  server: resolve(ROOT, "templates", "server", "files"),
};
export const NPM_INSTALL_FILE = "npm-install.json";
export const NPM_PACKAGE_PARAMS_FILE = "npm-package-params.json";
