import React from 'react'
import { AppLayout } from '../appLayout/AppLayout'
import { OctagonX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const NoAuthPage = () => {
  const auth = useSelector((state) => state.auth.Authstatus)
  return (
    <>
      {auth
        ? (
          <AppLayout title='Área restringida'>
            <div className='flex justify-center items-center h-[75vh]'>
              <div className='flex flex-col items-center max-w-[500px] text-center'>
                <OctagonX className='mb-4 text-ring' size={100} />
                <h2 className='mb-2 font-bold text-ring text-xl uppercase'>
                  ¿Estás perdido?
                </h2>
                <p className='text-ring'>
                  Parece que no tienes permisos para entrar en esta ruta intenta
                  con otra ruta diferente.
                </p>
                <Link to='/inicio'>
                  <Button className='mt-4'>Volver al incio </Button>
                </Link>
              </div>
            </div>
          </AppLayout>
        )
        : (
          <div className='flex justify-center items-center h-[100vh]'>
            <div className='flex flex-col items-center max-w-[500px] text-center'>
              <OctagonX className='mb-4 text-ring' size={100} />
              <h2 className='mb-2 font-bold text-ring text-xl uppercase'>
                ¿Estás perdido?
              </h2>
              <p className='text-ring'>
                Parece que no tienes permisos para entrar en esta ruta intenta con
                otra ruta diferente.
              </p>
              <Link to='/login'>
                <Button className='mt-4'>Volver al incio </Button>
              </Link>
            </div>
          </div>
        )}
    </>
  )
}
