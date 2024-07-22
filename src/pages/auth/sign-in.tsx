import { zodResolver } from '@hookform/resolvers/zod'
import { DollarSign, Loader2, Mail } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/AuthProvider/useAuth'

const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('E-mail inválido.')
    .toLowerCase(),
  password: z.string().min(1, 'A senha é obrigatória.'),
})

type signInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const { register, handleSubmit, formState } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
  })
  const { isSubmitting, errors } = formState

  const { toast } = useToast()
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleSignIn(data: signInFormData) {
    try {
      await auth.authenticate(data.email, data.password)

      navigate('/')
    } catch (error) {
      toast({
        description: 'E-mail ou senha inválidos.',
        type: 'foreground',
        duration: 2500,
        role: 'alertdialog',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Helmet title="login" />
      <div className="p-8">
        <div className="flex w-[400px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <div className="flex items-center justify-center gap-1 pb-12">
              <DollarSign className="h-6 w-6" />
              <span className="text-2xl font-semibold">Despezzas</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Acessar Plataforma
            </h1>
            <p className="text-md text-muted-foreground">
              Análise suas despesas com o Despezzas
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
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
            <div>
              <Label className="cursor-pointer text-sm text-muted-foreground hover:underline">
                <Link to="/sign-up">Não pussui uma conta? Registre-se</Link>
              </Label>
            </div>

            {!isSubmitting ? (
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Entrar
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
          <a
            href="https://api.whatsapp.com/send?phone=5551997124118"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="rounded-lg bg-muted/40 hover:bg-muted">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Gostaria de mais informações?
                </CardTitle>
                <Mail className="h4 w4" />
              </CardHeader>
              <CardContent className="flex items-center justify-start">
                <div className="flex items-center">
                  <span className="text-md text-muted-foreground">
                    Entre em contato.
                  </span>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </>
  )
}
