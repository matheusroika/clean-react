import type { AddAccountParams } from '../useCases/AddAccount'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'Any Name',
  email: 'any@email.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})
