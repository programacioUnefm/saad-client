import React from "react";
import { AppLayout } from "../appLayout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const NotFoundPage = () => {
  const auth = useSelector((state) => state.auth.Authstatus);

  console.log();

  return (
    <>
      {auth ? (
        <AppLayout title={"página no encontrada"}>
          <div className="flex flex-col justify-center items-center h-[75vh] text-center text-ring">
            <div className="w-[500px]">
              <h1 className="font-bold text-9xl dark:text-accent text-slate-400">404</h1>
              <h2 className="uppercase font-bold text-2xl mt-8">
                Página no encontrada
              </h2>
              <p className="mt-4">
                Parece que lo que estás buscando no existe en este momento
                dentro de las rutas, vuelve al inicio y intentalo otra vez.
              </p>
              <div className="text-center mt-4">
                <Link to={auth ? "/inicio" : "/login"}>
                  <Button>Volver atras</Button>
                </Link>
              </div>
            </div>
          </div>
        </AppLayout>
      ) : (
        <div className="flex flex-col justify-center items-center h-[100vh] text-center text-ring">
          <div className="w-[500px]">
            <h1 className="font-bold text-9xl text-accent">404</h1>
            <h2 className="uppercase font-bold text-2xl mt-8">
              Página no encontrada
            </h2>
            <p className="mt-4">
              Parece que lo que estás buscando no existe en este momento dentro
              de las rutas, vuelve al inicio y intentalo otra vez.
            </p>
            <div className="text-center mt-4">
              <Link to={auth ? "/inicio" : "/login"}>
                <Button>Volver atras</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
