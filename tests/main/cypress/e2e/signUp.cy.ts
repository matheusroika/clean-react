import * as http from '../support/signUpMocks'

const submitValidForm = (withEnter?: boolean): void => {
  const password = withEnter ? '12345{enter}' : '12345'
  cy.dataTestId('name').type('Any Name')
  cy.dataTestId('email').type('test@email.com')
  cy.dataTestId('password').type('12345')
  cy.dataTestId('passwordConfirmation').type(password)
  if (!withEnter) cy.dataTestId('submit').click()
}

describe('Sign Up', () => {
  beforeEach(() => {
    cy.intercept({
      url: /signup/,
      middleware: true
    }, req => {
      req.on('response', res => { res.setDelay(1000) })
    })
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.dataTestId('nameStatus').should('have.attr', 'title', 'Campo obrigatório').should('have.text', '🔴')
    cy.dataTestId('emailStatus').should('have.attr', 'title', 'Campo obrigatório').should('have.text', '🔴')
    cy.dataTestId('passwordStatus').should('have.attr', 'title', 'Campo obrigatório').should('have.text', '🔴')
    cy.dataTestId('passwordConfirmationStatus').should('have.attr', 'title', 'Campo obrigatório').should('have.text', '🔴')
    cy.dataTestId('submit').should('have.attr', 'disabled')
    cy.dataTestId('modalWrapper').should('not.exist')
  })

  it('Should present error message if form is invalid', () => {
    cy.dataTestId('nameStatus').should('have.attr', 'title', 'Campo obrigatório').should('have.text', '🔴')
    cy.dataTestId('email').type('invalid_email')
    cy.dataTestId('emailStatus').should('have.attr', 'title', 'Campo inválido').should('have.text', '🔴')
    cy.dataTestId('password').type('123')
    cy.dataTestId('passwordStatus').should('have.attr', 'title', 'Campo requer 5 caracteres no mínimo').should('have.text', '🔴')
    cy.dataTestId('passwordConfirmation').type('1234')
    cy.dataTestId('passwordConfirmationStatus').should('have.attr', 'title', 'Campo inválido').should('have.text', '🔴')
    cy.dataTestId('submit').should('have.attr', 'disabled')
    cy.dataTestId('modalWrapper').should('not.exist')
  })

  it('Should present ok message if form is valid', () => {
    cy.dataTestId('name').type('Any Name')
    cy.dataTestId('nameStatus').should('have.attr', 'title', 'Tudo certo!').should('have.text', '🟢')
    cy.dataTestId('email').type('any@email.com')
    cy.dataTestId('emailStatus').should('have.attr', 'title', 'Tudo certo!').should('have.text', '🟢')
    cy.dataTestId('password').type('12345')
    cy.dataTestId('passwordStatus').should('have.attr', 'title', 'Tudo certo!').should('have.text', '🟢')
    cy.dataTestId('passwordConfirmation').type('12345')
    cy.dataTestId('passwordConfirmationStatus').should('have.attr', 'title', 'Tudo certo!').should('have.text', '🟢')
    cy.dataTestId('submit').should('not.have.attr', 'disabled')
    cy.dataTestId('modalWrapper').should('not.exist')
  })

  it('Should prevent multiple submits', () => {
    http.mockOkResponse()
    submitValidForm()
    cy.dataTestId('submit').click()
    cy.get('@signUp.all').should('have.length', 1)
  })
})
