import router from '../routes/router'

export const redirectAdapter = async (path: string): Promise<void> => {
  await router.navigate(path)
}
