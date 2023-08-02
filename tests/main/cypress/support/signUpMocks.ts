import * as httpMocks from './httpMocks'

export const mockEmailInUseError = (): void => { httpMocks.mockForbiddenError(/signup/, 'signUp') }
export const mockUnexpectedError = (): void => { httpMocks.mockServerError(/signup/, 'POST', 'signUp') }
export const mockOkResponse = (): void => {
  httpMocks.mockOk(/signup/, 'POST', {
    name: 'Test Name',
    accessToken: 'test_token',
    email: 'test@email.com'
  }, 'signUp')
}
