import React from 'react'
import { AppLayout } from '../appLayout/AppLayout'
import { MonitorX, OctagonX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, Navigate } from 'react-router-dom'


export const NoAuthPage = () => {
  return (
    <AppLayout title={"Área restringida"}>
      <div className="flex justify-center items-center h-[75vh]">
        <div className="flex flex-col items-center max-w-[500px] text-center">
          <OctagonX className='text-ring mb-4' size={100} />
          <h2 className='text-xl uppercase font-bold mb-2 text-ring'>¿Estás perdido?</h2>
          <p className='text-ring'>Parece que no tienes permisos para entrar en esta ruta intenta con otra ruta diferente.</p>
          <Link to={"/inicio"}>
            <Button className="mt-4">Volver al incio </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
