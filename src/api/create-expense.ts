import { api } from '@/lib/axios'

export interface CreateExpenseResponse {
  title: string | null
  description: string | null
  date: Date | null
  amount: number | null
  paymentType: number | null
  tags: number[]
}

export async function createExpense({
  title,
  description,
  date,
  amount,
  paymentType,
  tags,
}: CreateExpenseResponse) {
  const response = await api.post<CreateExpenseResponse>('/expenses', {
    title,
    description,
    date,
    amount,
    paymentType,
    tags,
  })

  return response.data
}
