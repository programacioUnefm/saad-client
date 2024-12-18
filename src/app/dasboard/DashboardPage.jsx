import {
  ArrowUpRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table'
import { AppLayout } from '../layouts/appLayout/AppLayout'
import { CardsDashboard } from './components/CardsDashboard'

export const DashboardPage = () => {
  return (
    <>
      <AppLayout title='Panel de control'>
        <div className='flex flex-1 flex-col gap-8'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4'>
            <CardsDashboard />
          </div>
          <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
            <Card className='xl:col-span-2 bg-white dark:bg-accent/30' x-chunk='dashboard-01-chunk-4'>
              <CardHeader className='flex flex-row items-center'>
                <div className='grid gap-2'>
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    Recent transactions from your store.
                  </CardDescription>
                </div>
                <Button asChild size='sm' className='ml-auto gap-1'>
                  <Link href='#'>
                    View All
                    <ArrowUpRight className='h-4 w-4' />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Type
                      </TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Status
                      </TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Date
                      </TableHead>
                      <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          liam@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-23
                      </TableCell>
                      <TableCell className='text-right'>$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Olivia Smith</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          olivia@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Refund
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Declined
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-24
                      </TableCell>
                      <TableCell className='text-right'>$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Emma Brown</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          emma@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-26
                      </TableCell>
                      <TableCell className='text-right'>$450.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className='bg-white dark:bg-accent/30' x-chunk='dashboard-01-chunk-5'>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-8'>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/01.png' alt='Avatar' />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Olivia Martin
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$1,999.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/02.png' alt='Avatar' />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Jackson Lee
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      jackson.lee@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$39.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/03.png' alt='Avatar' />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Isabella Nguyen
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      isabella.nguyen@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$299.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/04.png' alt='Avatar' />
                    <AvatarFallback>WK</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      William Kim
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      will@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$99.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/05.png' alt='Avatar' />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Sofia Davis
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      sofia.davis@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$39.00</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
