import { cpSync, readdirSync, renameSync } from "fs";
import { join } from "path";
import { TEMPLATE_EXTENSION } from "../consts.js";

export function copyFolder(source: string, target: string) {
  cpSync(source, target, { recursive: true });
  renameTemplateFiles(target);
}

function renameTemplateFiles(dir: string) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      renameTemplateFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(TEMPLATE_EXTENSION)) {
      const newName = entry.name.slice(0, -TEMPLATE_EXTENSION.length);
      const newFullPath = join(dir, newName);
      renameSync(fullPath, newFullPath);
    }
  }
}
