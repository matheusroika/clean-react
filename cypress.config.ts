import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    fixturesFolder: false,
    supportFile: false,
    downloadsFolder: 'tests/main/cypress/downloads',
    specPattern: "tests/main/cypress/e2e/*.cy.ts"
  }
})
