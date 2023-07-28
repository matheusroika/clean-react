const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.intercept({
      url: '/api/login',
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

  it('Should present error modal with UnexpectedError if unexpected error happens', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 500,
      body: {
        error: 'Unexpected error'
      }
    }).as('login')
    cy.dataTestId('email').type('any@email.com')
    cy.dataTestId('password').type('12345')
    cy.dataTestId('submit').click()
    cy.dataTestId('modalWrapper').should('exist')
      .dataTestId('loader').should('exist')
      .dataTestId('message').should('not.exist')
      .dataTestId('loader').should('not.exist')
      .dataTestId('message').should('have.text', 'Algo de errado aconteceu. Tente novamente')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('null')
    })
  })

  it('Should present error modal with InvalidCredentialsError if invalid credentials are provided', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: {
        error: 'Invalid credentials'
      }
    }).as('login')
    cy.dataTestId('email').type('any@email.com')
    cy.dataTestId('password').type('12345')
    cy.dataTestId('submit').click()
    cy.dataTestId('modalWrapper').should('exist')
      .dataTestId('loader').should('exist')
      .dataTestId('message').should('not.exist')
      .dataTestId('loader').should('not.exist')
      .dataTestId('message').should('have.text', 'Credenciais inválidas')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('null')
    })
  })

  it('Should present error modal with UnexpectedError if response has an invalid body', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        notAccessToken: 'invalid'
      }
    }).as('login')
    cy.dataTestId('email').type('any@email.com')
    cy.dataTestId('password').type('12345')
    cy.dataTestId('submit').click()
    cy.dataTestId('modalWrapper').should('exist')
      .dataTestId('loader').should('exist')
      .dataTestId('message').should('not.exist')
      .dataTestId('loader').should('not.exist')
      .dataTestId('message').should('have.text', 'Algo de errado aconteceu. Tente novamente')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('null')
    })
  })
})
