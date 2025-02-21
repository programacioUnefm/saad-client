import { Skeleton } from "@/components/ui/skeleton"

export const Skeleton = () => {
  const constant = 10
  const iterations = Array.from({ length: constant }, (_, index) => index + 1)

  return (
    <>
      {/* {iterations.map((iteration) => (
        <div className="flex flex-col mt-4" key={Math.random()}>
          <div className="flex items-center space-x-4" >
            <Skeleton className="rounded-full w-14 h-14" />
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-[95%] h-4" />
              <Skeleton className="w-[90%] h-4" />
            </div>
          </div>
        </div>
      ))} */}

    </>
  )
}
