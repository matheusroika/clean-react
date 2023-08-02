import * as httpMocks from '../utils/httpMocks'
import { mockAccount } from '../../../domain/mocks'

const baseUrl: string = Cypress.config().baseUrl

const http = {
  mockUnexpectedError: (): void => { httpMocks.mockServerError(/surveys/, 'GET', 'surveys') },
  mockAccessDeniedError: (): void => { httpMocks.mockForbiddenError(/surveys/, 'GET', 'surveys') }
}

describe('Surveys', () => {
  beforeEach(() => {
    cy.intercept({
      url: /surveys/,
      middleware: true
    }, req => {
      req.on('response', res => { res.setDelay(100) })
    })
    localStorage.setItem('account', JSON.stringify(mockAccount()))
    cy.visit('')
  })

  it('Should show correct username on header', () => {
    http.mockUnexpectedError()
    cy.dataTestId('userName').should('contain.text', mockAccount().name)
  })

  it('Should logout on header logout click', () => {
    http.mockUnexpectedError()
    cy.dataTestId('logout').click()
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })

  it('Should show error message on UnexpectedError', () => {
    http.mockUnexpectedError()
    cy.visit('')
    cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
  })

  it('Should logout on AccessDeniedError', () => {
    http.mockAccessDeniedError()
    cy.visit('')
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })
})
