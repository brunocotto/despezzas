import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { deleteExpense, DeleteExpenseParams } from '@/api/delete-expense'
import { getExpensesDetails } from '@/api/get-expense-details'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface ExpenseDeleteProps {
  expenseId?: string | null
  open: boolean
}

export function ExpenseDelete({ expenseId, open }: ExpenseDeleteProps) {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['expense', expenseId],
    queryFn: () => getExpensesDetails({ expenseId }),
    enabled: open,
  })

  const { mutateAsync: deleteExpenseFn, isPending: isDeletingExpense } =
    useMutation({
      mutationFn: (expenseId: DeleteExpenseParams) => deleteExpense(expenseId),
      onSuccess: () => {
        navigate('/', { replace: true })
      },
    })

  if (!data) {
    return null
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Deletar Despesa {data.id}</DialogTitle>
        <DialogDescription>
          Deletar as informações da despesa selecionada
        </DialogDescription>
      </DialogHeader>

      <form>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="se">
              Título
            </Label>
            <Input
              className="col-span-3"
              id="se"
              disabled
              defaultValue={data.title ?? ''}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="al">
              Descrição
            </Label>
            <Input
              className="col-span-3"
              id="al"
              disabled
              defaultValue={data.description ?? ''}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="al">
              Valor
            </Label>
            <Input
              className="col-span-3"
              id="al"
              disabled
              defaultValue={data.amount ?? ''}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              if (data.id) {
                deleteExpenseFn({ expenseId: data.id })
              } else {
                console.error('Expense ID is required to delete an expense.')
              }
            }}
            disabled={isDeletingExpense}
          >
            Deletar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
