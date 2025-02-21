/* eslint-disable import/no-absolute-path */
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import logo from '/saad-logo.svg'
import logoReversed from '/saad-reversed.svg'
import { useSelector } from 'react-redux'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RenderMenu } from './RenderMenu'
import { SidebarColapse } from './SidebarColapse'

export const Sidebar = ({ menu }) => {
  const { theme, siebarState } = useSelector((state) => state.ui)

  const mainLogo = useMemo(() => (
    <img
      src={theme === 'dark' ? logoReversed : logo}
      className={` ${siebarState ? '' : 'hidden'}`}
      alt='logo saad'
    />
  ), [theme, siebarState])

  const sidebarLogo = useMemo(() => (
    <img
      src='/sidebar.svg'
      className={` ${siebarState ? 'hidden' : ''}`}
      alt='logo saad'
      width={100}
    />
  ), [siebarState])

  return (
    <div className='hidden md:block bg-slate-200/60 dark:bg-background border-r h-full'>
      <div className='relative flex flex-col gap-2 h-[100vh] max-h-screen'>
        <div className={`flex px-2 mt-4 ${siebarState && 'border-b'} mb-5`}>
          <Link to='/inicio' className='mb-2'>
            {mainLogo}
            {sidebarLogo}
          </Link>
        </div>
        <ScrollArea className='pr-4 rounded-md h-full'>
          {siebarState ? <RenderMenu menu={menu} /> : <SidebarColapse menu={menu} />}
        </ScrollArea>
      </div>
    </div>
  )
}
