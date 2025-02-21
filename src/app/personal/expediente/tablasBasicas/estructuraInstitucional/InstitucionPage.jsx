/* eslint-disable indent */
import { AppLayout } from '@/app/layouts/appLayout/AppLayout'
import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaisesTab } from './tabs/PaisesTab'
import { EstadosTab } from './tabs/EstadosTab'
import { ParroquiasTab } from './tabs/ParroquiasTab'
import { DependenciasTab } from './tabs/DependenciasTab'
import { MunicipiosTab } from './tabs/MunicipiosTab'
import { AreasTab } from './tabs/AreasTab'
import { getContryState, getCountry, getMunicipality, getParishes } from '@/features/personal/expediente/tablasBasicas/paisesThunk'
import { useDispatch, useSelector } from 'react-redux'
import { SkeletonDatatable } from '@/components/Skeletons/SkeletonDatatable'

export const InstitucionPage = () => {
  const tabList = [
    {
      lable: 'Paises',
      key: 'paises',
      component: <PaisesTab />
    },
    {
      lable: 'Estados',
      key: 'estados',
      component: <EstadosTab />
    },
    {
      lable: 'Municipios',
      key: 'municipios',
      component: <MunicipiosTab />
    },
    {
      lable: 'Parroquias',
      key: 'parroquias',
      component: <ParroquiasTab />
    },
    {
      lable: 'dependencias',
      key: 'dependencias',
      component: <DependenciasTab />
    },
    {
      lable: 'Areas',
      key: 'areas',
      component: <AreasTab />
    }
  ]
  const institucionData = useSelector((state) => state.personal.expediente.tablasBasicas.dataPais)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCountry())
    dispatch(getContryState())
    dispatch(getMunicipality())
    dispatch(getParishes())
  }, [])
  return (
    <AppLayout title='Estructura institucional'>
      {
        institucionData.parroquias.responseCode === 200
          ? (
            <Tabs defaultValue='paises'>
              <TabsList className='tabs'>
                {
                  tabList.map((item) => (
                    <TabsTrigger value={item.key} key={item.lable}>{item.lable}</TabsTrigger>
                  ))
                }
              </TabsList>
              {
                tabList.map((item) => (
                  <TabsContent key={item.lable} value={item.key}>{item.component}</TabsContent>
                ))
              }
            </Tabs>
          )
          : <SkeletonDatatable />
      }
    </AppLayout>
  )
}
