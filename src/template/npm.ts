import { NPMInstall } from "../types.js";
import { NpmConfigurationEntry } from "../user-selections/type.js";
import { executeShell } from "./execute-shell.js";

export function initNpm(target: string, settings: NpmConfigurationEntry[]) {
  executeShell("npm init -y", { cwd: target });
  settings.forEach((setting) => {
    executeShell(`npm pkg set ${setting.key}="${setting.value}"`, {
      cwd: target,
    });
  });
}

export function installDependencies(target: string, npmInstall: NPMInstall) {
  if (npmInstall.dependencies.length > 0) {
    executeShell(`npm install ${npmInstall.dependencies.join(" ")}`, {
      cwd: target,
    });
  }

  if (npmInstall.devDependencies.length > 0) {
    executeShell(
      `npm install --save-dev${npmInstall.devDependencies.join(" ")}`,
      {
        cwd: target,
      },
    );
  }
}
