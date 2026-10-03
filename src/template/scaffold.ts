import { resolve } from "path";
import {
  FILES_WITH_STRING_REPLACEMENTS_FILE,
  NPM_INSTALL_FILE,
  NPM_PACKAGE_PARAMS_FILE,
} from "../consts.js";
import {
  isFilesWithStringReplacements,
  isNpmInstall,
  isNpmPackageParams,
  NpmConfigurationEntry,
  ServerConfig,
  Template,
} from "../types.js";
import { readFileIfExists } from "../utils/read-file.js";
import { copyFolder } from "./copy.js";
import { initNpm, installDependencies } from "./npm.js";
import {
  buildFilePathsForReplacements,
  handleStringReplacements,
  mapReplacements,
} from "./string-replacements.js";

export function scaffold(template: Template, serverConfig?: ServerConfig) {
  const {
    contentNpmInstallFile,
    contentNpmPackageParamsFile,
    contentFilesWithStringReplacementsFile,
  } = loadConfiguration(template);

  const settings: NpmConfigurationEntry[] = [
    { key: "name", value: `${template.scope}/${template.name}` },
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

  if (
    serverConfig &&
    contentFilesWithStringReplacementsFile &&
    contentFilesWithStringReplacementsFile.filesWithStringReplacements.length >
      0
  ) {
    const targetPathsForReplacements = buildFilePathsForReplacements(
      template,
      contentFilesWithStringReplacementsFile.filesWithStringReplacements,
    );
    const replacements = mapReplacements(serverConfig);
    handleStringReplacements(targetPathsForReplacements, replacements);
  }
}

function loadConfiguration(template: Template) {
  const contentNpmInstallFile = readFileIfExists(
    resolve(template.folders.config, NPM_INSTALL_FILE),
    isNpmInstall,
  );
  const contentNpmPackageParamsFile = readFileIfExists(
    resolve(template.folders.config, NPM_PACKAGE_PARAMS_FILE),
    isNpmPackageParams,
  );
  const contentFilesWithStringReplacementsFile = readFileIfExists(
    resolve(template.folders.config, FILES_WITH_STRING_REPLACEMENTS_FILE),
    isFilesWithStringReplacements,
  );
  return {
    contentNpmInstallFile,
    contentNpmPackageParamsFile,
    contentFilesWithStringReplacementsFile,
  };
}
