import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/80 uppercase',
        primary: 'bg-primary hover:bg-primary/50 uppercase',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        warn: 'bg-danger-default text-danger-foreground hover:bg-danger/90 uppercase',
        outline: 'border border-slate-300 dark:border-input bg-slate-100 dark:bg-background hover:bg-accent hover:text-accent-foreground px-4 uppercase',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 uppercase',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        md: 'h-9 rounded-md px-3',
        lg: 'h-[50px] rounded-md px-4',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

// eslint-disable-next-line react/prop-types
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
