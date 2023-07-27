Cypress.Commands.add('dataTestId', (id: string) => cy.get(`[data-testid=${id}]`))
