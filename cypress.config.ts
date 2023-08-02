import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    fixturesFolder: false,
    video: false,
    screenshotOnRunFailure: false,
    supportFile: 'tests/main/cypress/support/e2e.ts',
    downloadsFolder: 'tests/main/cypress/downloads',
    specPattern: "tests/main/cypress/e2e/*.cy.ts",
    experimentalRunAllSpecs: true
  }
})
