import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonGrid = () => {
  const constant = 12;
  const iterations = Array.from({ length: constant }, (_, index) => index + 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-8">
      {iterations.map((iteration) => (
        <div key={Math.random()} className="mt-4 md:mt-0">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="mt-2">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%] mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
