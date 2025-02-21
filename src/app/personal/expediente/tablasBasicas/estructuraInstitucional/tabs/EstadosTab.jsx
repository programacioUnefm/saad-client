import { DataTable } from '@/components/DataTable/DataTable'
import { Badge } from '@/components/ui/badge'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const EstadosTab = () => {
  const { paises, estados } = useSelector((state) => state.personal.expediente.tablasBasicas.dataPais)

  const findPaisById = (id) => {
    const estado = paises.data.find(estado => estado.id === id)
    return estado ? estado.nombre : null
  }

  const { data } = estados
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>,
      meta: {
        filterVariant: 'range'
      }
    },
    {
      accessorKey: 'nombre',
      classname: '',
      cell: (info) => <div className=''>{info.getValue()}</div>
    },
    {
      accessorKey: 'region',
      classname: '',
      cell: (info) => <div className=''>{info.getValue()}</div>
    },
    {
      id: 'pais',
      accessorKey: 'pais_id',
      classname: 'text-center',
      cell: (info) => <div className='text-center uppercase'><Badge>{findPaisById(info.getValue())}</Badge></div>
    }
    // {
    //   id: 'acciones',
    //   header: 'ACCIONES',
    //   enableSorting: false,
    //   accessorKey: 'acciones',
    //   classname: '',
    //   enableFiltering: false,
    //   cell: ({ row }) => <Actions row={row.original} />
    // }
  ]
  const [filtersTable, setFiltersTable] = useState({
    columnVisibility: {
      id: true,
      nombre: true,
      region: true,
      pais: true
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
    <DataTable columns={columns} data={data} filtersTable={filtersTable} setFiltersTable={setFiltersTable} />
  )
}
