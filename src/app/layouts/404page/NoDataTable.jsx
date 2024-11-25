import { AppWindow } from 'lucide-react'
import React from 'react'

export const NoDataTable = () => {
  return (
    <div className='min-h-[350px] flex flex-col justify-center items-center text-center text-ring'>
      <AppWindow className='text-slate-400' size={100} />
      <h1 className='uppercase text-2xl mt-4'>Al parecer no hay datos</h1>
      <p className='mt-2 text-sm'>Esta tabla aún no posée datos agrega nuevos elementos y vuelve a intentarlo</p>
    </div>
  )
}
