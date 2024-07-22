import { BarChart2 } from 'lucide-react'

import { NavLink } from './nav-link'
import { Label } from './ui/label'
import { Separator } from './ui/separator'

export function Menu() {
  // const { data: profile } = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: getProfile,
  //   staleTime: Infinity,
  // })

  return (
    <div className="h-full">
      <div className="flex h-full justify-between py-4">
        <div className="flex h-full items-center justify-start">
          <nav className="flex h-full flex-col items-center gap-4">
            <NavLink to={'/'}>
              <BarChart2 className="h-8 w-8" />
              <Label>Despesas</Label>
            </NavLink>
            {/* {profile?.name === 'administrator' ? (
              <NavLink to={'/usuarios'}>
                <Users className="h-8 w-8" />
                Usuários
              </NavLink>
            ) : (
              ''
            )} */}
          </nav>
        </div>
        {/* `Separator` com altura total */}
        <Separator orientation="vertical" className="h-full" />
      </div>
    </div>
  )
}
