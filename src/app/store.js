import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from '../features/auth/AuthSlice'
import ComprasSlice from '../features/compras/ComprasSlice'
import HabilitaduriaSlice from '../features/habilitaruria/HabilitaduriaSlice'
import ContabilidadSlice from '../features/contabilidad/ContabilidadSlice'
import PresupuestoSlice from '../features/presupuesto/PresupuestoSlice'
import UsersSlice from '../features/usuarios/UsersSlice'
import UiSlice from '../features/ui/UiSlice'

export default configureStore({
  reducer: {
    auth:LoginSlice,
    ui:UiSlice,
    compras:ComprasSlice,
    habilitaduria:HabilitaduriaSlice,
    contabilidad:ContabilidadSlice,
    presupuesto:PresupuestoSlice,
    usersList:UsersSlice
  }
})