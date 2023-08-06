import * as httpMocks from '../utils/httpMocks'
import { mockAccount, mockSurveyResponse, mockUpdatedSurveyResponse } from '../../../domain/mocks'

const baseUrl: string = Cypress.config().baseUrl

describe('SurveyResponse', () => {
  beforeEach(() => {
    cy.intercept({
      url: /surveys\/any_id/,
      middleware: true
    }, req => {
      req.on('response', res => { res.setDelay(100) })
    }).as('delay')
    localStorage.setItem('account', JSON.stringify(mockAccount()))
    httpMocks.mockOk(/api\/surveys\/any_id/, 'GET', mockSurveyResponse(), 'surveys', 3)
    cy.visit('/surveys/any_id')
  })

  it('Should show correct username on header', () => {
    cy.dataTestId('userName').should('contain.text', mockAccount().name)
  })

  it('Should logout on header logout click', () => {
    cy.dataTestId('logout').click()
    cy.url().should('equal', `${baseUrl}/login`).then(() => {
      expect(localStorage.getItem('account')).to.be.a('null')
    })
  })

  it('Should go to Surveys page on back button click', () => {
    cy.dataTestId('back').click()
    cy.url().should('equal', `${baseUrl}/`)
  })

  describe('LoadSurveyResponse', () => {
    const http = {
      mockUnexpectedError: (): void => { httpMocks.mockServerError(/api\/surveys\/any_id/, 'GET', 'surveys') },
      mockAccessDeniedError: (): void => { httpMocks.mockForbiddenError(/api\/surveys\/any_id/, 'GET', 'surveys') },
      mockOk: (): void => { httpMocks.mockOk(/api\/surveys\/any_id/, 'GET', mockSurveyResponse(), 'surveys') }
    }

    it('Should show surveyResponse correctly', () => {
      http.mockOk()
      cy.visit('/surveys/any_id')
      cy.dataTestId('day').should('have.text', '03')
      cy.dataTestId('month').should('have.text', 'jul')
      cy.dataTestId('year').should('have.text', '2023')
      cy.dataTestId('question').should('have.text', 'any_question')
      cy.get('li:first-child').then(li => {
        cy.wrap(li).should('have.css', 'box-shadow', 'rgb(188, 71, 120) 0px 0px 3px 2px')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'image.png')
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '100%')
      })
      cy.get('li:last-child').then(li => {
        assert.notExists(li.find('[data-testid="image"]'))
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '0%')
      })
    })

    it('Should retry to load SurveyResponse on button click', () => {
      http.mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
      http.mockOk()
      cy.dataTestId('retry').click()
      cy.dataTestId('answers').should('exist')
    })

    it('Should show error message on UnexpectedError', () => {
      http.mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
    })

    it('Should logout on AccessDeniedError', () => {
      http.mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      cy.url().should('equal', `${baseUrl}/login`).then(() => {
        expect(localStorage.getItem('account')).to.be.a('null')
      })
    })
  })

  describe('SaveSurveyResponse', () => {
    beforeEach(() => {
      httpMocks.mockOk(/api\/surveys\/any_id/, 'GET', mockSurveyResponse(), 'surveys')
    })

    const http = {
      mockUnexpectedError: (): void => { httpMocks.mockServerError(/api\/surveys\/any_id/, 'PUT', 'surveys') },
      mockAccessDeniedError: (): void => { httpMocks.mockForbiddenError(/api\/surveys\/any_id/, 'PUT', 'surveys') },
      mockOk: (): void => { httpMocks.mockOk(/api\/surveys\/any_id/, 'PUT', mockUpdatedSurveyResponse(), 'surveys') }
    }

    it('Should show surveyResponse correctly', () => {
      http.mockOk()
      cy.get('li:last-child').click()
      cy.dataTestId('day').should('have.text', '01')
      cy.dataTestId('month').should('have.text', 'ago')
      cy.dataTestId('year').should('have.text', '2023')
      cy.dataTestId('question').should('have.text', 'other_question')
      cy.get('li:first-child').then(li => {
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'image.png')
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '80%')
      })
      cy.get('li:last-child').then(li => {
        cy.wrap(li).should('have.css', 'box-shadow', 'rgb(188, 71, 120) 0px 0px 3px 2px')
        assert.notExists(li.find('[data-testid="image"]'))
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '20%')
      })
    })

    it('Should retry to load SurveyResponse on button click', () => {
      http.mockUnexpectedError()
      cy.get('li:last-child').click()
      cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
      http.mockOk()
      cy.dataTestId('retry').click()
      cy.dataTestId('answers').should('exist')
    })

    it('Should show error message on UnexpectedError', () => {
      http.mockUnexpectedError()
      cy.get('li:last-child').click()
      cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
    })

    it('Should logout on AccessDeniedError', () => {
      http.mockAccessDeniedError()
      cy.get('li:last-child').click()
      cy.url().should('equal', `${baseUrl}/login`).then(() => {
        expect(localStorage.getItem('account')).to.be.a('null')
      })
    })
  })
})
