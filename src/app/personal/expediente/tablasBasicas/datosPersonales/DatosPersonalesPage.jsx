import { AppLayout } from '@/app/layouts/appLayout/AppLayout'
import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AddPersonalForm } from './components/AddPersonalForm'
import { getContryState, getCountry, getMunicipality, getParishes } from '@/features/personal/expediente/tablasBasicas/paisesThunk'
import { getDiscapacidades, getEmploye } from '@/features/personal/expediente/tablasBasicas/datosPersonales/datosPersonalesThunk'
import { DataTable } from '@/components/DataTable/DataTable'
import { CargaFamDialog } from './components/cargaFamiliar/CargaFamDialog'
import { DatosPerColumn } from './components/DatosPerColumn'
import { tablesFiltersState } from '@/features/ui/UiSlice'

export const DatosPersonalesPage = () => {
  const personal = useSelector((state) => state.personal.expediente.tablasBasicas.personal)
  const [cargaFamDialogStatus, setcargaFamDialogStatus] = useState({ status: false, employed: {} })

  const dataInitialState = {
    documento: 'V',
    cedula: '',
    rif: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    fecha_nacimiento: '',
    direccion: '',
    email1: '',
    email2: null,
    telefono1: '',
    telefono2: '',
    sexo: '',
    estado_civil: 'S',
    peso: null,
    altura: null,
    sangre: '',
    foto: '',
    idiomas: 'Español',
    nivel_profesional_id: '01',
    pais_nacimiento_id: '',
    pais: {
      id: 1,
      nombre: 'Venezuela'
    },
    estado: {
      id: 10,
      nombre: 'Falcón',
      pais_id: 1,
      region: 'Centroccidental'
    },
    municipio: {
      id: 117,
      nombre: 'Miranda',
      estado_id: 10
    },
    parroquia: {}
  }

  const [data, setdata] = useState({ dataInitialState })

  const [actionButton, setactionButton] = useState({
    status: false,
    textButton: 'Agregar personal',
    title: 'Personal'
  })

  const columns = DatosPerColumn(setcargaFamDialogStatus, setactionButton, setdata, actionButton)

  const [filtersTable, setFiltersTable] = useState({
    columnVisibility: {
      acciones1: true,
      id: true,
      cedula: true,
      documento: true,
      rif: true,
      nombre: true,
      'nivel profesional': true,
      'fecha nacimiento': true,
      direccion: true,
      email: true,
      telefonos: true,
      sexo: true,
      estado_civil: true,
      peso: true,
      altura: true,
      sangre: true,
      foto: true,
      edad: true,
      familiares: true,
      parroquia: true,
      idiomas: true,
      acciones: true
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

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmploye())
    dispatch(getCountry())
    dispatch(getContryState())
    dispatch(getMunicipality())
    dispatch(getParishes())
    dispatch(getDiscapacidades())
    const storage = localStorage.getItem('tablesFilters')
    const visibility = JSON.parse(storage)
    if (visibility && typeof visibility.datosPer !== 'undefined' && visibility.datosPer !== null) {
      setFiltersTable({ ...filtersTable, columnVisibility: JSON.parse(storage).datosPer })
    }
  }, [])

  useEffect(() => {
    dispatch(tablesFiltersState({ datosPer: filtersTable.columnVisibility }))
  }, [filtersTable.columnVisibility])

  return (
    <AppLayout
      title={actionButton.title}
      titleButton={actionButton.textButton}
      functionButton={() => {
        setdata({ ...dataInitialState })
        setactionButton({
          status: !actionButton.status,
          textButton: actionButton.status ? 'Agregar personal' : 'Volver atras',
          title: actionButton.status ? 'Personal' : 'Agregar personal'
        })
      }}
    >
      {
        actionButton.status
          ? (
            <div id='addPersonal' className='p-2'>
              <AddPersonalForm
                data={data}
                setactionButton={setactionButton}
              />
            </div>
            )
          : (
            <DataTable
              columns={columns}
              data={personal.data !== undefined ? personal.data : ['load']}
              filtersTable={filtersTable}
              setFiltersTable={setFiltersTable}
            />
            )
          }
      {
        cargaFamDialogStatus.status && (
          <CargaFamDialog
            cargaFamDialogStatus={cargaFamDialogStatus}
            setcargaFamDialogStatus={setcargaFamDialogStatus}
          />
        )
      }
    </AppLayout>
  )
}
