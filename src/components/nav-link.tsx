import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground data-[current=true]:bg-muted data-[current=true]:text-foreground"
      // className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      // className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-zinc-200"
      {...props}
    />
  )
}
