import { redirectAdapter } from '@/main/adapters/redirectAdapter'
import router from '@/main/routes/router'

jest.mock('@/main/routes/router')

describe('Redirect Adapter', () => {
  test('Should call router.navigate with correct path', async () => {
    const navigateSpy = jest.spyOn(router, 'navigate')
    await redirectAdapter('/test')
    expect(navigateSpy).toHaveBeenCalledWith('/test')
  })
})
