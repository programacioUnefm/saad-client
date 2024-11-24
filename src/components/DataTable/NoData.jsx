import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { SearchX } from 'lucide-react'

export const NoData = ({ columns }) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className='h-[65vh]'>
        <div className='flex justify-center items-center flex-col w-full text-center'>
          <SearchX className='mb-4 text-ring ' size={50} />
          <span className='text-xl font-bold uppercase text-ring'>
            No hay resultados
          </span>
          <p className='mt-4'>
            Lo que estás intentando buscar no existe
            <br /> o no tienes privilegios para verlo.
          </p>
        </div>
      </TableCell>
    </TableRow>
  )
}
