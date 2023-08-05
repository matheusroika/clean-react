import type { Method } from 'cypress/types/net-stubbing'

export const mockUnauthorizedError = (url: string | RegExp, alias?: string): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: 'Unauthorized'
    }
  }).as(alias || 'request')
}

export const mockForbiddenError = (url: string | RegExp, method: Method, alias?: string): void => {
  cy.intercept(method, url, {
    statusCode: 403,
    body: {
      error: 'Forbidden'
    }
  }).as(alias || 'request')
}

export const mockServerError = (url: string | RegExp, method: Method, alias?: string): void => {
  cy.intercept(method, url, {
    statusCode: 500,
    body: {
      error: 'Server error'
    }
  }).as(alias || 'request')
}

export const mockOk = (url: string | RegExp, method: Method, response: any, alias?: string, times?: number): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response,
    times
  }).as(alias || 'request')
}
