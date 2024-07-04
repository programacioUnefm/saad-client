import { icons } from "lucide-react";

export const navbarMenu = [
  {
    title: "Inicio",
    path: "/inicio/",
    icon: "Home",
  },
  {
    title: "Administrativo",
    path: "/administrativo/",
    icon: "List",
    subMenu: [
      {
        title: "Compras",
        path: "/administrativo/compras/registro-control",
        icon: "ShoppingBasket",
        subMenu: [
          {
            title: "Reportes",
            icon: "ChevronRight",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Registro y control",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Plan de compras",
            icon: "ChevronRight",
            path: "/administrativo/compras/plan-compras",
          },
          {
            title: "Cierres",
            icon: "ChevronRight",
            path: "/administrativo/compras/cierres",
          },
          {
            title: "Movimientos",
            icon: "ChevronRight",
            path: "/administrativo/compras/movimientos",
          },
          {
            title: "Tablas básicas",
            icon: "ChevronRight",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
      {
        title: "Contabilidad",
        path: "/administrativo/compras/movimientos",
        icon: "ListOrdered",
        subMenu: [
          {
            title: "Formulación",
            icon: "ChevronRight",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Ejecución",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Cambios",
            icon: "ChevronRight",
            path: "/administrativo/compras/plan-compras",
          },
          {
            title: "Cierres",
            icon: "ChevronRight",
            path: "/administrativo/compras/cierres",
          },
          {
            title: "Reportes",
            icon: "ChevronRight",
            path: "/administrativo/compras/tablas-basicas",
          },
          {
            title: "Gráficos",
            icon: "ChevronRight",
            path: "/administrativo/compras/tablas-basicas",
          },
          {
            title: "Tablas básicas",
            icon: "ChevronRight",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
      {
        title: "Habilitaduría",
        path: "/administrativo/compras/plan-compras",
        icon: "LibraryBig",
        subMenu: [
          {
            title: "Reportes",
            icon: "ChevronRight",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Libros",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Seg de movimientos",
            icon: "ChevronRight",
            path: "/administrativo/compras/plan-compras",
          },
          {
            title: "Movimientos diarios",
            icon: "ChevronRight",
            path: "/administrativo/compras/cierres",
          },
          { title: "Movimientos", icon: "ChevronRight", path: "/administrativo/compras/movimientos" },
          {
            title: "Proveedores",
            icon: "ChevronRight",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
      {
        title: "Presupuesto",
        path: "/administrativo/compras/plan-compras",
        icon: "Coins",
        subMenu: [
          { title: "Reportes", icon: "ChevronRight", path: "/administrativo/compras/reportes" },
          {
            title: "Tablas básicas",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Cambios",
            icon: "ChevronRight",
            path: "/administrativo/compras/plan-compras",
          },
          { title: "Cierres", icon: "ChevronRight", path: "/administrativo/compras/cierres" },
          {
            title: "Ejecución",
            icon: "ChevronRight",
            path: "/administrativo/compras/tablas-basicas",
          },
          {
            title: "Gráficos",
            icon: "ChevronRight",
            path: "/administrativo/compras/tablas-basicas",
          },
        ],
      },
    ],
  },
  {
    title: "Académico",
    path: "/academico/",
    icon: "GraduationCap",
    subMenu: [
      {
        title: "Departamentos",
        path: "/administrativo/compras/plan-compras",
        icon: "Building",
        subMenu: [
          {
            title: "Registrar datos",
            icon: "ChevronRight",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Reportes",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
        ],
      },
      {
        title: "Secretaría",
        path: "/administrativo/compras/plan-compras",
        icon: "Glasses",
        subMenu: [
          {
            title: "Registrar datos",
            icon: "ChevronRight",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Reportes",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
        ],
      },
    ],
  },
  {
    title: "Personal",
    path: "/academico/",
    icon: "Users",
    subMenu: [
      {
        title: "Expediente",
        path: "/personal/expediente/",
        icon: "Library",
        subMenu: [
          {
            title: "Reg de datos",
            path: "/personal/expediente/registro-datos",
            subMenu:[
              {
                title: "Actuación",
                path: "/personal/expediente/actuacion",
                icon: "ChevronRight",
              },
              {
                title: "Adscripción",
                path: "/personal/expediente/adscripción",
                icon: "ChevronRight",
              },
              {
                title: "Adiestramiento",
                path: "/personal/expediente/adiestramiento",
                icon: "ChevronRight",
              },
              {
                title: "Ascensos",
                path: "/personal/expediente/ascensos",
                icon: "ChevronRight",
              },
              {
                title: "Carga familiar",
                path: "/personal/expediente/carga-familiar",
                icon: "ChevronRight",
              },
              {
                title: "Directivos",
                path: "/personal/expediente/cargos-directivos",
                icon: "ChevronRight",
              },
              {
                title: "Estudios",
                path: "/personal/expediente/estudios",
                icon: "ChevronRight",
              },
              {
                title: "Idiomas",
                path: "/personal/expediente/idiomas",
                icon: "ChevronRight",
              },
              {
                title: "Movimientos",
                path: "/personal/expediente/movimientos",
                icon: "ChevronRight",
              },
              {
                title: "Permisos",
                path: "/personal/expediente/permisos",
                icon: "ChevronRight",
              },
              {
                title: "Tabajos anteriores",
                path: "/personal/expediente/trabajos-anteriores",
                icon: "ChevronRight",
              },
            ]
          },
          {
            title: "Tablas básicas",
            path: "/personal/expediente/tablas-basicas",
            subMenu: [
              {
                title: "Datos per",
                path: "/personal/expediente/trabajos-anteriores",
                icon: "ChevronRight",
              },
              {
                title: "Dedicación",
                path: "/personal/expediente/trabajos-anteriores",
                icon: "ChevronRight",
              },
              {
                title: "Dependencias",
                path: "/personal/expediente/trabajos-anteriores",
                icon: "ChevronRight",
              },
              {
                title: "Jornadas",
                path: "/personal/expediente/trabajos-anteriores",
                icon: "ChevronRight",
              },
              {
                title: "Manual cargos",
                path: "/personal/expediente/trabajos-anteriores",
                subMenu:[
                  {
                    title: "Manual",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Escala",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Nivel",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                ]
              },
              {
                title: "Motivo de retiro",
                path: "/personal/expediente/trabajos-anteriores",
                icon: "ChevronRight",
              },
              {
                title: "Profesiones",
                path: "/personal/expediente/trabajos-anteriores",
                icon: "ChevronRight",
              },
              {
                title: "Tipos de...",
                path: "/personal/expediente/trabajos-anteriores",
                subMenu:[
                  {
                    title: "Actuación",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },  
                  {
                    title: "Adiestra...",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Beca",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Condicion",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Contrato",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Educación",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Empresa",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Estado",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Idioma",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Movimiento",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Nacional...",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Permiso",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Personal",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                  {
                    title: "Visa",
                    path: "/personal/expediente/trabajos-anteriores",
                    icon: "ChevronRight",
                  },
                ]
              },
            ]
          },
          {
            title: "Reportes",
            path: "/personal/expediente/reportes",
            subMenu:[
              {
                title: "General",
                path: "/personal/expediente/reporte-general",
                icon: "ChevronRight",
              },
              {
                title: "Individual",
                path: "/personal/expediente/reporte-indiviual",
                icon: "ChevronRight",
              },
            ]
          }
        ],
      },
      {
        title: "Nómina",
        path: "/administrativo/compras/plan-compras",
        icon: "Percent",
        subMenu: [
          {
            title: "Transacciones",
            icon: "ChevronRight",
            path: "/administrativo/compras/reportes",
          },
          {
            title: "Calculos",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Tablas básicas",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Reportes",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Cesta tickets",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Viáticos",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "Int presentaciones",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
          {
            title: "I.S.L.R",
            icon: "ChevronRight",
            path: "/administrativo/compras/registro-control",
          },
        ],
      },
    ],
  },
];
