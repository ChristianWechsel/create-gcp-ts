import { writeFileSync } from "fs";

export function writeFile(filePath: string, content: string) {
  return writeFileSync(filePath, content, { encoding: "utf-8" });
}
