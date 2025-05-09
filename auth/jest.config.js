/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  // globals: {
  //   "ts-jest": {
  //     tsconfig: "./tsconfig.json",
  //   },
  // },
  collectCoverage: true,
  testMatch: ["**/tests/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  rootDir: "./",
  setupFilesAfterEnv: ["./tests/setup.ts"],
};
