import { existsSync, readFileSync } from "fs";

export function readFileIfExists<T>(
  filePath: string,
  typeguard: (value: unknown) => value is T,
): T | null {
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(content);
    if (typeguard(parsed)) {
      return parsed;
    }
  }
  return null;
}
