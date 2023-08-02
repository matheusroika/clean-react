export const testModalCycle = (message?: string): void => {
  cy.dataTestId('modalWrapper').should('exist')
    .dataTestId('loader').should('exist')
    .dataTestId('message').should('not.exist')
    .dataTestId('loader').should('not.exist')
    .dataTestId('message').should(!message ? 'not.exist' : 'have.text', message)
}

export const submitValidForm = (page: 'login' | 'signup', withEnter?: boolean): void => {
  const password = withEnter ? '12345{enter}' : '12345'
  if (page === 'signup') {
    cy.dataTestId('name').type('Test Name')
    cy.dataTestId('passwordConfirmation').type('12345')
  }
  cy.dataTestId('email').type('test@email.com')
  cy.dataTestId('password').type(password)
  if (!withEnter) cy.dataTestId('submit').click()
}
