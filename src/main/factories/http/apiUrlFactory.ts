import { apiUrl } from '@/main/config/env'

export const makeApiUrl = (): string => {
  return `${apiUrl}/login` || 'http://localhost:5050/api/login'
}
