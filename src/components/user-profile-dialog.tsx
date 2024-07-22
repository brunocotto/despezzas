import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getProfile } from '@/api/get-profile'
import { updateProfile, UpdateProfileBody } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

const userProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

type UserProfileSchema = z.infer<typeof userProfileSchema>

export function UserProfileDialog() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    values: {
      name: profile?.name ?? '',
      email: profile?.email ?? '',
    },
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: (data: UpdateProfileBody) => updateProfile(data),
  })

  async function handleUpdateProfile(data: UserProfileSchema) {
    try {
      // console.log('Updating profile with data:', data) // Adicionado para depuração
      await updateProfileFn({
        name: data.name,
        email: data.email,
      })
    } catch (error) {
      // console.error('Error updating profile:', error) // Adicionado para depuração
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil do Usuário</DialogTitle>
        <DialogDescription>
          Atualize as informações da sua conta
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="email">
              Email
            </Label>
            <Input className="col-span-3" id="email" {...register('email')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="sucess" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
