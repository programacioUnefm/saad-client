import React from 'react'
import { Button } from '../ui/button'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

export const Paginate = ({ table, paginationHandle }) => {
  return (
    <div className='absolute w-full -bottom-4 bg-background'>
      <div className='flex items-center justify-end space-x-2 py-4 pr-8'>
        <div className='flex-1 text-sm text-muted-foreground'>
          pagina {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()} -
          <span className='ml-1 font-bold text-ring'>
            items total {table.getFilteredRowModel().rows.length}
          </span>
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => paginationHandle('first')}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronFirst className='w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => paginationHandle('previous')}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => paginationHandle('next')}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => paginationHandle('last')}
            disabled={!table.getCanNextPage()}
          >
            <ChevronLast className='w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
