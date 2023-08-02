import * as http from '../support/loginMocks'
import * as helper from '../support/authHelpers'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.intercept({
      url: /login/,
      middleware: true
    }, req => {
      req.on('response', res => { res.setDelay(100) })
    })
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.dataTestId('emailStatus').should('have.attr', 'title', 'Campo obrigatório').should('have.text', '🔴')
    cy.dataTestId('passwordStatus').should('have.attr', 'title', 'Campo obrigatório').should('have.text', '🔴')
    cy.dataTestId('submit').should('have.attr', 'disabled')
    cy.dataTestId('modalWrapper').should('not.exist')
  })

  it('Should present error message if form is invalid', () => {
    cy.dataTestId('email').type('invalid_email')
    cy.dataTestId('emailStatus').should('have.attr', 'title', 'Campo inválido').should('have.text', '🔴')
    cy.dataTestId('password').type('123')
    cy.dataTestId('passwordStatus').should('have.attr', 'title', 'Campo requer 5 caracteres no mínimo').should('have.text', '🔴')
    cy.dataTestId('submit').should('have.attr', 'disabled')
    cy.dataTestId('modalWrapper').should('not.exist')
  })

  it('Should present ok message if form is valid', () => {
    cy.dataTestId('email').type('any@email.com')
    cy.dataTestId('emailStatus').should('have.attr', 'title', 'Tudo certo!').should('have.text', '🟢')
    cy.dataTestId('password').type('12345')
    cy.dataTestId('passwordStatus').should('have.attr', 'title', 'Tudo certo!').should('have.text', '🟢')
    cy.dataTestId('submit').should('not.have.attr', 'disabled')
    cy.dataTestId('modalWrapper').should('not.exist')
  })

  it('Should prevent multiple submits', () => {
    http.mockOkResponse()
    helper.submitValidForm('login')
    cy.dataTestId('submit').click()
    cy.get('@login.all').should('have.length', 1)
  })

  it('Should present error modal with UnexpectedError if unexpected error happens', () => {
    http.mockUnexpectedError()
    helper.submitValidForm('login')
    helper.testModalCycle('Algo de errado aconteceu. Tente novamente')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })

  it('Should present error modal with InvalidCredentialsError if invalid credentials are provided', () => {
    http.mockInvalidCredentialsError()
    helper.submitValidForm('login')
    helper.testModalCycle('Credenciais inválidas')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })

  it('Should save accessToken and redirect to index if valid credentials are provided', () => {
    http.mockOkResponse()
    helper.submitValidForm('login')
    helper.testModalCycle()
    cy.url().should('equal', `${baseUrl}/`).then(() => {
      const account = JSON.parse(localStorage.getItem('account'))
      expect(account.name && account.email && account.accessToken).to.be.a('string')
    })
  })

  it('Should submit with enter', () => {
    http.mockOkResponse()
    helper.submitValidForm('login', true)
    cy.url().should('equal', `${baseUrl}/`).then(() => {
      const account = JSON.parse(localStorage.getItem('account'))
      expect(account.name && account.email && account.accessToken).to.be.a('string')
    })
  })

  it('Should not submit if form is invalid', () => {
    http.mockOkResponse()
    cy.dataTestId('email').type('test')
    cy.dataTestId('password').type('12345{enter}')
    cy.get('@login.all').should('have.length', 0)
  })
})
