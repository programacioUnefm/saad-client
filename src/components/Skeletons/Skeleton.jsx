import { Skeleton } from "@/components/ui/skeleton";

export const Skeleton = () => {
  const constant = 10;
  const iterations = Array.from({ length: constant }, (_, index) => index + 1);

  return (
    <>
      {/* {iterations.map((iteration) => (
        <div className="flex flex-col mt-4" key={Math.random()}>
          <div className="flex items-center space-x-4" >
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="w-full flex flex-col gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        </div>
      ))} */}
      
    </>
  );
};
