import React from 'react'
import PropTypes from 'prop-types'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { ScrollArea } from '../ui/scroll-area'
import { Equal } from 'lucide-react' // Ícono para el área de arrastre

const SortableItem = ({ id, value, handleViewItems }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  const isAction = () => {
    if (id === 'acciones1' || id === 'acciones') {
      return false
    } else {
      return true
    }
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className='w-full flex items-center'>
        <div
          className={`flex items-center pr-2 ${isAction() ? 'cursor-grab' : 'cursor-not-allowed'}`}
          {...(isAction() ? listeners : {})} // Aplica los listeners solo si es arrastrable
        >
          <Equal size={16} />
        </div>
        <Item value={value} id={id} handleViewItems={handleViewItems} />
      </div>
    </div>
  )
}

export const ColumnVisibility = ({ filtersTable, handleViewItems, onReorderColumns }) => {
  const keys = filtersTable.columnOrder !== undefined ? filtersTable.columnOrder : Object.keys(filtersTable.columnVisibility)
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = keys.indexOf(active.id)
      const newIndex = keys.indexOf(over.id)
      const reorderedKeys = arrayMove(keys, oldIndex, newIndex)
      onReorderColumns(reorderedKeys)
    }
  }
  return (
    <ScrollArea className='h-[200px] pr-2'>
      {filtersTable.columnOrder !== undefined
        ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className='flex flex-col gap-2 py-4 px-2'>
              {keys.map((key) => (
                <div key={key}>
                  <SortableContext items={keys} strategy={verticalListSortingStrategy}>
                    <SortableItem
                      id={key}
                      value={filtersTable.columnVisibility[key]}
                      handleViewItems={handleViewItems}
                    />
                  </SortableContext>
                  <hr />
                </div>
              ))}
            </div>
          </DndContext>
          )
        : keys.map((key, index) => {
          return (
            <div key={index}>
              <Item value={filtersTable.columnVisibility[key]} id={key} handleViewItems={handleViewItems} />
              <hr />
            </div>
          )
        }
        )}
    </ScrollArea>
  )
}

const Item = ({ id, handleViewItems, value }) => {
  return (
    <div className='flex justify-between w-full items-center uppercase py-2 pl-2'>
      <Label className='text-[11px] flex-1' htmlFor={id}>
        {id}
      </Label>
      <Switch
        id={id}
        className='ml-8'
        size='sm'
        checked={value}
        onCheckedChange={() => handleViewItems(id)}
      />
    </div>
  )
}

ColumnVisibility.propTypes = {
  filtersTable: PropTypes.shape({
    columnVisibility: PropTypes.objectOf(PropTypes.bool).isRequired,
    columnOrder: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handleViewItems: PropTypes.func.isRequired,
  onReorderColumns: PropTypes.func.isRequired
}
