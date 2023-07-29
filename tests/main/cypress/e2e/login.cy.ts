import * as http from '../support/loginMocks'

const baseUrl: string = Cypress.config().baseUrl

const testModalCycle = (message?: string): void => {
  cy.dataTestId('modalWrapper').should('exist')
    .dataTestId('loader').should('exist')
    .dataTestId('message').should('not.exist')
    .dataTestId('loader').should('not.exist')
    .dataTestId('message').should(!message ? 'not.exist' : 'have.text', message)
}

const submitValidForm = (withEnter?: boolean): void => {
  const password = withEnter ? '12345{enter}' : '12345'
  cy.dataTestId('email').type('test@email.com')
  cy.dataTestId('password').type(password)
  if (!withEnter) cy.dataTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.intercept({
      url: /login/,
      middleware: true
    }, req => {
      req.on('response', res => { res.setDelay(1000) })
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
    submitValidForm()
    cy.dataTestId('submit').click()
    cy.get('@login.all').should('have.length', 1)
  })

  it('Should present error modal with UnexpectedError if unexpected error happens', () => {
    http.mockUnexpectedError()
    submitValidForm()
    testModalCycle('Algo de errado aconteceu. Tente novamente')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('null')
    })
  })

  it('Should present error modal with InvalidCredentialsError if invalid credentials are provided', () => {
    http.mockInvalidCredentialsError()
    submitValidForm()
    testModalCycle('Credenciais inválidas')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('null')
    })
  })

  it('Should present error modal with UnexpectedError if response has an invalid body', () => {
    http.mockOkWithInvalidResponse()
    submitValidForm()
    testModalCycle('Algo de errado aconteceu. Tente novamente')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('null')
    })
  })

  it('Should save accessToken and redirect to index if valid credentials are provided', () => {
    http.mockOkResponse()
    submitValidForm()
    testModalCycle()
    cy.url().should('equal', `${baseUrl}/`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('string')
    })
  })

  it('Should submit with enter', () => {
    http.mockOkResponse()
    submitValidForm(true)
    cy.url().should('equal', `${baseUrl}/`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('string')
    })
  })

  it('Should not submit if form is invalid', () => {
    http.mockOkResponse()
    cy.dataTestId('email').type('test')
    cy.dataTestId('password').type('12345{enter}')
    cy.get('@login.all').should('have.length', 0)
  })
})
