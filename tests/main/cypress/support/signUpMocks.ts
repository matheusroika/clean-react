import * as httpMocks from './httpMocks'

export const mockEmailInUseError = (): void => { httpMocks.mockEmailInUseError(/signup/, 'signUp') }
export const mockUnexpectedError = (): void => { httpMocks.mockUnexpectedError(/signup/, 'POST', 'signUp') }
export const mockOkResponse = (): void => {
  httpMocks.mockOk(/signup/, 'POST', {
    name: 'Test Name',
    accessToken: 'test_token',
    email: 'test@email.com'
  }, 'signUp')
}
export const mockOkWithInvalidResponse = (): void => { httpMocks.mockOk(/signup/, 'POST', { invalid: 'invalid' }, 'signUp') }
