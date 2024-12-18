export const navbarMenu = [
  {
    title: 'Inicio',
    path: '/inicio',
    icon: 'Home',
    permission: ['HOME'],
    action: 'disable'
  },
  {
    title: 'Página no encontrada',
    path: '/no-encontrada',
    icon: 'Home',
    permission: ['HOME'],
    action: 'hidden'
  },
  {
    title: 'Mi cuenta',
    path: '/mi-cuenta',
    icon: '',
    permission: ['NONE'],
    action: 'hidden'
  },
  // {
  //   title: "Administrativo",
  //   path: "/administrativo",
  //   icon: "List",
  //   permission: ["HOME", "HOME_ADMINISTRATIVO"],
  //   action: "disable",
  //   subMenu: [
  //     {
  //       title: "Compras",
  //       path: "/administrativo/compras/registro-control",
  //       permission: ["HOME", "ADMINISTRATIVO_COMPRAS"],
  //       action: "disable",
  //       icon: "ShoppingBasket",
  //       subMenu: [
  //         {
  //           title: "Reportes",
  //           icon: "ChevronRight",
  //           permission: ["HOME", "ADMINISTRATIVO_COMPRAS", "COMPRAS_REPORTES"],
  //           action: "disable",
  //           path: "/administrativo/compras/reportes",
  //         },
  //         {
  //           title: "Registro y control",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_COMPRAS",
  //             "COMPRAS_REG&CNTROL",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/registro-control",
  //         },
  //         {
  //           title: "Plan de compras",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_COMPRAS",
  //             "COMPRAS_PLAN_COMPRAS",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/plan-compras",
  //         },
  //         {
  //           title: "Cierres",
  //           icon: "ChevronRight",
  //           permission: ["HOME", "ADMINISTRATIVO_COMPRAS", "COMPRAS_CIERRES"],
  //           action: "disable",
  //           path: "/administrativo/compras/cierres",
  //         },
  //         {
  //           title: "Movimientos",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_COMPRAS",
  //             "COMPRAS_MOVIMIENTOS",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/movimientos",
  //         },
  //         {
  //           title: "Tablas básicas",
  //           icon: "ChevronRight",
  //           permission: ["HOME", "ADMINISTRATIVO_COMPRAS", "COMPRAS_TABLASB"],
  //           action: "disable",
  //           path: "/administrativo/compras/tablas-basicas",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Contabilidad",
  //       path: "/administrativo/compras/movimientos",
  //       permission: ["HOME", "ADMINISTRATIVO_CONTABILIDAD"],
  //       action: "disable",
  //       icon: "ListOrdered",
  //       subMenu: [
  //         {
  //           title: "Formulación",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/reportes",
  //         },
  //         {
  //           title: "Ejecución",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/registro-control",
  //         },
  //         {
  //           title: "Cambios",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/plan-compras",
  //         },
  //         {
  //           title: "Cierres",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/cierres",
  //         },
  //         {
  //           title: "Reportes",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/tablas-basicas",
  //         },
  //         {
  //           title: "Gráficos",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/tablas-basicas",
  //         },
  //         {
  //           title: "Tablas básicas",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/tablas-basicas",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Habilitaduría",
  //       path: "/administrativo/compras/plan-compras",
  //       permission: ["HOME", "ADMINISTRATIVO_HABILITADURIA"],
  //       action: "disable",
  //       icon: "LibraryBig",
  //       subMenu: [
  //         {
  //           title: "Reportes",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/reportes",
  //         },
  //         {
  //           title: "Libros",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/registro-control",
  //         },
  //         {
  //           title: "Seg de movimientos",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/plan-compras",
  //         },
  //         {
  //           title: "Movimientos diarios",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/cierres",
  //         },
  //         {
  //           title: "Movimientos",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/movimientos",
  //         },
  //         {
  //           title: "Proveedores",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/tablas-basicas",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Presupuesto",
  //       path: "/administrativo/compras/plan-compras",
  //       permission: ["HOME", "ADMINISTRATIVO_PRESUPUESTO"],
  //       action: "disable",
  //       icon: "Coins",
  //       subMenu: [
  //         {
  //           title: "Reportes",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_PRESUPUESTO",
  //             "PRESUPUESTO_REPORTES",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/reportes",
  //         },
  //         {
  //           title: "Tablas básicas",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_PRESUPUESTO",
  //             "PRESUPUESTO_TABLASB",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/registro-control",
  //         },
  //         {
  //           title: "Cambios",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_PRESUPUESTO",
  //             "PRESUPUESTO_CAMBIOS",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/plan-compras",
  //         },
  //         {
  //           title: "Cierres",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_PRESUPUESTO",
  //             "PRESUPUESTO_CIERRES",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/cierres",
  //         },
  //         {
  //           title: "Ejecución",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_PRESUPUESTO",
  //             "PRESUPUESTO_EJECUCION",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/tablas-basicas",
  //         },
  //         {
  //           title: "Gráficos",
  //           icon: "ChevronRight",
  //           permission: [
  //             "HOME",
  //             "ADMINISTRATIVO_PRESUPUESTO",
  //             "PRESUPUESTO",
  //             "PRESUPUESTO_GRAFICOS",
  //           ],
  //           action: "disable",
  //           path: "/administrativo/compras/tablas-basicas",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Académico",
  //   path: "/academico",
  //   permission: ["HOME_ACADEMICO"],
  //   action: "disable",
  //   icon: "GraduationCap",
  //   subMenu: [
  //     {
  //       title: "Departamentos",
  //       path: "/administrativo/compras/plan-compras",
  //       icon: "Building",
  //       subMenu: [
  //         {
  //           title: "Registrar datos",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/reportes",
  //         },
  //         {
  //           title: "Reportes",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/registro-control",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Secretaría",
  //       path: "/administrativo/compras/plan-compras",
  //       icon: "Glasses",
  //       subMenu: [
  //         {
  //           title: "Registrar datos",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/reportes",
  //         },
  //         {
  //           title: "Reportes",
  //           icon: "ChevronRight",
  //           path: "/administrativo/compras/registro-control",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: 'Personal',
    path: '/academico',
    permission: ['HOME_PERSONAL'],
    action: 'disable',
    icon: 'Users',
    subMenu: [
      {
        title: 'Expediente',
        path: '/personal/expediente',
        permission: ['PERSONAL_EXPEDIENTE'],
        action: 'disable',
        icon: 'Library',
        subMenu: [
          // {
          //   title: "Registro datos",
          //   path: "/personal/expediente/registro-datos",
          //   desciption: "Registro de datos",
          //   permission: ["PERSONAL_EXPEDIENTE_REG_DATOS"],
          //   action: "disable",
          //   subMenu: [
          //     {
          //       title: "Actuación",
          //       path: "/personal/expediente/registro-datos/actuacion",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_ACTUACION"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Adscripción",
          //       path: "/personal/expediente/adscripción",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_ADSCRIP"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Adiestramiento",
          //       path: "/personal/expediente/adiestramiento",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_ADIESTRA"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Ascensos",
          //       path: "/personal/expediente/ascensos",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_ASCENSOS"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Carga familiar",
          //       path: "/personal/expediente/carga-familiar",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_CARGA_FAM"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Directivos",
          //       path: "/personal/expediente/cargos-directivos",
          //       desciption: "Cargos directivo",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_DIRECTIVOS"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Estudios",
          //       path: "/personal/expediente/estudios",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_ESTUDIOS"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Idiomas",
          //       path: "/personal/expediente/idiomas",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_IDIOMAS"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Movimientos",
          //       path: "/personal/expediente/movimientos",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_MOV"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Permisos",
          //       path: "/personal/expediente/permisos",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_PERMISOS"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Tabajos ant",
          //       desciption: "Trabajos anteriores",
          //       path: "/personal/expediente/trabajos-anteriores",
          //       permission: ["PERSONAL_EXPEDIENTE_REG_DATOS_TRABAJOS"],
          //       action: "disable",
          //       icon: "ChevronRight",
          //     },
          //   ],
          // },
          {
            title: 'Tablas básicas',
            permission: ['PERSONAL_EXPEDIENTE_TABLASB'],
            action: 'disable',
            path: '/personal/expediente/tablas-basicas',
            icon: 'Table',
            subMenu: [
              {
                title: 'Datos personales',
                path: '/personal/tablas-basicas/datos-personales',
                permission: ['EXPEDIENTE_TABLASB_DATOS_PERSONALES'],
                action: 'disable',
                icon: 'ChevronRight'
              }
              // {
              //   title: "Dedicación",
              //   path: "/personal/expediente/trabajos-anteriores",
              //   icon: "ChevronRight",
              // },
              // {
              //   title: "Dependencias",
              //   path: "/personal/expediente/trabajos-anteriores",
              //   icon: "ChevronRight",
              // },
              // {
              //   title: "Jornadas",
              //   path: "/personal/expediente/trabajos-anteriores",
              //   icon: "ChevronRight",
              // },
              // {
              //   title: "Manual cargos",
              //   path: "/personal/expediente/trabajos-anteriores",
              //   subMenu: [
              //     {
              //       title: "Manual",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Escala",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Nivel",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //   ],
              // },
              // {
              //   title: "Motivo de retiro",
              //   path: "/personal/expediente/trabajos-anteriores",
              //   icon: "ChevronRight",
              // },
              // {
              //   title: "Profesiones",
              //   path: "/personal/expediente/trabajos-anteriores",
              //   icon: "ChevronRight",
              // },
              // {
              //   title: "Tipos de...",
              //   path: "/personal/expediente/trabajos-anteriores",
              //   subMenu: [
              //     {
              //       title: "Actuación",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Adiestra...",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Beca",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Condicion",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Contrato",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Educación",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Empresa",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Estado",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Idioma",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Movimiento",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Nacional...",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Permiso",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Personal",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //     {
              //       title: "Visa",
              //       path: "/personal/expediente/trabajos-anteriores",
              //       icon: "ChevronRight",
              //     },
              //   ],
              // },
            ]
          }
          // {
          //   title: "Reportes",
          //   path: "/personal/expediente/reportes",
          //   permission: ["PERSONAL_EXPEDIENTE_REPORTES"],
          //   action: "disable",
          //   subMenu: [
          //     {
          //       title: "General",
          //       path: "/personal/expediente/reporte-general",
          //       icon: "ChevronRight",
          //     },
          //     {
          //       title: "Individual",
          //       path: "/personal/expediente/reporte-indiviual",
          //       icon: "ChevronRight",
          //     },
          //   ],
          // },
        ]
      }
      // {
      //   title: "Nómina",
      //   path: "/administrativo/compras/plan-compras",
      //   permission: ["PERSONAL_NOMINA"],
      //   action: "disable",
      //   icon: "Percent",
      //   subMenu: [
      //     {
      //       title: "Transacciones",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/reportes",
      //     },
      //     {
      //       title: "Calculos",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/registro-control",
      //     },
      //     {
      //       title: "Tablas básicas",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/registro-control",
      //     },
      //     {
      //       title: "Reportes",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/registro-control",
      //     },
      //     {
      //       title: "Cesta tickets",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/registro-control",
      //     },
      //     {
      //       title: "Viáticos",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/registro-control",
      //     },
      //     {
      //       title: "Int presentaciones",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/registro-control",
      //     },
      //     {
      //       title: "I.S.L.R",
      //       icon: "ChevronRight",
      //       path: "/administrativo/compras/registro-control",
      //     },
      //   ],
      // },
    ]
  },
  {
    title: 'Control',
    path: '/control',
    icon: 'Lock',
    permission: ['HOME', 'HOME_CONTROL'],
    action: 'only-admin',
    subMenu: [
      {
        title: 'Administrar Usuarios',
        path: '/control/usuarios',
        permission: ['HOME_CONTROL', 'CONTROL_ADMIN_USERS'],
        icon: 'ChevronRight'
      },
      {
        title: 'Bitacora de sistema',
        path: '/control/bitacora',
        permission: ['HOME_CONTROL', 'CONTROL_BITACORA'],
        icon: 'ChevronRight'
      }
    ]
  }
]
