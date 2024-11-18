import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const auth = useSelector((state) => state.auth);
  // console.log(auth)
  // Si el usuario está autenticado, redirige al Dashboard o página de inicio
  if (auth.Authstatus) {
    return <Navigate to="/not-found" replace />;
  }

  // Si no está autenticado, renderiza las rutas públicas
  return <Outlet />;
};
