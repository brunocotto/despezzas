import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { createExpense } from '@/api/create-expense'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const expenseSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  date: z.date().nullable(),
  amount: z.number().nullable(),
  paymentType: z.number().nullable(),
  tags: z.array(z.number()).default([]),
})

type ExpenseSchema = z.infer<typeof expenseSchema>

export enum Tag {
  Health = 0,
  Essential = 1,
  Variable = 2,
  Fixed = 3,
  Personal = 4,
  Emergency = 5,
  Investment = 6,
  Leisure = 7,
  Education = 8,
  Transportation = 9,
}

function getTagLabel(tag: Tag) {
  const labels: { [key in Tag]: string } = {
    [Tag.Health]: 'Saúde',
    [Tag.Essential]: 'Essencial',
    [Tag.Variable]: 'Variável',
    [Tag.Fixed]: 'Fixo',
    [Tag.Personal]: 'Pessoal',
    [Tag.Emergency]: 'Emergência',
    [Tag.Investment]: 'Investimento',
    [Tag.Leisure]: 'Lazer',
    [Tag.Education]: 'Educação',
    [Tag.Transportation]: 'Transporte',
  }
  return labels[tag]
}

export function ExpenseCreate() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
  })

  const { mutateAsync: createExpenseFn } = useMutation({
    mutationFn: (data: ExpenseSchema) => createExpense(data),
    onSuccess: () => {
      navigate('/despesas', { replace: true })
    },
  })

  async function handleCreateExpense(data: ExpenseSchema) {
    try {
      await createExpenseFn({
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

  const paymentTypeMap: { [key: number]: string } = {
    0: 'Dinheiro',
    1: 'Cartão de Crédito',
    2: 'Cartão de Débito',
    3: 'PIX',
  }

  // Use watch safely
  const tags = watch('tags') || []
  const selectedTag = tags.length > 0 ? tags[0].toString() : '' // Certifica-se de que é uma string

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar Despesa</DialogTitle>
        <DialogDescription>
          Registe uma nova despesa no sistema
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateExpense)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="title">
              Título
            </Label>
            <Input className="col-span-3" id="title" {...register('title')} />
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
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && <span>{errors.amount.message}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="date">
              Data
            </Label>
            <div className="col-span-3">
              <DatePicker
                onSelect={(date: Date | null) => setValue('date', date)}
              />
              {errors.date && <span>{errors.date.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="paymentType">
              Tipo de Pagamento
            </Label>
            <div className="col-span-3">
              <Select
                onValueChange={(value) =>
                  setValue('paymentType', Number(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(paymentTypeMap).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.paymentType && <span>{errors.paymentType.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="tags">
              Tags
            </Label>
            <div className="col-span-3">
              <Select
                value={selectedTag}
                onValueChange={(value) => {
                  setValue('tags', [Number(value)])
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma tag" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Tag)
                    .filter((value) => typeof value === 'number')
                    .map((tag) => (
                      <SelectItem key={tag} value={tag.toString()}>
                        {getTagLabel(tag as Tag)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.tags && <span>{errors.tags.message}</span>}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant={'sucess'} disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
