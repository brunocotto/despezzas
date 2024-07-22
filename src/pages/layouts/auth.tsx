import { DollarSign } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { Label } from '@/components/ui/label'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 antialiased lg:grid-cols-2">
      <div className="relative hidden h-full flex-col justify-between border-r border-foreground/5 bg-muted/40 p-20 text-muted-foreground lg:flex">
        <div className="flex flex-col items-center text-foreground">
          <div className="flex items-center gap-1 pb-64">
            <DollarSign className="h-6 w-6" />
            <span className="text-2xl font-semibold">Despezzas</span>
          </div>
        </div>
        <footer className="relative bottom-0 z-10 flex w-full items-center justify-center">
          <Label className="text-md font-normal text-white">
            Criado e desenvolvido por &copy; Bruno Otto{' '}
            {new Date().getFullYear()}
          </Label>
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
