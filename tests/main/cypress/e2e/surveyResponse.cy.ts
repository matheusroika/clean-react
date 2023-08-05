import * as httpMocks from '../utils/httpMocks'
import { mockAccount, mockSurveyResponse } from '../../../domain/mocks'

const baseUrl: string = Cypress.config().baseUrl

const http = {
  mockUnexpectedError: (): void => { httpMocks.mockServerError(/surveys/, 'GET', 'surveys') },
  mockAccessDeniedError: (): void => { httpMocks.mockForbiddenError(/surveys/, 'GET', 'surveys') },
  mockOk: (): void => { httpMocks.mockOk(/surveys/, 'GET', mockSurveyResponse(), 'surveys') }
}

describe('SurveyResponse', () => {
  beforeEach(() => {
    cy.intercept({
      url: /surveys/,
      middleware: true
    }, req => {
      req.on('response', res => { res.setDelay(100) })
    })
    localStorage.setItem('account', JSON.stringify(mockAccount()))
    cy.visit('/surveys/any_id')
  })

  it('Should show surveyResponse correctly', () => {
    http.mockOk()
    cy.dataTestId('day').should('have.text', '03')
    cy.dataTestId('month').should('have.text', 'jul')
    cy.dataTestId('year').should('have.text', '2023')
    cy.dataTestId('question').should('have.text', 'any_question')
    cy.get('li:first-child').then(li => {
      assert.notExists(li.find('[data-testid="image"]'))
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
      assert.equal(li.find('[data-testid="percent"]').text(), '0%')
    })
    cy.get('li:last-child').then(li => {
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'image.png')
      assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer')
      assert.equal(li.find('[data-testid="percent"]').text(), '100%')
    })
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

  it('Should retry to load SurveyResponse on button click', () => {
    http.mockUnexpectedError()
    cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
    http.mockOk()
    cy.dataTestId('retry').click()
    cy.dataTestId('answers').should('exist')
  })

  it('Should show error message on UnexpectedError', () => {
    http.mockUnexpectedError()
    cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
  })

  it('Should logout on AccessDeniedError', () => {
    http.mockAccessDeniedError()
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })
})
