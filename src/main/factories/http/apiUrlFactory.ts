import { apiUrl } from '@/main/config/env'

export const makeApiUrl = (route: string): string => {
  return `${apiUrl}${route}` || `http://localhost:5050/api${route}`
}
