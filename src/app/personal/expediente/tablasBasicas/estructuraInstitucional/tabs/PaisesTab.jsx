import { DataTable } from '@/components/DataTable/DataTable'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const PaisesTab = () => {
  const { paises } = useSelector((state) => state.personal.expediente.tablasBasicas.dataPais)
  const { data } = paises
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>
    },
    {
      accessorKey: 'nombre',
      classname: '',
      cell: (info) => <div className=''>{info.getValue()}</div>
    }
  ]
  const [filtersTable, setFiltersTable] = useState({
    columnVisibility: {
      id: true,
      nombre: true
    },
    filters: '',
    sorting: [],
    columnFilters: [],
    view: 20,
    pagination: {
      pageIndex: 0,
      pageSize: 20
    }
  })
  return (
    <DataTable
      columns={columns}
      data={data !== undefined ? data : ['load']}
      filtersTable={filtersTable}
      setFiltersTable={setFiltersTable}
    />
  )
}
