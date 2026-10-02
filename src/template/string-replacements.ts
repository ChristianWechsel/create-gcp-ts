import { resolve } from "path";
import {
  FilesWithStringReplacements,
  Replacements,
  ServerConfig,
  Template,
} from "../types.js";
import { readFile } from "../utils/read-file.js";
import { writeFile } from "../utils/write-file.js";

export function buildFilePathsForReplacements(
  template: Template,
  files: FilesWithStringReplacements["filesWithStringReplacements"],
) {
  return files.map((file) => resolve(template.folders.target, file));
}

export function mapReplacements(serverConfig: ServerConfig): Replacements {
  const replacements: Replacements = {};

  if (serverConfig.app.name) {
    replacements.AppName = serverConfig.app.name;
  }
  if (serverConfig.app.domain) {
    replacements.Domain = serverConfig.app.domain;
  }
  if (serverConfig.user.name) {
    replacements.User = serverConfig.user.name;
  }
  if (serverConfig.user.email) {
    replacements.Email = serverConfig.user.email;
  }
  if (serverConfig.googleCloud.location) {
    replacements.Location = serverConfig.googleCloud.location;
  }
  if (serverConfig.googleCloud.projectId) {
    replacements.Project = serverConfig.googleCloud.projectId;
  }
  if (serverConfig.googleCloud.repository.name) {
    replacements.Repository = serverConfig.googleCloud.repository.name;
  }
  if (serverConfig.googleCloud.repository.scope) {
    replacements.Scope = serverConfig.googleCloud.repository.scope;
  }
  if (serverConfig.googleCloud.bucketName) {
    replacements.BucketName = serverConfig.googleCloud.bucketName;
  }

  return replacements;
}

export function handleStringReplacements(
  filePaths: string[],
  replacements: Replacements,
) {
  filePaths.forEach((file) => {
    const replacedContent = replace(readFile(file), replacements, file);
    writeFile(file, replacedContent);
  });
}

function replace(
  content: string,
  replacements: Replacements,
  filePath?: string,
): string {
  return content.replace(/\$\{([^}]+)\}/g, (match, key) => {
    const value = replacements[key as keyof Replacements];
    if (value === undefined) {
      console.warn(
        `Warning: No replacement found for placeholder "\${${key}}" in file ${filePath}".`,
      );
      return match;
    }
    return value;
  });
}
