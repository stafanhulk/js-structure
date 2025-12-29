export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/packages"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: [
    "packages/*/src/**/*.ts",
    "!packages/*/src/**/*.d.ts",
    "!**/node_modules/**"
  ],
  coverageDirectory: "coverage",
  verbose: true
};
