import { apiUrl } from '@/main/config/env'

export const makeApiUrl = (route: string): string => {
  return `${apiUrl}${route}`
}
