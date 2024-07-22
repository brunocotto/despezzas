import { api } from '@/lib/axios'

export interface GetOrderDetailsParams {
  expenseId?: string | null
}

export interface GetExpensesResponse {
  id: string | null
  title: string | null
  description: string | null
  date: Date | null
  amount: number | null
  paymentType: number | null
  tags: number[]
}

export async function getExpensesDetails({ expenseId }: GetOrderDetailsParams) {
  const response = await api.get<GetExpensesResponse>(`expenses/${expenseId}`)

  return response.data
}
