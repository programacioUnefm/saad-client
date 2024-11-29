import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FileText, Sheet, Wrench } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { ColumnVisibility } from './ColumnVisibility'

export const ConfigTable = ({ filtersTable, setFiltersTable }) => {
  // funcion para visualizar items en la tabla escoge cuales se quieren ver y cuales no con un switch
  const handleViewItems = (key) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      columnVisibility: {
        ...prevState.columnVisibility,
        [key]: !prevState.columnVisibility[key]
      }
    }))
  }
  // funcion para cambiar la cantidad de items por tabla
  const changeViewTo = (itemsPerview) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      view: itemsPerview,
      pagination: {
        pageIndex: 0,
        pageSize: itemsPerview
      }
    }))
  }

  const handleReorderColumns = (newColumnVisibility) => {
    setFiltersTable((prev) => ({
      ...prev,
      columnOrder: newColumnVisibility
    }))
  }

  return (
    <div className='flex justify-end items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <Wrench />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>CONFIGURACIONES</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Elegir qué mostrar
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <ColumnVisibility handleViewItems={handleViewItems} filtersTable={filtersTable} onReorderColumns={handleReorderColumns} />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Cantidad de items
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => changeViewTo(10)}>
                    10
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeViewTo(20)}>
                    20
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeViewTo(50)}>
                    50
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeViewTo(100)}>
                    100
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeViewTo(200)}>
                    200
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeViewTo(500)}>
                    500
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Personalizar</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Exportar Excel
            <DropdownMenuShortcut>
              <Sheet size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Exportar PDF
            <DropdownMenuShortcut>
              <FileText size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
