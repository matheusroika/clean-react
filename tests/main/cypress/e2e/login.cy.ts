const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
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

  it('Should present error modal if invalid credentials are used', () => {
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

  it('Should save accessToken and redirect to index if valid credentials are provided', () => {
    cy.dataTestId('email').type('test@email.com')
    cy.dataTestId('password').type('12345')
    cy.dataTestId('submit').click()
    cy.dataTestId('modalWrapper').should('exist')
      .dataTestId('loader').should('exist')
      .dataTestId('message').should('not.exist')
      .dataTestId('loader').should('not.exist')
    cy.url().should('equal', `${baseUrl}/`).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.a('string')
    })
  })
})
