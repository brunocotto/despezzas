import { api } from '@/lib/axios'

interface GetProfileResponse {
  name: string
  email: string
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/user')

  return response.data
}
