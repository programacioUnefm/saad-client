import React from 'react'
import { useSelector } from 'react-redux'
import { AppLayout } from '../appLayout/AppLayout'
import { SkeletonBasic } from '@/components/Skeletons/SkeletonBasic'
import { Button } from '@/components/ui/button'
import { Anchor } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ChargeState = () => {
  const auth = useSelector((state) => state.auth.Authstatus)
  return (
    <>
      {auth
        ? (
          <AppLayout title='Cargando datos...'>
            <div className=''>
              <div className=''>
                <SkeletonBasic />
              </div>
            </div>
          </AppLayout>
          )
        : (
          <div className='flex justify-center items-center h-[100vh]'>
            <div className='flex flex-col items-center max-w-[600px] text-center'>
              <Anchor size={100} className='text-ring' />
              <h1 className='uppercase text-3xl font-bold text-ring mt-8'>Aún no has iniciado sesión</h1>
              <p className='mt-4 text-ring/80'>Parece que aún no has iniciado sesión en la página de "LOGIN". Por favor, regresa a la página de inicio de sesión e inténtalo de nuevo. Si tienes los permisos necesarios, esta ruta estará disponible para ti.</p>
              <Link to='/login'>
                <Button className='mt-4'>Volver al login</Button>
              </Link>
            </div>
          </div>
          )}
    </>
  )
}
