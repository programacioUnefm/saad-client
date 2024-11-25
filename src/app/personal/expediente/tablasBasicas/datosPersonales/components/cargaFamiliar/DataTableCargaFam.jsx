import { DataTable } from '@/components/DataTable/DataTable'
import { Button } from '@/components/ui/button'
import { getCargaFam } from '@/features/personal/expediente/tablasBasicas/datosPersonales/cargaFamiliarThunk'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { differenceInYears, parseISO } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const DataTableCargaFam = ({ employed, setcargaFamDialogStatus, setaction, setData }) => {
  const dispatch = useDispatch()
  const [data, setdata] = useState(null)
  const getData = async () => {
    const resp = await dispatch(getCargaFam(employed.id))
    if (resp) {
      setdata([...resp])
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const calcularEdad = (fechaNacimiento) => {
    const fechaNacimientoDate = parseISO(fechaNacimiento)
    const hoy = new Date()
    return differenceInYears(hoy, fechaNacimientoDate)
  }

  const editHandled = (item) => {
    setData({ ...item })
    setaction('form')
  }

  const columns = [
    {
      header: 'CEDULA',
      accessorKey: 'cedula_fam',
      classname: 'text-center',
      cell: (info) => (
        <div className='text-center'>{info.getValue()}</div>
      )
    },
    {
      header: 'NOMBRE',
      accessorKey: 'nombre1',
      cell: (info) => (
        <div className=''>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className='whitespace-nowrap capitalize truncate'>{`${info.row.original.nombre1} ${info.row.original.apellido1}`}</span>
              </TooltipTrigger>
              <TooltipContent className='max-w-[500px]'>
                {`${info.row.original.nombre1} ${info.row.original.nombre2} ${info.row.original.apellido1} ${info.row.original.apellido2}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
    {
      header: 'SEXO',
      accessorKey: 'sexo',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>
    },
    {
      header: 'NACIMIENTO',
      classname: 'text-center',
      accessorKey: 'nacimiento',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>,
      meta: {
        filterVariant: 'dateRange'
      }
    },
    {
      id: 'edad',
      header: 'EDAD',
      classname: 'text-center',
      accessorKey: 'nacimiento',
      cell: (info) => <div className='text-center'>{calcularEdad(info.getValue())}</div>
    },
    {
      header: 'PARENTESCO',
      classname: 'text-center',
      enableSorting: false,
      accessorKey: 'parentesco',
      cell: (info) => <div className='text-center uppercase'>{info.getValue()}</div>
    },
    // TODO: Esta va a cambiar
    {
      header: 'DISCAPACIDAD',
      accessorKey: 'tipo_discapacidad',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue().discapacidad : 'N/A'}</div>
    },
    {
      header: 'REGISTRADO',
      accessorKey: 'registrado',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    },
    {
      header: 'FALLECIMIENTO',
      accessorKey: 'fallecimiento',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    },
    {
      id: 'acciones',
      header: 'ACCIONES',
      enableSorting: false,
      accessorKey: 'acciones',
      classname: 'text-center',
      enableFiltering: false,
      cell: ({ row }) => <Actions row={row.original} />
    }
  ]
  const Actions = ({ row }) => {
    return (
      <div className='text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>ACCIONES</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => editHandled(row)}>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div>
      <ScrollArea className='w-[72vw] md:w-[72vw] 2xl:w-[100%] whitespace-nowrap'>
        <DataTable data={data} columns={columns} />
      </ScrollArea>
      <div className='flex gap-4'>
        <Button variant='outline' onClick={() => setcargaFamDialogStatus({ employed: {}, status: false })}>Cerrar</Button>
        <Button onClick={() => setaction('form')}>Agregar familiar</Button>
      </div>
    </div>
  )
}
