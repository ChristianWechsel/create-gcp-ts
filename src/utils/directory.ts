import { sep } from "node:path";

export function extractDirectoryName() {
  const cwd = process.cwd();
  const splittedCwd = cwd.split(sep);
  const defaultName = splittedCwd[splittedCwd.length - 1];
  return defaultName;
}
