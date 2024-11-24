import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table'
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import { SkeletonDatatable } from '../Skeletons/SkeletonDatatable'
import PropTypes from 'prop-types'
import { Paginate } from './Paginate'
import { ConfigTable } from './ConfigTable'
import { NoData } from './NoData'
import { FiltersHeader } from './FiltersHeader'
import { NoFIlterHeader } from './NoFIlterHeader'

export const DataTable = ({ data, columns, filtersTable = null, setFiltersTable = null }) => {
  let table = {}
  if (filtersTable && setFiltersTable) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting: filtersTable.sorting,
        columnVisibility: filtersTable.columnVisibility,
        columnFilters: filtersTable.columnFilters,
        pagination: filtersTable.pagination,
        globalFilter: filtersTable.filters
      }
    })
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel()
    })
  }

  const paginationHandle = (event) => {
    const newPaginationState = { ...filtersTable.pagination }
    switch (event) {
      case 'next':
        newPaginationState.pageIndex = newPaginationState.pageIndex + 1
        break
      case 'previous':
        newPaginationState.pageIndex = newPaginationState.pageIndex - 1
        break
      case 'last':
        newPaginationState.pageIndex = table.getPageCount() - 1
        break
      case 'first':
        newPaginationState.pageIndex = 0
        break
    }
    setFiltersTable((prevState) => ({
      ...prevState,
      pagination: newPaginationState
    }))
  }

  // funcion para cambiar el input de busqueda general
  const changeFilter = (input) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      filters: input.target.value
    }))
  }

  const { siebarState } = useSelector((state) => state.ui)

  const scrollArea = 'w-[83vw] sm:w-[83vw]  xl:w-[85vw] 2xl:w-[90vw] rounded-md border bg-accent/10'
  const sidebarTrue = 'lg:w-[68vw] md:w-[66vw]'
  const sidebarFalse = 'lg:w-[83vw] md:w-[79vw]'
  return (
    <div>
      {
        data[0] !== 'load'
          ? (
            <div>
              <section className='filters px-1'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    {
                      filtersTable && (
                        <Input
                          placeholder='Buscador general'
                          value={filtersTable.filters}
                          onChange={(e) => {
                            changeFilter(e)
                          }}
                        />
                      )
                    }
                  </div>
                  {filtersTable && (
                    <ConfigTable filtersTable={filtersTable} setFiltersTable={setFiltersTable} />
                  )}
                </div>
              </section>

              <div className='mb-12 mt-4'>
                <ScrollArea className={filtersTable && `${scrollArea} ${siebarState ? sidebarTrue : sidebarFalse}`}>
                  <Table>
                    {filtersTable ? <FiltersHeader table={table} filtersTable={filtersTable} setFiltersTable={setFiltersTable} /> : <NoFIlterHeader table={table} />}
                    <TableBody>
                      {table.getRowModel().rows?.length
                        ? (
                            table.getRowModel().rows.map((row) => (
                              <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          )
                        : (
                          <NoData columns={columns} />
                          )}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation='horizontal' className='mb-2' />
                </ScrollArea>
                {filtersTable && data.length > filtersTable.view && (
                  <Paginate table={table} paginationHandle={paginationHandle} />
                )}
              </div>
            </div>
            )
          : <SkeletonDatatable />
      }
    </div>
  )
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  filtersTable: PropTypes.shape({
    columnVisibility: PropTypes.object.isRequired,
    filters: PropTypes.string.isRequired,
    sorting: PropTypes.array.isRequired,
    columnFilters: PropTypes.array.isRequired,
    view: PropTypes.number.isRequired,
    pagination: PropTypes.shape({
      pageIndex: PropTypes.number.isRequired,
      pageSize: PropTypes.number.isRequired
    })
  }),
  setFiltersTable: PropTypes.func
}
