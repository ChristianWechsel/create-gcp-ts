import { resolve } from "path";
import { ProjectType } from "./types.js";

const GCP_INFRA = "gcp-infrastructure";
const NODE_PROJECT = "node-project";
const LIB = "lib";
const SERVER = "server";
const CONFIG = "config";
const FILES = "files";

const PATH_ROOT = resolve(import.meta.dirname, "..");
const PATH_TEMPLATES = resolve(PATH_ROOT, "templates");
const PATH_GCP_INFRA = resolve(PATH_TEMPLATES, GCP_INFRA);
const PATH_NODE_PROJECT = resolve(PATH_TEMPLATES, NODE_PROJECT);
const PATH_LIB = resolve(PATH_TEMPLATES, LIB);
const PATH_SERVER = resolve(PATH_TEMPLATES, SERVER);

export const CONFIG_FOLDERS: Record<ProjectType, string> = {
  "gcp-infrastructure": resolve(PATH_GCP_INFRA, CONFIG),
  "node-project": resolve(PATH_NODE_PROJECT, CONFIG),
  lib: resolve(PATH_LIB, CONFIG),
  server: resolve(PATH_SERVER, CONFIG),
};

export const FILES_FOLDERS: Record<ProjectType, string> = {
  "gcp-infrastructure": resolve(PATH_GCP_INFRA, FILES),
  "node-project": resolve(PATH_NODE_PROJECT, FILES),
  lib: resolve(PATH_LIB, FILES),
  server: resolve(PATH_SERVER, FILES),
};

export const NPM_INSTALL_FILE = "npm-install.json";
export const NPM_PACKAGE_PARAMS_FILE = "npm-package-params.json";
