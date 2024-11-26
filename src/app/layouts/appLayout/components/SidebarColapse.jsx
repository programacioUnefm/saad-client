import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as Icons from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export const SidebarColapse = ({ menu }) => {
  const location = useLocation()

  const openMenus = useMemo(() => {
    const currentPath = location.pathname

    const findOpenMenus = (items, parent = '') => {
      const result = {}
      items.forEach((item) => {
        if (item.subMenu) {
          const subResult = findOpenMenus(item.subMenu, item.title)
          if (
            Object.keys(subResult).length ||
            item.subMenu.some((sub) => sub.path === currentPath)
          ) {
            result[item.title] = true
            Object.assign(result, subResult)
          }
        } else if (item.path === currentPath) {
          result[parent] = true
        }
      })
      return result
    }
    return findOpenMenus(menu)
  }, [location.pathname, menu])
  const buttonClass = 'w-[45px] h-[40px] flex justify-center items-center p-0 text-foreground/60 border border-slate-300 dark:border-slate-500/50 hover:bg-primary hover:text-accent-foreground hover:text-white uppercase rounded-md transition-all'
  const btnActiveClass = 'bg-primary/80 text-white/80 dar:bg-primary'
  return (

    // TODO: hacer que se deshabilite el boton si no tengo permisos
    <div className='flex flex-col pl-4 gap-4'>
      {menu.map((item, index) => {
        const IconComponent = item.icon && Icons[item.icon]
        return (
          <div className={item.action === 'hidden' ? 'hidden' : ''} key={index}>
            {item.subMenu !== undefined
              ? (
                <Popover
                  key={index}
                  onOpenChange={(e) => {
                    e = false
                  }}
                >
                  <PopoverTrigger>
                    <span
                      className={
                      Object.keys(openMenus)[0] === item.title
                        ? `${buttonClass} bg-accent`
                        : buttonClass
                    }
                    >
                      {IconComponent && <IconComponent size='20' />}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className='ml-4 max-w-[220px]' side='right'>
                    <div className='flex flex-col gap-2 items-start'>
                      {item.subMenu !== undefined &&
                        item.subMenu.map((subItem, subIndex) => (
                          <PopOver item={subItem} key={subIndex} />
                        ))}
                    </div>
                  </PopoverContent>
                </Popover>
                )
              : (
                <Link to={item.path}>
                  <div
                    className={`${buttonClass} ${
                    Object.keys(openMenus)[0] === '' &&
                    item.title === 'Inicio' &&
                    btnActiveClass
                  } ${
                    Object.keys(openMenus)[0] === item.title
                      ? `${buttonClass} bg-accent`
                      : buttonClass
                  }`}
                  >
                    {IconComponent && <IconComponent size='20' />}
                  </div>
                </Link>
                )}
          </div>
        )
      })}
    </div>
  )
}

const PopOver = ({ item }) => {
  const IconComponent = item.icon && Icons[item.icon]
  return (
    <>
      {item.subMenu !== undefined
        ? (
          <Popover>
            <PopoverTrigger>
              <span className='flex items-center'>
                {IconComponent && <IconComponent size='20' className='mr-2' />}
                <span className='uppercase transition-all text-[13px] text-ring hover:text-foreground'>
                  {item.title}
                </span>
              </span>
            </PopoverTrigger>
            <PopoverContent side='right'>
              {item.subMenu.map((submenu, subIndex) => (
                <PopOver item={submenu} key={subIndex} />
              ))}
            </PopoverContent>
          </Popover>
          )
        : (
          <Link to={item.path} className='flex items-center'>
            {IconComponent && <IconComponent size='15' />}
            <span className='uppercase transition-all text-[13px] text-ring hover:text-foreground'>
              {item.title}
            </span>
          </Link>
          )}
    </>
  )
}
