import type { Method } from 'cypress/types/net-stubbing'

export const mockInvalidCredentialsError = (url: string | RegExp, alias?: string): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: 'Invalid credentials'
    }
  }).as(alias || 'request')
}

export const mockEmailInUseError = (url: string | RegExp, alias?: string): void => {
  cy.intercept('POST', url, {
    statusCode: 403,
    body: {
      error: 'Email in use'
    }
  }).as(alias || 'request')
}

export const mockUnexpectedError = (url: string | RegExp, method: Method, alias?: string): void => {
  cy.intercept(method, url, {
    statusCode: 500,
    body: {
      error: 'Unexpected error'
    }
  }).as(alias || 'request')
}

export const mockOk = (url: string | RegExp, method: Method, response: any, alias?: string): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response
  }).as(alias || 'request')
}
