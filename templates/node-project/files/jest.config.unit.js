/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  testMatch: ["**/*.test.unit.ts"],
  displayName: { name: "Unit", color: "magenta" },
  moduleNameMapper: {
    "^(\.{1,2}/.*)\.js$": "$1",
  },
  transform: {
    "^.+\.[tj]sx?$": ["ts-jest", { tsconfig: { module: "ES2020", moduleResolution: "node16", allowJs: true } }],
  }
};
