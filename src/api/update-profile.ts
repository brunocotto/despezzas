import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  name: string
  email: string
}

export async function updateProfile({ name, email }: UpdateProfileBody) {
  await api.put('/user', {
    name,
    email,
  })
}
