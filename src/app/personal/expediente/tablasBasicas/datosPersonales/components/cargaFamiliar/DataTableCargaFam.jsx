import { DataTable } from '@/components/DataTable/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getCargaFam } from '@/features/personal/expediente/tablasBasicas/datosPersonales/cargaFamiliarThunk'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { differenceInYears, parseISO } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const DataTableCargaFam = ({ employed, setcargaFamDialogStatus }) => {
  const dispatch = useDispatch()
  const [data, setdata] = useState(null)
  const getData = async () => {
    const resp = await dispatch(getCargaFam(employed.id))
    setdata([...resp])
  }
  useEffect(() => {
    getData()
  }, [])

  const calcularEdad = (fechaNacimiento) => {
    const fechaNacimientoDate = parseISO(fechaNacimiento)
    const hoy = new Date()
    return differenceInYears(hoy, fechaNacimientoDate)
  }

  const columns = [
    {
      id: 'acciones1',
      header: 'ACCIONES',
      enableSorting: false,
      accessorKey: 'acciones',
      classname: 'text-center',
      enableFiltering: false,
      cell: ({ row }) => <Actions row={row.original} />
    },
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
      header: 'CEDULA',
      accessorKey: 'cedula',
      classname: 'text-center',
      cell: (info) => (
        <div className='text-center'>{info.getValue()}</div>
      )
    },
    // {
    //   header: 'NOMBRE',
    //   accessorKey: 'nombre1',
    //   cell: (info) => (
    //     <div className=''>
    //       <TooltipProvider>
    //         <Tooltip>
    //           <TooltipTrigger>
    //             <span className='whitespace-nowrap capitalize truncate'>{`${info.row.original.nombre1} ${info.row.original.apellido1}`}</span>
    //           </TooltipTrigger>
    //           <TooltipContent className='max-w-[500px]'>
    //             {`${info.row.original.nombre1} ${info.row.original.nombre2} ${info.row.original.apellido1} ${info.row.original.apellido2}`}
    //           </TooltipContent>
    //         </Tooltip>
    //       </TooltipProvider>
    //     </div>
    //   )
    // },
    // {
    //   header: 'NACIMIENTO',
    //   classname: 'text-center',
    //   accessorKey: 'fecha_nacimiento',
    //   cell: (info) => <div className='text-center'>{info.getValue()}</div>,
    //   meta: {
    //     filterVariant: 'dateRange'
    //   }
    // },
    // {
    //   id: 'edad',
    //   header: 'EDAD',
    //   classname: 'text-center',
    //   accessorKey: 'fecha_nacimiento',
    //   cell: (info) => <div className='text-center'>{calcularEdad(info.getValue())}</div>
    // },
    {
      header: 'SEXO',
      accessorKey: 'sexo',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>
    },
    // {
    //   header: 'PARENTESCo',
    //   classname: 'text-center',
    //   enableSorting: false,
    //   accessorKey: 'parentesco',
    //   cell: (info) => <div className='text-center'>{info.getValue()}</div>
    // },
    // TODO: Esta va a cambiar
    // {
    //   header: 'DISCAPACIDAD',
    //   accessorKey: 'tipo_discapacidad',
    //   classname: 'text-center',
    //   meta: {
    //     filterVariant: 'range'
    //   },
    //   cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    // },
    // {
    //   header: 'REGISTRADO',
    //   accessorKey: 'registrado',
    //   classname: 'text-center',
    //   cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    // },
    // {
    //   header: 'FALLECIMIENTO',
    //   accessorKey: 'fallecimiento',
    //   classname: 'text-center',
    //   cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    // },
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
            {/* <DropdownMenuItem>Detalles</DropdownMenuItem> */}
            {/* <DropdownMenuItem onClick={(e) => editPersonalHandle(row)}>Editar personal</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => setcargaFamDialogStatus({ status: true, employed: { ...row } })}>Carga familiar</DropdownMenuItem> */}
            <DropdownMenuItem>Discapacidades</DropdownMenuItem>
            <DropdownMenuItem>Uniforme</DropdownMenuItem>
            <DropdownMenuItem>Estudios</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div>
      {data && <DataTable data={data} columns={columns} />}
      <div className='flex gap-4'>
        <Button variant='secondary' onClick={() => setcargaFamDialogStatus({ employed: {}, status: false })}>Cerrar</Button>
        <Button variant='outline' onClick={() => setcargaFamDialogStatus({ employed: {}, status: false })}>Agregar familiar</Button>
      </div>
    </div>
  )
}
