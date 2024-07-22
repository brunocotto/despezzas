import { isAxiosError } from 'axios'
import { BarChart2, DollarSign, Menu, Users } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { api } from '@/lib/axios'

export function AppLayout() {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status

          if (status === 401) {
            auth.logout()
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate, auth])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to={'/'} className="flex items-center gap-2 font-semibold">
              <DollarSign className="h-6 w-6" />
              <span className="">Despezzas</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink to={'/'}>
                <BarChart2 className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink to={'/despesas'}>
                <DollarSign className="h-4 w-4" />
                Despesas
              </NavLink>
              <NavLink to={'/usuarios'}>
                <Users className="h-4 w-4" />
                Usuários
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <DollarSign className="h-6 w-6" />
                  <span className="sr-only">Despezzas</span>
                </NavLink>
                <NavLink to={'/despesas'}>
                  <BarChart2 className="h-6 w-6" />
                  Despesas
                </NavLink>
                <NavLink to={'/users'}>
                  <Users className="h-6 w-6" />
                  Usuários
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Header />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
