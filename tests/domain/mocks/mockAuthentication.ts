import type { AuthParams } from '../../../src/domain/useCases/Authentication'

export const mockAuthParams = (): AuthParams => ({
  email: 'any@email.com',
  password: 'any_password'
})
