import axios from 'axios'

import { getUserLocalStorage } from '@/context/AuthProvider/util'
import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}

// adiciona o token no header das requisições
api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage()

    config.headers.Authorization = `Bearer ${user?.token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
