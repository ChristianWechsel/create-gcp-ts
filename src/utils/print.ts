import { Template } from "../types.js";

export function printTemplate(template: Template) {
  console.log();

  printObject(template);
}

function printObject(obj: object) {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string") {
      printKey(key, value);
    } else {
      console.log(`${key}:`);
      printObject(value);
    }
  });
}

function printKey(key: string, value: string) {
  console.log(`${key}: ${value}`);
}
