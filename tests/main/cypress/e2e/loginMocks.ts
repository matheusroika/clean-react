import * as httpMocks from '../support/httpMocks'

export const mockInvalidCredentialsError = (): void => { httpMocks.mockInvalidCredentialsError(/login/, 'login') }
export const mockUnexpectedError = (): void => { httpMocks.mockUnexpectedError(/login/, 'POST', 'login') }
export const mockOkResponse = (): void => {
  httpMocks.mockOk(/login/, 'POST', {
    name: 'Test Name',
    accessToken: 'test_token',
    email: 'test@email.com'
  }, 'login')
}
export const mockOkWithInvalidResponse = (): void => { httpMocks.mockOk(/login/, 'POST', { invalid: 'invalid' }, 'login') }
