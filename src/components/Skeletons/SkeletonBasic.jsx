import React from "react";
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonBasic = () => {
  const constant = 10;
  const iterations = Array.from({ length: constant }, (_, index) => index + 1);
  return (
    <div>
      {/* {iterations.map((iteration) => ( */}
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
            <Skeleton className="w-full h-[150px]" />            
            <Skeleton className="w-full h-[150px]" />
            <Skeleton className="w-full h-[150px]" />
            <Skeleton className="w-full h-[150px]" />
          </div>
          <div className="grid grid-cols-3 mt-8 gap-6">
            <div className="col-span-2">
                <Skeleton className="w-full h-[55vh]" />            
            </div>
            <Skeleton className="w-full h-[55vh]" />            
          </div>
        
      {/* ))} */}
    </div>
  );
};
