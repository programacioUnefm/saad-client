import { DataTable } from '@/components/DataTable/DataTable'
import { Badge } from '@/components/ui/badge'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const ParroquiasTab = () => {
  const { parroquias, municipios } = useSelector((state) => state.personal.expediente.tablasBasicas.dataPais)

  const findMunicipioById = (id) => {
    const municipio = municipios.data.find(municipio => municipio.id === id)
    return municipio ? municipio.nombre : null
  }

  const { data } = parroquias
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
      id: 'municipio',
      accessorKey: 'municipio_id',
      classname: 'text-center',
      cell: (info) => <div className='text-center uppercase'><Badge>{findMunicipioById(info.getValue())}</Badge></div>
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
      municipio: true
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
