/* eslint-disable indent */
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginPage } from '../login/pages/LoginPage'
import { DashboardPage } from '../app/dasboard/DashboardPage'
import { ProtectedRoutes } from './ProtectedRoutes'
import { UsersListPage } from '../app/control/admin_users/UsersListPage'
import { layoutChanged, themeChange } from '../features/ui/UiSlice'
import { VerifyUser } from '../features/auth/LoginThunk'
import { login } from '../features/auth/AuthSlice'
import { LogsPage } from '@/app/control/log/LogsPage'
import { NoAuthPage } from '@/app/layouts/unAuth/NoAuthPage'
import { DatosPersonalesPage } from '@/app/personal/expediente/tablasBasicas/datosPersonales/DatosPersonalesPage'
import { MyAccountConfig } from '@/app/myaccount/MyAccountConfig'
import { PublicRoutes } from './PublicRoutes'
import { NotFoundPage } from '@/app/layouts/404page/NotFoundPage'
import { InstitucionPage } from '@/app/personal/expediente/tablasBasicas/estructuraInstitucional/InstitucionPage'

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
    permission: ['NONE'],
    component: <MyAccountConfig />,
    action: 'hidden'
  },
  {
    title: 'Personal',
    path: '/personal',
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
          {
            title: 'Tablas básicas',
            permission: ['PERSONAL_EXPEDIENTE_TABLASB'],
            action: 'disable',
            path: '/personal/expediente/tablas-basicas',
            icon: 'Table',
            subMenu: [
              {
                title: 'Datos personales',
                path: '/personal/expediente/tablas-basicas/datos-personales',
                permission: ['EXPEDIENTE_TABLASB_DATOS_PERSONALES'],
                action: 'disable',
                icon: 'ChevronRight',
                component: <DatosPersonalesPage />
              },
              {
                title: 'Estructura institucional',
                permission: ['PERSONAL_EXPEDIENTE_TABLASB'],
                action: 'disable',
                path: '/personal/expediente/tablas-basicas/institucion',
                component: <InstitucionPage />,
                icon: 'ChevronRight'
              }
            ]
          }
        ]
      }
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

export const RouterApp = () => {
  // Variables iniciales obtenidas del almacenamiento local
  const theme = localStorage.getItem('vite-ui-theme') // Tema de la interfaz
  const token = localStorage.getItem('token_access') // Token de autenticación
  const defaultLayout = localStorage.getItem('layoutList') // Diseño predeterminado

  // Uso del estado global para saber si el usuario está autenticado
  const { Authstatus } = useSelector((state) => state.auth)
  const dispatch = useDispatch() // Hook para despachar acciones de Redux

  // Efecto para inicializar configuraciones al cargar el componente
  useEffect(() => {
    // Verifica si existe un layout guardado, si no, lo inicializa
    if (defaultLayout == null || defaultLayout === undefined) {
      localStorage.setItem('layoutList', 'list') // Establece "list" como diseño por defecto
      dispatch(layoutChanged('list')) // Actualiza el estado global del layout
    } else {
      dispatch(layoutChanged(defaultLayout)) // Usa el diseño guardado
    }

    // Verifica si hay un token de autenticación
    if (token != null && token !== undefined) {
      dispatch(VerifyUser(token)) // Verifica el token con una acción
    } else {
      // Si no hay token, actualiza el estado de autenticación a "no autenticado"
      dispatch(login({ Authstatus: false, name: '', role: [], token: '' }))
    }

    // Cambia el tema de la aplicación al cargado desde localStorage
    dispatch(themeChange(theme))
  }, []) // El array vacío indica que se ejecuta solo al montar el componente

  return (
    <>
      {/* Definición de las rutas de la aplicación */}
      <Routes>
        {/* Rutas para manejar errores y páginas no encontradas */}
        <Route path='*' element={<NotFoundPage />} /> {/* Página 404 */}
        <Route path='/no-encontrada' element={<NotFoundPage />} />
        {/* Rutas públicas: accesibles sin autenticación */}
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<LoginPage />} />{' '}
          {/* Página de inicio de sesión */}
        </Route>
        {/* Redirección de la raíz dependiendo del estado de autenticación */}
        <Route
          path='/'
          element={
            Authstatus
              ? (
                <Navigate to='/inicio' replace /> // Si está autenticado, redirige a /inicio
              )
              : (
                <Navigate to='/login' replace /> // Si no, redirige a /login
              )
          }
        />
        {/* Página de acceso no autorizado */}
        <Route path='/no-autorizado' element={<NoAuthPage />} />
        {/* Rutas privadas: solo accesibles con autenticación */}
        <Route element={<ProtectedRoutes />}>
          {navbarMenu.map((menuItem, index) => (
            <Route key={index} path={menuItem.path} element={menuItem.component}>
              {menuItem.subMenu && menuItem.subMenu.map((subItem, subIndex) => (
                <Route key={subIndex} path={subItem.path} element={subItem.component}>
                  {subItem.subMenu && subItem.subMenu.map((subSubItem, subSubIndex) => (
                    <Route key={subSubIndex} path={subSubItem.path} element={subSubItem.component}>
                      {subSubItem.subMenu && subSubItem.subMenu.map((subSubSubItem, subSubSubIndex) => (
                        <Route key={subSubSubIndex} path={subSubSubItem.path} element={subSubSubItem.component} />
                      ))}
                    </Route>
                  ))}
                </Route>
              ))}
            </Route>
          ))}
        </Route>
      </Routes>
    </>
  )
}
