import { api } from '@/lib/axios'

export interface DeleteExpenseParams {
  expenseId: string
}

export async function deleteExpense({ expenseId }: DeleteExpenseParams) {
  const response = await api.delete(`/expenses/${expenseId}`)

  return response.data
}
