import { execSync } from "node:child_process";

export function executeShell(
  command: string,
  options?: Partial<{ cwd: string }>,
) {
  const result = execSync(command, options);
  return result;
}
