import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { DollarSign, Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { registerUser, RegisterUserBody } from '@/api/register-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/AuthProvider/useAuth'

const signUpFormSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .min(1, 'O e-mail é obrigatório.')
      .email('E-mail inválido.')
      .toLowerCase(),
    password: z
      .string()
      .min(1, 'A senha é obrigatória.')
      .regex(
        /(?=.*[a-z])/,
        'A senha deve conter pelo menos uma letra minúscula.',
      )
      .regex(
        /(?=.*[A-Z])/,
        'A senha deve conter pelo menos uma letra maiúscula.',
      )
      .regex(/(?=.*[0-9])/, 'A senha deve conter pelo menos um número.')
      .regex(
        /(?=.*[!#@?])/,
        'A senha deve conter um caractere especial [! # @ ?].',
      ),
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

type signUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const { register, handleSubmit, formState } = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })
  const { isSubmitting, errors } = formState

  const { toast } = useToast()
  const auth = useAuth()
  const navigate = useNavigate()

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: (data: RegisterUserBody) => registerUser(data),
  })

  async function handleSignUp(data: signUpFormData) {
    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast({
        description: 'Usuário cadastrado com sucesso.',
        type: 'foreground',
        duration: 2000,
        role: 'alertdialog',
        variant: 'default',
      })

      await auth.authenticate(data.email, data.password)
      navigate('/')
    } catch (error) {
      toast({
        description: 'Erro ao cadastrar usuário.',
        type: 'foreground',
        duration: 2000,
        role: 'alertdialog',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <div className="flex w-[400px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <div className="flex items-center justify-center gap-1 pb-12">
              <DollarSign className="h-6 w-6" />
              <span className="text-2xl font-semibold">Despezzas</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Criar conta</h1>
            <p className="text-md text-muted-foreground">
              Seja um usuário e comece a usar
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-md" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                type="name"
                placeholder="John Doe"
                autoFocus
                {...register('name')}
              />
              <div className="mt-1">
                {errors.name && (
                  <Label className="text-rose-500 dark:text-rose-400">
                    {errors.name.message}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="email">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                autoFocus
                {...register('email')}
              />
              <div className="mt-1">
                {errors.email && (
                  <Label className="text-rose-500 dark:text-rose-400">
                    {errors.email.message}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2 ">
              <Label className="text-md" htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="**********"
                {...register('password')}
              />
              <div className="mt-1">
                {errors.password && (
                  <Label className="text-rose-500 dark:text-rose-400">
                    {errors.password.message}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="confirmPassword">
                Confirmar Senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="**********"
                {...register('confirmPassword')}
              />
              <div className="mt-1">
                {errors.confirmPassword && (
                  <Label className="text-rose-500 dark:text-rose-400">
                    {errors.confirmPassword.message}
                  </Label>
                )}
              </div>
            </div>

            <div>
              <Label className="cursor-pointer text-sm text-muted-foreground hover:underline">
                <Link to="/sign-in">Retornar para a página de login</Link>
              </Label>
            </div>

            {!isSubmitting ? (
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Finalizar Cadastro
              </Button>
            ) : (
              <>
                <Button
                  disabled={isSubmitting}
                  className="w-full"
                  type="submit"
                >
                  <div className="flex w-full items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted" />
                  </div>
                </Button>
              </>
            )}
          </form>
          <Separator orientation="horizontal" />
        </div>
      </div>
    </>
  )
}
