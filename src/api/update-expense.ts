import { api } from '@/lib/axios'

export interface UpdateExpenseResponse {
  title: string | null
  description: string | null
  date: Date | null
  amount: number | null
  paymentType: number | null
  tags: number[]
}

export async function updateExpense({
  title,
  description,
  date,
  amount,
  paymentType,
  tags,
}: UpdateExpenseResponse) {
  const response = await api.put<UpdateExpenseResponse>('/expenses', {
    title,
    description,
    date,
    amount,
    paymentType,
    tags,
  })

  return response.data
}
