import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from '../features/auth/AuthSlice'
import ComprasSlice from '../features/compras/ComprasSlice'
import HabilitaduriaSlice from '../features/habilitaruria/HabilitaduriaSlice'
import ContabilidadSlice from '../features/contabilidad/ContabilidadSlice'
import PresupuestoSlice from '../features/presupuesto/PresupuestoSlice'
import UsersSlice from '../features/control/usuarios/UsersSlice'
import UiSlice from '../features/ui/UiSlice'
import  LogsSlice  from '@/features/control/logs/logsSlice'



export default configureStore({
  reducer: {
    auth:LoginSlice,
    ui:UiSlice,
    compras:ComprasSlice,
    habilitaduria:HabilitaduriaSlice,
    contabilidad:ContabilidadSlice,
    presupuesto:PresupuestoSlice,
    usersList:UsersSlice,
    logs:LogsSlice
  }
})