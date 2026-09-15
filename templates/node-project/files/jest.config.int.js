/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  testMatch: ["**/*.test.int.ts"],
  displayName: { name: "Integration", color: "cyan" },
  moduleNameMapper: {
    "^(\.{1,2}/.*)\.js$": "$1",
  },
  transform: {
    "^.+\.[tj]sx?$": ["ts-jest", { tsconfig: { module: "ES2020", moduleResolution: "node16", allowJs: true } }],
  }
};
