export interface IUser {
  token?: string
  name?: string
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>
  logout: () => void
}

export interface IAuthProvider {
  children: JSX.Element
}
