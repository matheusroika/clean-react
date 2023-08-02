import * as http from '../support/surveysMocks'
import { mockAccount } from '../../../domain/mocks'

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

  it('Should show error message on UnexpectedError', () => {
    http.mockUnexpectedError()
    cy.visit('')
    cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
  })
})
