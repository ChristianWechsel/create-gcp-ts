#!/usr/bin/env node

import { scaffold } from "./template/scaffold.js";
import { templateSelection } from "./template/template-selection.js";
import { ServerConfig } from "./types.js";
import { nameSelection } from "./user-selections/name.js";
import { scopeSelection } from "./user-selections/scope.js";
import { serverConfigInput } from "./user-selections/server-config.js";
import { typeSelection } from "./user-selections/type.js";
import { printTemplate } from "./utils/print.js";

try {
  const scope = await scopeSelection();
  const name = await nameSelection();
  const type = await typeSelection();

  let serverConfig: ServerConfig | undefined;
  if (type === "server") {
    serverConfig = await serverConfigInput({ appName: name, scope });
    console.log("Server configuration:", serverConfig);
  }

  const template = templateSelection({
    name,
    scope,
    type,
    targetFolder: process.cwd(),
  });
  printTemplate(template);
  scaffold(template, serverConfig);
  process.exit(0);
} catch (error) {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("Until next time!");
    process.exit(0);
  } else {
    console.error(error);
    process.exit(1);
  }
}
