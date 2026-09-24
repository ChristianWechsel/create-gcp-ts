import { select } from "@inquirer/prompts";
import { ProjectType } from "../types.js";

export function typeSelection() {
  return select<ProjectType>({
    message: "Wähle den Projekttyp:",
    choices: [
      {
        name: "node-project",
        value: "node-project",
        description: "Node.js-project",
      },
      {
        name: "lib",
        value: "lib",
        description: "TypeScript-library",
      },
      {
        name: "server",
        value: "server",
        description: "Server",
      },
    ],
  });
}
export type NpmConfigurationEntry = {
  key: string;
  value: string;
};
