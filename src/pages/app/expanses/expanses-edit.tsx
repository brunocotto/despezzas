import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getExpensesDetails } from '@/api/get-expense-details'
import { updateExpense } from '@/api/update-expense'
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

export interface ExpenseEditProps {
  expenseId?: string | null
  open: boolean
}
const expenseSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  date: z.date().nullable(),
  amount: z.number().nullable(),
  paymentType: z.number().nullable(),
  tags: z.array(z.number()).default([]),
})

type ExpenseSchema = z.infer<typeof expenseSchema>

export function ExpenseEdit({ expenseId, open }: ExpenseEditProps) {
  const { data } = useQuery({
    queryKey: ['expenses', expenseId],
    queryFn: () => getExpensesDetails({ expenseId }),
    enabled: open,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: data?.title ?? null,
      description: data?.description ?? null,
      date: data?.date ?? null,
      amount: data?.amount ?? null,
      paymentType: data?.paymentType ?? null,
      tags: data?.tags ?? [],
    },
  })

  const { mutateAsync: updateExpenseFn } = useMutation({
    mutationFn: (data: ExpenseSchema) => updateExpense(data),
  })

  async function handleUpdateExpense(data: ExpenseSchema) {
    try {
      await updateExpenseFn({
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? new Date(),
        amount: data.amount ?? 0,
        paymentType: data.paymentType ?? 0,
        tags: data.tags ?? [],
      })
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }

  if (!data) {
    return null
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edição da Despesa {data.id}</DialogTitle>
        <DialogDescription>
          Atualize as informações da despesa
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateExpense)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="title">
              Título
            </Label>
            <Input
              className="col-span-3"
              id="title"
              {...register('title')}
              defaultValue={data.title ?? ''}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Input
              className="col-span-3"
              id="description"
              {...register('description')}
              defaultValue={data.description ?? ''}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="amount">
              Valor
            </Label>
            <Input
              className="col-span-3"
              id="amount"
              type="number"
              {...register('amount')}
              defaultValue={data.amount ?? ''}
            />
            {errors.amount && <span>{errors.amount.message}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="date">
              Data
            </Label>
            <Input
              className="col-span-3"
              id="date"
              type="date"
              {...register('date', { valueAsDate: true })}
              disabled
            />
            {errors.date && <span>{errors.date.message}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="paymentType">
              Tipo de Pagamento
            </Label>
            <Input
              className="col-span-3"
              id="paymentType"
              type="number"
              {...register('paymentType')}
            />
            {errors.paymentType && <span>{errors.paymentType.message}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="tags">
              Tags
            </Label>
            <Input
              className="col-span-3"
              id="tags"
              type="text" // Assuming tags are input as comma-separated numbers
              {...register('tags')}
            />
            {errors.tags && <span>{errors.tags.message}</span>}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="sucess" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
