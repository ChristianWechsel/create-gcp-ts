import { cpSync } from "fs";

export function copyFolder(source: string, target: string) {
  cpSync(source, target, { recursive: true });
}
