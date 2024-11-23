import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent
} from '@/components/ui/card'

export const SkeletonDatatable = () => {
  const constant = 9
  const iterations = Array.from({ length: constant }, (_, index) => index + 1)
  return (
    <div>
      <div className='grid grid-cols-2'>
        <Skeleton className='w-full h-[40px] ' />
        <div className='flex justify-end'>
          <Skeleton className='w-[60px] h-[40px] ' />
        </div>
      </div>
      <Card className='mt-8 dark:bg-accent/30'>
        <CardContent className='pt-2 pb-2'>
          {iterations.map((Item, index) => (
            <div className='flex items-center space-x-4 my-4' key={index}>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2 w-full'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-[95%]' />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
