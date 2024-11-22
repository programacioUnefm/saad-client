import React from 'react'
import { useSelector } from 'react-redux';
import { AppLayout } from '../appLayout/AppLayout';
import { SkeletonBasic } from '@/components/Skeletons/SkeletonBasic';

export const ChargeState = () => {
    const auth = useSelector((state) => state.auth.Authstatus);
  return (
    <>
      {auth ? (
        <AppLayout title={"Cargando datos..."}>
          <div className="">
            <div className="">
                <SkeletonBasic />
            </div>
          </div>
        </AppLayout>
      ) : (
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex flex-col items-center max-w-[500px] text-center">

          </div>
        </div>
      )}
    </>
  );
}
