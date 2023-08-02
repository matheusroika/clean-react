const baseUrl: string = Cypress.config().baseUrl

describe('Private Routes', () => {
  it('Should logout in Surveys if user has no accessToken', () => {
    cy.visit('')
    cy.url().should('equal', `${baseUrl}/login`)
  })
})
