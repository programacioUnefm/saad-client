import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "/saad-logo.svg";
import logoReversed from "/saad-reversed.svg";

import { useSelector } from "react-redux";
import { MenuSidebar } from "./MenuSidebar";
import {
  Home,
  ShoppingCart,
  Users,
  ClipboardList,
  Table,
  BarChart3,
  PieChart,
  GraduationCap,
  Building,
  Glasses,
} from "lucide-react";
import { useMemo, useState } from "react";

const menuJson = [
  {
    title: "Inicio",
    icon: <Home className="h-4 w-4" />,
    path: "/inicio/",
    children: false,
  },
  {
    title: "Administrativo",
    icon: <PieChart className="h-4 w-4" />,
    path: "/administrativo/",
    children: true,
    subMenu: [
      {
        title: "Compras",
        icon: <ShoppingCart className="h-4 w-4" />,
        path: "/administrativo/compras/registro-control",
        children: true,
        collapse: false,
        height: "200px",
        subMenu: [
          { title: "Reportes", path: "/administrativo/compras/reportes" },
          {
            title: "Registro y control",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Plan de compras",
            path: "/administrativo/compras/plan-compras",
          },
          { title: "Cierres", path: "/administrativo/compras/cierres" },
          { title: "Movimientos", path: "/administrativo/compras/movimientos" },
          {
            title: "Tablas básicas",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
      {
        title: "Contabilidad",
        icon: <ClipboardList className="h-4 w-4" />,
        path: "/administrativo/compras/movimientos",
        children: true,
        collapse: false,
        height: "240px",
        subMenu: [
          { title: "Formulación", path: "/administrativo/compras/reportes" },
          {
            title: "Ejecución",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Cambios",
            path: "/administrativo/compras/plan-compras",
          },
          { title: "Cierres", path: "/administrativo/compras/cierres" },
          {
            title: "Reportes",
            path: "/administrativo/compras/tablas-basicas",
          },
          {
            title: "Gráficos",
            path: "/administrativo/compras/tablas-basicas",
          },
          {
            title: "Tablas básicas",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
      {
        title: "Habilitaduría",
        icon: <Users className="h-4 w-4" />,
        path: "/administrativo/compras/plan-compras",
        children: true,
        collapse: false,
        height: "200px",
        subMenu: [
          { title: "Reportes", path: "/administrativo/compras/reportes" },
          {
            title: "Libros",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Seg de movimientos",
            path: "/administrativo/compras/plan-compras",
          },
          {
            title: "Movimientos diarios",
            path: "/administrativo/compras/cierres",
          },
          { title: "Movimientos", path: "/administrativo/compras/movimientos" },
          {
            title: "Proveedores",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
      {
        title: "Presupuesto",
        icon: <BarChart3 className="h-4 w-4" />,
        path: "/administrativo/compras/plan-compras",
        children: true,
        collapse: false,
        height: "195px",
        subMenu: [
          { title: "Reportes", path: "/administrativo/compras/reportes" },
          {
            title: "Tablas básicas",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Cambios",
            path: "/administrativo/compras/plan-compras",
          },
          { title: "Cierres", path: "/administrativo/compras/cierres" },
          {
            title: "Ejecución",
            path: "/administrativo/compras/tablas-basicas",
          },
          {
            title: "Gráficos",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
    ],
  },
  {
    title: "Académico",
    icon: <GraduationCap className="h-4 w-4" />,
    path: "/academico/",
    children: true,
    subMenu: [
      {
        title: "Departamentos",
        icon: <Building className="h-4 w-4" />,
        path: "/administrativo/compras/plan-compras",
        children: false,
        collapse: false,
        height: "0px",
        subMenu: [
          {
            title: "Registrar datos",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Reportes",
            path: "/administrativo/compras/registro-control",
          },
        ],
      },
      {
        title: "Secretaría",
        icon: <Glasses className="h-4 w-4" />,
        path: "/administrativo/compras/plan-compras",
        children: true,
        collapse: false,
        height: "50px",
        subMenu: [
          {
            title: "Registrar datos",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Reportes",
            path: "/administrativo/compras/registro-control",
          },
        ],
      },
    ],
  },
  {
    title: "Personal",
    icon: <GraduationCap className="h-4 w-4" />,
    path: "/academico/",
    children: true,
    subMenu: [
      {
        title: "Expediente",
        icon: <Building className="h-4 w-4" />,
        path: "/administrativo/compras/plan-compras",
        children: false,
        collapse: false,
        height: "0px",
        subMenu: [
          {
            title: "Registrar datos",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Reportes",
            path: "/administrativo/compras/registro-control",
          },
        ],
      },
      {
        title: "Nómina",
        icon: <Table className="h-4 w-4" />,
        path: "/administrativo/compras/plan-compras",
        children: true,
        collapse: false,
        height: "270px",
        subMenu: [
          {
            title: "Transacciones",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Calculos",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Tablas básicas",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Reportes",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Cesta tickets",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Viáticos",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Int presentaciones",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "I.S.L.R",
            path: "/administrativo/compras/registro-control",
          },
        ],
      },
    ],
  },
];

export const Sidebar = () => {
  const { theme } = useSelector((state) => state.ui);
  const [menuState, setMenuState] = useState(menuJson);
  return (
    <div className="hidden border-r dark:bg-background bg-white md:block h-full">
      <div className="flex h-[100vh] max-h-screen flex-col gap-2">
        <div className="flex px-4 mt-4 border-b  mb-5">
          <Link to="/inicio/" className="mb-2">
            <img src={theme == "dark" ? logoReversed : logo} alt="logo saad" />
          </Link>
        </div>
        <div className="flex-1">
          <MenuSidebar
            menuState={menuState}
            setMenuState={setMenuState}
            init={menuJson}
          />
        </div>
        <div className="mt-auto p-4">
          <Card className="bg-gray-100 dark:bg-accent/30">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="mb-2">Hola de nuevo</CardTitle>
              <CardDescription>
                Retornemos lo que comenzaste "User name"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Retornar trabajo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
