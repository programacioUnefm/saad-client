import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useSelector } from 'react-redux'
import { differenceInYears, parseISO } from 'date-fns'

export const DatosPerColumn = ({ setcargaFamDialogStatus, setactionButton, setdata, actionButton }) => {
  const { dataPais } = useSelector((state) => state.personal.expediente.tablasBasicas)

  const searchSome = (id, data) => {
    const resultado = data.find(item => item.id === id)
    return resultado || {}
  }

  const editPersonalHandle = (employee) => {
    const municipio = searchSome(employee.parroquia.municipio_id, dataPais.municipios.data)
    const estado = searchSome(municipio.estado_id, dataPais.estados.data)
    setdata({
      ...employee,
      pais: { id: employee.pais_nacimiento.id, nombre: employee.pais_nacimiento.nombre },
      parroquia: { id: employee.parroquia.id, nombre: employee.parroquia.nombre },
      municipio,
      estado,
      nivel_profesional_id: employee.nivel_profesional.id
    })

    setactionButton({
      status: !actionButton.status,
      textButton: actionButton.status ? 'Agregar personal' : 'Volver atras',
      title: actionButton.status ? 'Personal' : 'Agregar personal'
    })
  }

  const calcularEdad = (fechaNacimiento) => {
    const fechaNacimientoDate = parseISO(fechaNacimiento)
    const hoy = new Date(); return differenceInYears(hoy, fechaNacimientoDate)
  }

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
            <DropdownMenuItem onClick={(e) => editPersonalHandle(row)}>Editar personal</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => setcargaFamDialogStatus({ status: true, employed: { ...row } })}>Carga familiar</DropdownMenuItem>
            <DropdownMenuItem>Discapacidades</DropdownMenuItem>
            <DropdownMenuItem>Uniforme</DropdownMenuItem>
            <DropdownMenuItem>Estudios</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
  return [
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
    {
      header: 'DOC',
      accessorKey: 'documento',
      enableSorting: false,
      classname: 'text-center',
      cell: (info) => (
        <div className='text-center font-bold'>{info.getValue()}</div>
      )
    },
    {
      header: 'RIF',
      accessorKey: 'rif',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>
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
      id: 'nivel profesional',
      header: 'NIVEL',
      accessorKey: 'nivel_profesional',
      enableSorting: false,
      classname: 'text-center',
      // meta: {
      //   filterVariant: 'select',
      //   options: [
      //     { key: '01', value: '01' },
      //     { key: '02', value: '02' },
      //     { key: '03', value: '03' },
      //     { key: '04', value: '04' },
      //     { key: '05', value: '05' }
      //   ]
      // },
      cell: (info) => {
        return (
          <div className='text-center'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant='outline' className='line-clamp-1'>{info.getValue().nivel_profesional_corto}</Badge>
                </TooltipTrigger>
                <TooltipContent className='max-w-[300px]'>
                  <p>{info.getValue().nivel_profesional}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )
      }
    },
    {
      header: 'NACIMIENTO',
      classname: 'text-center',
      accessorKey: 'fecha_nacimiento',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>,
      meta: {
        filterVariant: 'dateRange'
      }
    },
    {
      id: 'edad',
      header: 'EDAD',
      classname: 'text-center',
      accessorKey: 'fecha_nacimiento',
      cell: (info) => <div className='text-center'>{calcularEdad(info.getValue())}</div>,
      meta: {
        filterVariant: 'dateRange'
      }
    },
    {
      header: 'DIRECCION',
      enableSorting: false,
      accessorKey: 'direccion',
      classname: 'text-center',
      cell: (info) => (
        <div className='text-center'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  className='max-w-[100px] overflow-hidden bg-slate-300 hover:text-white line-clamp-2 flex items-center gap-2 dark:bg-accent'
                >
                  <Search size={18} className='text-ring' />
                </Badge>
              </TooltipTrigger>
              <TooltipContent className='max-w-[500px]'>
                <p>{info.getValue()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
    // TODO: hacer que el email se recorte por tamño de caracteres y mostrar el email 2
    {
      header: 'EMAIL',
      accessorKey: 'email1',
      enableSorting: false,
      classname: 'text-center',
      cell: (info) => (
        <div className='text-center'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant='outline'
                  className='max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap break-all'
                >
                  {info.getValue().slice(0, 8) + '...'}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className='max-w-[500px]'>
                <p>{info.getValue()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
    {
      header: 'TELEFONO',
      classname: 'text-center',
      enableSorting: false,
      accessorKey: 'telefono',
      cell: (info) => (
        <div className='text-center flex flex-col -mt-2 -mb-2 gap-1'>
          <span>{info.row.original.telefono1}</span>
          <span>{info.row.original.telefono2}</span>
        </div>
      )
    },
    {
      header: 'SEXO',
      accessorKey: 'sexo',
      classname: 'text-center',
      cell: (info) => <div className='text-center'>{info.getValue()}</div>,
      meta: {
        filterVariant: 'select',
        options: [
          { key: 'Masculino', value: 'male' },
          { key: 'Femenino', value: 'female' }
        ]
      }
    },
    {
      header: 'ESTADO CIVIL',
      classname: 'text-center',
      enableSorting: false,
      accessorKey: 'estado_civil',
      meta: {
        filterVariant: 'select',
        options: [
          { key: 'Casado', value: 'casado' },
          { key: 'Divorciado', value: 'divorciado' },
          { key: 'Soltero', value: 'soltero' },
          { key: 'Viudo', value: 'viudo' }
        ]
      },
      cell: (info) => <div className='text-center'>{info.getValue()}</div>
    },
    {
      header: 'PESO',
      accessorKey: 'peso',
      classname: 'text-center',
      meta: {
        filterVariant: 'range'
      },
      cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    },
    {
      header: 'ALTURA',
      accessorKey: 'altura',
      classname: 'text-center',
      meta: {
        filterVariant: 'range'
      },
      cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    },
    {
      header: 'SANGRE',
      accessorKey: 'sangre',
      classname: 'text-center',
      meta: {
        filterVariant: 'select',
        options: [
          { key: 'A+', value: 'A+' },
          { key: 'A-', value: 'A-' },
          { key: 'AB+', value: 'AB-' },
          { key: 'B+', value: 'B-' },
          { key: 'O+', value: 'O-' }
        ]
      },
      cell: (info) => <div className='text-center'>{info.getValue() ? info.getValue() : 'N/A'}</div>
    },
    {
      header: 'FAMILIARES',
      enableSorting: false,
      accessorKey: 'numero_familiares',
      cell: (info) => (
        <div className='text-center'>
          {
                info.getValue() > 0
                  ? <Badge
                      variant='hoverOutline'
                      onClick={() => setcargaFamDialogStatus({ status: true, employed: { ...info.row.original } })}
                    >
                    {info.getValue()}
                    {/* eslint-disable-next-line react/jsx-closing-tag-location  */}
                  </Badge>
                  : <Badge
                      variant='hoverOutline'
                      onClick={() => setcargaFamDialogStatus({ status: true, employed: { ...info.row.original } })}
                    >N/A
                    {/* eslint-disable-next-line react/jsx-closing-tag-location  */}
                  </Badge>
              }

        </div>
      )
    },
    {
      header: 'PARROQUIA',
      enableSorting: false,
      accessorKey: 'parroquia',
      cell: (info) => (
        <div className='text-center'>
          <Badge variant='outline' className='uppercase text-[10px]'>{info.getValue().nombre}</Badge>
        </div>
      )
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
}
