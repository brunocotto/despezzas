import { api } from '@/lib/axios'

export interface GetExpenseResponse {
  expenses: [
    {
      id?: string | null
      title: string | null
      description: string | null
      date: Date | null
      amount: number | null
      paymentType: number | null
      tags: number[]
    },
  ]
}

export async function getExpenses() {
  const response = await api.get<GetExpenseResponse>('/expenses')

  return response.data
}
