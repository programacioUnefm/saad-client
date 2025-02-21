import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { NotFoundPage } from '../../404page/NotFoundPage'
import { MyAccount } from './MyAccount'
import { UsersListPage } from '@/app/control/admin_users/UsersListPage'
import { LogsPage } from '@/app/control/log/LogsPage'
import { DashboardPage } from '@/app/dasboard/DashboardPage'
export const navbarMenu = [
  {
    title: 'Inicio',
    path: '/inicio',
    icon: 'Home',
    permission: ['HOME'],
    component: <DashboardPage />,
    action: 'disable'
  },
  {
    title: 'Página no encontrada',
    path: '/no-encontrada',
    icon: 'Home',
    permission: ['HOME'],
    component: <NotFoundPage />,
    action: 'hidden'
  },
  {
    title: 'Mi cuenta',
    path: '/mi-cuenta',
    icon: '',
    component: <MyAccount />,
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
        component: <UsersListPage />,
        icon: 'ChevronRight'
      },
      {
        title: 'Bitacora de sistema',
        path: '/control/bitacora',
        component: <LogsPage />,
        permission: ['HOME_CONTROL', 'CONTROL_BITACORA'],
        icon: 'ChevronRight'
      }
    ]
  }
]
export const MenuRender = () => {
  return (
    <>
      {navbarMenu.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={item.component}
        >
          {item.subMenu && item.subMenu.map((subItem, subIndex) => (
            <Route
              key={subIndex}
              path={subItem.path}
              element={subItem.component}
            >
              {subItem.subMenu && subItem.subMenu.map((subSubItem, subSubIndex) => (
                <Route
                  key={subSubIndex}
                  path={subSubItem.path}
                  element={subSubItem.component}
                />
              ))}
            </Route>
          ))}
        </Route>
      ))}
    </>

  )
}
