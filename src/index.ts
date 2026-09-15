#!/usr/bin/env node

import { scaffold } from "./template/scaffold.js";
import { templateSelection } from "./template/template-selection.js";
import { nameSelection } from "./user-selections/name.js";
import { typeSelection } from "./user-selections/type.js";
import { printTemplate } from "./utils/print.js";

try {
  const name = await nameSelection();
  const type = await typeSelection();

  const template = templateSelection({
    name,
    type,
    targetFolder: process.cwd(),
  });
  printTemplate(template);
  scaffold(template);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
