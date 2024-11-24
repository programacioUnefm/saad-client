import React, { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { icons } from 'lucide-react'
import { permissionCheck } from '@/features/PermissionCheck'
import { useSelector } from 'react-redux'

export const RenderMenu = ({ menu }) => {
  const location = useLocation()
  const [manualOpenMenus, setManualOpenMenus] = useState({})

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

  const effectiveOpenMenus = { ...openMenus, ...manualOpenMenus }

  const handleAccordionChange = (title, isOpen) => {
    setManualOpenMenus((prevState) => ({
      ...prevState,
      [title]: isOpen
    }))
  }

  return (
    <>
      {menu.map((item, index) => (
        <AccordionSubMenu
          key={index}
          item={item}
          openMenus={effectiveOpenMenus}
          onAccordionChange={handleAccordionChange}
        />
      ))}
    </>
  )
}

const AccordionSubMenu = ({ item, openMenus, onAccordionChange }) => {
  const Icon = icons[item.icon] || null
  const isOpen = openMenus[item.title] || false
  const auth = useSelector((state) => state.auth)
  return (
    <div
      className={item.action === 'only-admin' && auth.permissions[0] !== '*' ? 'hidden' : 'ml-1'}
    >
      {item.subMenu
        ? (
          <Accordion
            type='single'
            collapsible
            value={isOpen ? item.title : ''}
            onValueChange={(value) =>
              onAccordionChange(item.title, value === item.title)}
            disabled={!permissionCheck(item.permission, auth.permissions)}
          >
            <AccordionItem className='ml-2 my-1' value={item.title}>
              <AccordionTrigger>
                <div className='flex text-sm'>
                  {Icon && <Icon size={18} className='mr-2' />}
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className='p-0'>
                {item.subMenu?.map((subItem, index) =>
                  subItem.subMenu
                    ? (
                      <AccordionSubMenu
                        key={index}
                        item={subItem}
                        openMenus={openMenus}
                        onAccordionChange={onAccordionChange}
                      />
                      )
                    : <LinkMenu item={subItem} key={index} />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          )
        : (
          <LinkMenu item={item} />
          )}
    </div>
  )
}

const LinkMenu = ({ item }) => {
  const location = useLocation()
  const linkClass = 'bg-accent/50 text-foreground'
  const hoverLinkClass = 'hover:bg-accent/50 transition-all text-ring text-sm'
  const Icon = icons[item.icon] || null
  const isActive = item.path === location.pathname
  return (
    <Link to={item.path}>
      <div className='flex flex-col justify-center ml-2'>
        {item.action !== 'hidden' && (
          <div
            className={`flex items-center ${hoverLinkClass} text-sm my-1 p-3 rounded-md ${
          isActive ? `active ${linkClass}` : ''
        }`}
          >
            {Icon && <Icon size={18} className='mr-2' />}
            {item.title}
          </div>
        )}
      </div>
    </Link>
  )
}
