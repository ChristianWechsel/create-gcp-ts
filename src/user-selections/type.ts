import { select } from "@inquirer/prompts";
import { ProjectType } from "../types.js";

export function typeSelection() {
  return select<ProjectType>({
    message: "Wähle den Projekttyp:",
    choices: [
      {
        name: "gcp-infrastructure",
        value: "gcp-infrastructure",
        description: "Google Cloud Infrastructure",
      },
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
      {
        name: "server-infrastructure",
        value: "server-infrastructure",
        description: "Server Infrastructure",
      },
      {
        name: "cloud-run",
        value: "cloud-run",
        description: "Cloud Run",
      },
    ],
  });
}
