import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getExpensesDetails } from '@/api/get-expense-details'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { ExpenseDetailsSkeleton } from './expanses-details-skeleton'

export interface ExpenseDetailsProps {
  expenseId?: string | null
  open: boolean
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

export function ExpenseDetails({ expenseId, open }: ExpenseDetailsProps) {
  const { data } = useQuery({
    queryKey: ['expense', expenseId],
    queryFn: () => getExpensesDetails({ expenseId }),
    enabled: open,
  })

  let formattedDate: string

  if (data?.date) {
    const date = new Date(data?.date)
    formattedDate = format(date, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR,
    })
  } else {
    formattedDate = ''
  }

  return (
    <>
      {data ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Despesa: {data.id}</DialogTitle>
            <DialogDescription>Detalhes da Despesa</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Título
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{data.title}</span>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Descrição
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{data.description}</span>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Valor</TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{data.amount}</span>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Tipo Pagamento
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {getPaymentTypeText(data.paymentType!)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Ocorreu em
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{formattedDate}</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      ) : (
        <ExpenseDetailsSkeleton />
      )}
    </>
  )
}
