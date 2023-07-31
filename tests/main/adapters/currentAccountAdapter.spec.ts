import { setCurrentAccountAdapter } from '@/main/adapters/currentAccountAdapter'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'
import { mockAccount } from '../../domain/mocks'

jest.mock('@/infra/cache/localStorageAdapter')

describe('Current Account Adapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccount()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
