import { CONFIG_FOLDERS, FILES_FOLDERS } from "../consts.js";
import { ProjectType, Template } from "../types.js";

export function templateSelection(params: {
  name: string;
  type: ProjectType;
  targetFolder: string;
}): Template {
  const { name, type, targetFolder } = params;
  return {
    name,
    type,
    folders: {
      target: targetFolder,
      config: CONFIG_FOLDERS[type],
      files: FILES_FOLDERS[type],
    },
  };
}
