import * as httpMocks from '../utils/httpMocks'
import { mockAccount, mockSurveys } from '../../../domain/mocks'

const baseUrl: string = Cypress.config().baseUrl

const http = {
  mockUnexpectedError: (): void => { httpMocks.mockServerError(/surveys/, 'GET', 'surveys') },
  mockAccessDeniedError: (): void => { httpMocks.mockForbiddenError(/surveys/, 'GET', 'surveys') },
  mockOk: (): void => { httpMocks.mockOk(/surveys/, 'GET', mockSurveys(2), 'surveys') }
}

const iconName = {
  thumbsUp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAQAAAB3TUQ1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfnBx0RDhkwyp7BAAAAnklEQVQoz42RsQkCQRBF3x7aioGRV4ORTdiDHVwNZgfmNqBFiIamJhqZmAnCMfMNDkWWW5kXLczjD/MXBlAjWacZ/1EjSZIvQ5rkdUizl8YBTbJjUfOVfrA2T5FkOwB7qIBdfZEkgJSgfxW23YIiVITwe1BkG1rtniaxxH11oS/gU9QwPv+OAcwKLZ7zq0+FYtbZz/jUDnmqPW2jEcAbWGHY3H/kdsoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDctMjlUMjA6MTQ6MjUtMDM6MDCLZwHeAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA3LTI5VDIwOjE0OjI1LTAzOjAw+jq5YgAAAABJRU5ErkJggg==',
  thumbsDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAQAAAB3TUQ1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfnBx0RDghaer4zAAAAnklEQVQoz43QsQkCQRSE4X8XrcHc0OxasBAjMRO5DmxDrEN7ODCyBgMzI0HQec/gBO/gVt9EC+9jYBYAH2mvu/eilxqbAejg7g6ALX0wagDaNwA6F6B60OZezBdm8A2R+FQKNdo650hh0jVPfpwTtL3pM/wvzHYJTSGnVZnaDcCOAyftuputLn/WqeO2ZTbWI8DAqhADW4QYWKVnib0B2pb1YBTGpj8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDctMjlUMjA6MTQ6MDgtMDM6MDColWdjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA3LTI5VDIwOjE0OjA4LTAzOjAw2cjf3wAAAABJRU5ErkJggg=='
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

  it('Should show surveyItems correctly', () => {
    http.mockOk()
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:first-child').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'jul')
      assert.equal(li.find('[data-testid="year"]').text(), '2023')
      assert.equal(li.find('[data-testid="question"]').text(), 'any_question')
      assert.equal(li.find('[data-testid="iconImg"]').attr('src'), iconName.thumbsDown)
    })
    cy.get('li:last-child').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '25')
      assert.equal(li.find('[data-testid="month"]').text(), 'dez')
      assert.equal(li.find('[data-testid="year"]').text(), '2022')
      assert.equal(li.find('[data-testid="question"]').text(), 'other_question')
      assert.equal(li.find('[data-testid="iconImg"]').attr('src'), iconName.thumbsUp)
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

  it('Should retry to load Surveys on button click', () => {
    http.mockUnexpectedError()
    cy.dataTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
    http.mockOk()
    cy.dataTestId('retry').click()
    cy.get('li:not(:empty)').should('have.length', 2)
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
