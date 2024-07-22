import { Helmet } from 'react-helmet-async'

export function Users() {
  return (
    <>
      <Helmet title="Usuários" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>

        <div className="grid grid-cols-4 gap-4"></div>
      </div>

      <div className="grid grid-cols-9 gap-4"></div>
    </>
  )
}
