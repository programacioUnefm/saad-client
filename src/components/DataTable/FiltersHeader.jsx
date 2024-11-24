import React from 'react'
import { TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { flexRender } from '@tanstack/react-table'
import { ArrowDownNarrowWide, ArrowLeftRight, ArrowUpNarrowWide } from 'lucide-react'
import { FiltersDataTable } from './FiltersDataTable'

export const FiltersHeader = ({ table, filtersTable, setFiltersTable }) => {
  // funcion para organizar los items de forma ascendentes o descendentes
  const sortingHandle = (e) => {
    if (filtersTable.sorting.length === 0) {
      setFiltersTable((prevState) => ({
        ...prevState,
        sorting: [{ id: e.id, desc: true }]
      }))
    } else {
      if (filtersTable.sorting[0].desc) {
        setFiltersTable((prevState) => ({
          ...prevState,
          sorting: [{ id: e.id, desc: false }]
        }))
      } else {
        if (filtersTable.sorting[0].id === e.id) {
          setFiltersTable((prevState) => ({
            ...prevState,
            sorting: []
          }))
        } else {
          setFiltersTable((prevState) => ({
            ...prevState,
            sorting: [{ id: e.id, desc: true }]
          }))
        }
      }
    }
  }
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                className={header.column.columnDef.classname}
                colSpan={header.colSpan}
              >
                {header.isPlaceholder
                  ? null
                  : (
                    <div className=''>
                      {header.column.getIsSorted() != null && (
                        <div className='relative py-2'>
                          {header.column.getCanSort()
                            ? (
                              <Button
                                variant='ghost'
                                size='sm'
                                className=' h-8'
                                onClick={() => sortingHandle(header.column)}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {
                                    {
                                      asc: (
                                        <ArrowUpNarrowWide className='ml-2 w-4' />
                                      ),
                                      desc: (
                                        <ArrowDownNarrowWide className='ml-2 w-4' />
                                      )
                                    }[header.column.getIsSorted() ?? null]
                                }
                                {!header.column.getIsSorted() && (
                                  <ArrowLeftRight className='ml-2 w-3 rotate-90' />
                                )}
                              </Button>
                              )
                            : (
                              <Button
                                variant='link'
                                className='p-0 h-8 text-ring/70'
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </Button>
                              )}
                          <br />
                          <FiltersDataTable
                            header={header}
                            filtersTable={filtersTable}
                            setFiltersTable={setFiltersTable}
                          />
                        </div>
                      )}
                    </div>
                    )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
