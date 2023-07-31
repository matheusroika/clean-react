import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/currentAccountAdapter'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'
import { mockAccount } from '../../domain/mocks'
import { UnexpectedError } from '@/domain/errors'

jest.mock('@/infra/cache/localStorageAdapter')

describe('Current Account Adapter', () => {
  test('Should call localStorageAdapter.set with correct values', () => {
    const account = mockAccount()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should throw UnexpectedError if localStorageAdapter.set receives invalid param', () => {
    expect(() => { setCurrentAccountAdapter(undefined) }).toThrow(new UnexpectedError())
    expect(() => { setCurrentAccountAdapter({ name: undefined, email: 'any@email.com', accessToken: 'any_token' }) }).toThrow(new UnexpectedError())
    expect(() => { setCurrentAccountAdapter({ name: 'Any Name', email: undefined, accessToken: 'any_token' }) }).toThrow(new UnexpectedError())
    expect(() => { setCurrentAccountAdapter({ name: 'Any Name', email: 'any@email.com', accessToken: undefined }) }).toThrow(new UnexpectedError())
  })

  test('Should call localStorageAdapter.get with correct values', () => {
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get')
    getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
  })
})
