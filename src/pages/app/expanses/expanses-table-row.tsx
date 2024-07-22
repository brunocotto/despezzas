import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { ExpenseDelete } from './expanses-delete'
import { ExpenseDetails } from './expanses-details'
import { ExpenseEdit } from './expanses-edit'

export interface ExpenseTableRowProps {
  expenses: {
    id?: string | null
    title: string | null
    description: string | null
    date: Date | null
    amount: number | null
    paymentType: number | null
    tags: number[]
  }
}

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

const paymentTypeMap: { [key: number]: string } = {
  0: 'Dinheiro',
  1: 'Cartão de Crédito',
  2: 'Cartão de Débito',
  3: 'PIX',
}

function getPaymentTypeText(paymentType: number): string {
  return paymentTypeMap[paymentType] || 'Unknown'
}

export function ExpenseTableRow({ expenses }: ExpenseTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  let formattedDate: string

  console.log(expenses.tags)

  if (expenses.date) {
    const date = new Date(expenses.date)
    formattedDate = format(date, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR,
    })
  } else {
    formattedDate = ''
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes da Despesa</span>
            </Button>
          </DialogTrigger>

          <ExpenseDetails open={isDetailsOpen} expenseId={expenses.id} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {expenses.id}
      </TableCell>
      <TableCell className="font-mono font-medium text-muted-foreground">
        {expenses.title}
      </TableCell>
      <TableCell className="font-mono font-medium text-muted-foreground">
        {expenses.description}
      </TableCell>
      <TableCell className="font-mono font-medium text-destructive">
        {expenses.amount != null
          ? `- R$ ${expenses.amount.toFixed(2).replace('.', ',')}`
          : 'R$ 0,00'}
      </TableCell>
      <TableCell className="font-mono font-medium text-muted-foreground">
        {getPaymentTypeText(expenses.paymentType!)}
      </TableCell>
      <TableCell className="font-mono font-medium text-muted-foreground">
        {expenses.tags.length > 0 ? (
          expenses.tags.map((tag, index) => (
            <span key={index}>
              {getTagLabel(tag as Tag)}
              {index < expenses.tags.length - 1 && ', '}
            </span>
          ))
        ) : (
          <span>Nenhuma tag</span>
        )}
      </TableCell>
      <TableCell className="text-muted-foreground">{formattedDate}</TableCell>
      <TableCell>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Pencil className="mr-2 h-3 w-3" />
              Editar
            </Button>
          </DialogTrigger>
          <ExpenseEdit open={isEditOpen} expenseId={expenses.id} />
        </Dialog>
      </TableCell>
      <TableCell>
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="xs">
              <X className="mr-2 h-3 w-3" />
              Deletar
            </Button>
          </DialogTrigger>
          <ExpenseDelete open={isDeleteOpen} expenseId={expenses.id} />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
