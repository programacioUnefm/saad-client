import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../login/pages/LoginPage";
import { ComprasPage } from "../app/administrativo/compras/ComprasPage";
import { ContabilidadPage } from "../app/administrativo/contabilidad/ContabilidadPage";
import { HabilitaduriaPage } from "../app/administrativo/habilitaduria/HabilitaduriaPage";
import { PresupuestoPage } from "../app/administrativo/presupuesto/PresupuestoPage";
import { DashboardPage } from "../app/dasboard/DashboardPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";

import { RegistroControl } from "../app/administrativo/compras/components/RegistroControl";
import { Administrativo } from "../app/administrativo/Administrativo";
import { Movimientos } from "../app/administrativo/compras/components/Movimientos";
import { Cierres } from "../app/administrativo/compras/components/Cierres";
import { Reportes } from "../app/administrativo/compras/components/Reportes";
import { TablasBasicas } from "../app/administrativo/compras/components/TablasBasicas";
import { PlanCompras } from "../app/administrativo/compras/components/PlanCompras";

import { UsersListPage } from "../app/control/admin_users/UsersListPage";
import { layoutChanged, themeChange } from "../features/ui/UiSlice";
import { VerifyUser } from "../features/auth/LoginThunk";
import { login } from "../features/auth/AuthSlice";
import { LogsPage } from "@/app/control/log/LogsPage";
import { ActuacionPage } from "@/app/personal/expediente/regDatos/actuacion/ActuacionPage";
import { NoAuthPage } from "@/app/layouts/unAuth/NoAuthPage";
import { DatosPersonalesPage } from "@/app/personal/expediente/tablasBasicas/datosPersonales/DatosPersonalesPage";
import { MyAccountConfig } from "@/app/myaccount/MyAccountConfig";

export const RouterApp = () => {
  let theme = localStorage.getItem("vite-ui-theme");
  let token = localStorage.getItem("token_access");
  let defaultLayout = localStorage.getItem("layoutList");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (defaultLayout == null || defaultLayout == undefined) {
      localStorage.setItem("layoutList", "list");
      dispatch(layoutChanged("list"));
    } else {
      dispatch(layoutChanged(defaultLayout));
    }
    if (token != null && token != undefined) {
      dispatch(VerifyUser(token));
    } else {
      dispatch(login({ Authstatus: false, name: "", role: [], token: "" }));
    }
    dispatch(themeChange(theme));
  }, []);

  return (
    <>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/no-autorizado" element={<NoAuthPage />} />
        <Route path="/" element={<Navigate to="/inicio" />} />
        
        {/* RUTAS PRIVADAS */}
        <Route path="/mi-cuenta" element={<MyAccountConfig />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/inicio" element={<DashboardPage />} />
          <Route path="/administrativo" element={<Administrativo />} />
          <Route path="/administrativo/compras" element={<ComprasPage />} />
          <Route
            path="/administrativo/compras/registro-control"
            element={<RegistroControl />}
          />
          <Route
            path="/administrativo/compras/plan-compras"
            element={<PlanCompras />}
          />
          <Route
            path="/administrativo/compras/movimientos"
            element={<Movimientos />}
          />
          <Route path="/administrativo/compras/cierres" element={<Cierres />} />
          <Route
            path="/administrativo/compras/reportes"
            element={<Reportes />}
          />
          <Route
            path="/administrativo/compras/tablas-basicas"
            element={<TablasBasicas />}
          />
          <Route path="/contabilidad" element={<ContabilidadPage />} />
          <Route path="/habilitaduria" element={<HabilitaduriaPage />} />
          <Route path="/presupuesto" element={<PresupuestoPage />} />

          <Route
            path="/personal/expediente/registro-datos/actuacion"
            element={<ActuacionPage />}
          />
          <Route
            path="/personal/tablas-basicas/datos-personales"
            element={<DatosPersonalesPage />}
          />
          <Route path="/control/usuarios" element={<UsersListPage />} />
          <Route path="/control/bitacora" element={<LogsPage />} />
        </Route>
      </Routes>
    </>
  );
};
