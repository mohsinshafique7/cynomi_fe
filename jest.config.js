// // /** @type {import('ts-jest').JestConfigWithTsJest} */

// module.exports = {
//   preset: "ts-jest",

//   coverageDirectory: "coverage",
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["./jest.setup.ts"],
//   transform: {
//     "^.+\\.(ts|tsx)?$": "ts-jest",
//   },
//   setupFiles: ["./jest.polyfills.js"],
// }
module.exports = {
  // preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.spec.{ts, tsx}"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/setup.jest.js"],
  globals: {
    Uint8Array: Uint8Array,
  },

  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    "^.+.[tj]sx?$": ["babel-jest"],
  },
}
