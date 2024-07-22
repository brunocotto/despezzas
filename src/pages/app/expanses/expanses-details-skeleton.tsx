import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function ExpenseDetailsSkeleton() {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-1">
            Despesa: <Skeleton className="h-5 w-[60px]" />
          </DialogTitle>
          <DialogDescription>Detalhes da Despesa</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Título</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-[60px]" />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Descrição
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-[60px]" />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Valor</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-[60px]" />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Tipo Pagamento
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-[60px]" />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Ocorreu em
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-[150px]" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </>
  )
}
