import * as httpMocks from './httpMocks'

export const mockUnexpectedError = (): void => { httpMocks.mockServerError(/surveys/, 'GET', 'surveys') }
