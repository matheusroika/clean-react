import * as httpMocks from './httpMocks'

export const mockInvalidCredentialsError = (): void => { httpMocks.mockUnauthorizedError(/login/, 'login') }
export const mockUnexpectedError = (): void => { httpMocks.mockServerError(/login/, 'POST', 'login') }
export const mockOkResponse = (): void => {
  httpMocks.mockOk(/login/, 'POST', {
    name: 'Test Name',
    accessToken: 'test_token',
    email: 'test@email.com'
  }, 'login')
}
