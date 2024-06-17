import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from '../features/login/LoginSlice'
import ComprasSlice from '../features/compras/ComprasSlice'
import HabilitaduriaSlice from '../features/habilitaruria/HabilitaduriaSlice'
import ContabilidadSlice from '../features/contabilidad/ContabilidadSlice'
import PresupuestoSlice from '../features/presupuesto/PresupuestoSlice'
import UsersSlice from '@/features/usuarios/UsersSlice'

export default configureStore({
  reducer: {
    login:LoginSlice,
    compras:ComprasSlice,
    habilitaduria:HabilitaduriaSlice,
    contabilidad:ContabilidadSlice,
    presupuesto:PresupuestoSlice,
    usersList:UsersSlice
  }
})