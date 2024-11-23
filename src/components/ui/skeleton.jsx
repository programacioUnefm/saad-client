import { cn } from '@/lib/utils'

function Skeleton ({
  className,
  ...props
}) {
  return (<div className={cn('animate-pulse rounded-md bg-slate-300 dark:bg-muted', className)} {...props} />)
}

export { Skeleton }
