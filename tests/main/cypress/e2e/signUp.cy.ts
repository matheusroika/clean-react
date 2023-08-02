import * as helper from '../utils/authHelpers'
import * as httpMocks from '../utils/httpMocks'

const baseUrl: string = Cypress.config().baseUrl

const http = {
  mockEmailInUseError: (): void => { httpMocks.mockForbiddenError(/signup/, 'POST', 'signUp') },
  mockUnexpectedError: (): void => { httpMocks.mockServerError(/signup/, 'POST', 'signUp') },
  mockOkResponse: (): void => {
    httpMocks.mockOk(/signup/, 'POST', {
      name: 'Test Name',
      accessToken: 'test_token',
      email: 'test@email.com'
    }, 'signUp')
  }
}

describe('Sign Up', () => {
  beforeEach(() => {
    cy.intercept({
      url: /signup/,
      middleware: true
    }, req => {
      req.on('response', res => { res.setDelay(100) })
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
    helper.submitValidForm('signup')
    cy.dataTestId('submit').click()
    cy.get('@signUp.all').should('have.length', 1)
  })

  it('Should present error modal with UnexpectedError if unexpected error happens', () => {
    http.mockUnexpectedError()
    helper.submitValidForm('signup')
    helper.testModalCycle('Algo de errado aconteceu. Tente novamente')
    cy.url().should('equal', `${baseUrl}/signup`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })

  it('Should present error modal with EmailInUseError if email provided is in use', () => {
    http.mockEmailInUseError()
    helper.submitValidForm('signup')
    helper.testModalCycle('Esse email já está em uso')
    cy.url().should('equal', `${baseUrl}/signup`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })

  it('Should save accessToken and redirect to index if valid form is submitted', () => {
    http.mockOkResponse()
    helper.submitValidForm('signup')
    helper.testModalCycle()
    cy.url().should('equal', `${baseUrl}/`).then(() => {
      const account = JSON.parse(localStorage.getItem('account'))
      expect(account.name && account.email && account.accessToken).to.be.a('string')
    })
  })

  it('Should submit with enter', () => {
    http.mockOkResponse()
    helper.submitValidForm('signup', true)
    cy.url().should('equal', `${baseUrl}/`).then(() => {
      const account = JSON.parse(localStorage.getItem('account'))
      expect(account.name && account.email && account.accessToken).to.be.a('string')
    })
  })

  it('Should not submit if form is invalid', () => {
    http.mockOkResponse()
    cy.dataTestId('name').type('Test Name')
    cy.dataTestId('email').type('test@email.com')
    cy.dataTestId('password').type('12345')
    cy.dataTestId('passwordConfirmation').type('123456{enter}')
    cy.get('@signUp.all').should('have.length', 0)
  })
})
