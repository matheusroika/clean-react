import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/currentAccountAdapter'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'
import { mockAccount } from '../../domain/mocks'

jest.mock('@/infra/cache/localStorageAdapter')

describe('Current Account Adapter', () => {
  test('Should call localStorageAdapter.set with correct values', () => {
    const account = mockAccount()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should call localStorageAdapter.get with correct values', () => {
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get')
    getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
  })

  test('Should return correct values on localStorageAdapter.get call', () => {
    const account = mockAccount()
    jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)
    const result = getCurrentAccountAdapter()
    expect(result).toEqual(account)
  })
})
