import { select } from "@inquirer/prompts";
import { ProjectType } from "../types.js";

export function typeSelection() {
  return select<ProjectType>({
    message: "Wähle den Projekttyp:",
    choices: [
      {
        name: "node-project",
        value: "node-project",
        description: "TypeScript-Bibliothek",
      },
      {
        name: "server",
        value: "server",
        description: "Server-Anwendung",
      },
    ],
  });
}
export type NpmConfigurationEntry = {
  key: string;
  value: string;
};
