#!/usr/bin/env node

import { templateSelection } from "./template/template-selection.js";
import { ServerConfig } from "./types.js";
import { nameSelection } from "./user-selections/name.js";
import { serverConfigInput } from "./user-selections/server-config.js";
import { typeSelection } from "./user-selections/type.js";
import { printTemplate } from "./utils/print.js";

try {
  const name = await nameSelection();
  const type = await typeSelection();

  let serverConfig: ServerConfig | undefined;
  if (type === "server") {
    serverConfig = await serverConfigInput();
    console.log("Server configuration:", serverConfig);
  }

  const template = templateSelection({
    name,
    type,
    targetFolder: process.cwd(),
  });
  printTemplate(template);
  // scaffold(template);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
