import * as httpMocks from './httpMocks'

export const mockUnexpectedError = (): void => { httpMocks.mockServerError(/surveys/, 'GET', 'surveys') }
export const mockAccessDeniedError = (): void => { httpMocks.mockForbiddenError(/surveys/, 'GET', 'surveys') }
