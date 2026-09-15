import { resolve } from "path";
import { NPM_INSTALL_FILE, NPM_PACKAGE_PARAMS_FILE } from "../consts.js";
import { isNpmInstall, isNpmPackageParams, Template } from "../types.js";
import { NpmConfigurationEntry } from "../user-selections/type.js";
import { readFileIfExists } from "../utils/read-file.js";
import { copyFolder } from "./copy.js";
import { initNpm, installDependencies } from "./npm.js";

export function scaffold(template: Template) {
  const { contentNpmInstallFile, contentNpmPackageParamsFile } =
    loadNpmConfiguration(template);

  const settings: NpmConfigurationEntry[] = [
    { key: "name", value: template.name },
  ];

  Object.entries(contentNpmPackageParamsFile ?? []).forEach(([key, value]) => {
    if (value) {
      settings.push({ key, value });
    }
  });

  initNpm(template.folders.target, settings);
  installDependencies(
    template.folders.target,
    contentNpmInstallFile ?? { dependencies: [], devDependencies: [] },
  );
  copyFolder(template.folders.files, template.folders.target);
}

function loadNpmConfiguration(template: Template) {
  const contentNpmInstallFile = readFileIfExists(
    resolve(template.folders.config, NPM_INSTALL_FILE),
    isNpmInstall,
  );
  const contentNpmPackageParamsFile = readFileIfExists(
    resolve(template.folders.config, NPM_PACKAGE_PARAMS_FILE),
    isNpmPackageParams,
  );
  return { contentNpmInstallFile, contentNpmPackageParamsFile };
}
