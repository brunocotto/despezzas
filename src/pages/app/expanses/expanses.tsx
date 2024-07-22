import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { getExpenses } from '@/api/get-expense'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ExpenseCreate } from './expanses-create'
import { ExpenseTableRow } from './expanses-table-row'
import { ExpanseTableSkeleton } from './expanses-table-skeleton'

export function Expenses() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchParams] = useSearchParams()

  const expenseId = searchParams.get('expenseId')

  const { data: result, isLoading: IsLoadingExpenses } = useQuery({
    queryKey: ['expenses', expenseId],
    queryFn: () => getExpenses(),
  })

  // console.log(result?.meta)

  return (
    <>
      <Helmet title="Despesas" />
      <div className="flex flex-col gap-4">
        {/* <h1 className="text-3xl font-bold tracking-tight">Despesas</h1> */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="sucess" size="xs" className="w-32">
              <Plus className="mr-2 h-3 w-3" />
              Nova Despesa
            </Button>
          </DialogTrigger>
          <ExpenseCreate />
        </Dialog>

        <div className="space-y-2">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead>Identificador</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Tipo Pagamento</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Ocorreu em</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {IsLoadingExpenses && <ExpanseTableSkeleton />}
                {result &&
                  result.expenses.map((expense) => {
                    return (
                      <ExpenseTableRow key={expense.id} expenses={expense} />
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
