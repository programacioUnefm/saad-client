import { flexRender } from '@tanstack/react-table'
import React from 'react'
import { TableHead, TableHeader, TableRow } from '../ui/table'

export const NoFIlterHeader = ({ table }) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className='border-b'>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className={header.column.columnDef.classname}
              colSpan={header.colSpan}
            >
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}
