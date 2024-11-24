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
import { Label } from '../ui/label'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { FileText, Sheet, Wrench } from 'lucide-react'
import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '../ui/button'

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
                  <ScrollArea className='h-[200px] pr-2'>
                    <div className='flex flex-col gap-2 py-4 px-2'>
                      {Object.entries(filtersTable.columnVisibility).map(
                        ([key, value]) => (
                          <div key={key}>
                            <div className='w-full uppercase flex items-center place-content-between pb-2'>
                              <Label
                                className='text-[11px]'
                                htmlFor={key}
                              >
                                {key}
                              </Label>
                              <Switch
                                id={key}
                                className='ml-8'
                                size='sm'
                                checked={value}
                                onCheckedChange={() =>
                                  handleViewItems(key)}
                              />
                            </div>
                            <hr />
                          </div>
                        )
                      )}
                    </div>
                  </ScrollArea>
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
