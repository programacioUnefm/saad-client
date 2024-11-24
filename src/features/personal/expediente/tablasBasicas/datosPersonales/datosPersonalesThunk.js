import { saadApi } from '@/api/SaddApp'
import { getEmployeSlice, getTipoDiscapacidad } from '@/features/personal/PersonalSlice'

// datos personales
export const getEmploye = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get('/saad/expediente/empleados')
      if (resp.data.responseCode === 200) {
        dispatch(getEmployeSlice(resp.data))
        return resp.data.responseCode
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const addNewEmploye = (data) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.post('/saad/expediente/empleados', data)
      if (resp.data.responseCode === 200) {
        dispatch(getEmploye())
        return resp.data
      }
      if (resp.data.responseCode === 422) {
        return resp.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const editEmploye = (data) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.put(`/saad/expediente/empleados/update/${data.id}`, data)
      if (resp.data.responseCode === 200) {
        dispatch(getEmploye())
        return resp.data
      }
      if (resp.data.responseCode === 422) {
        return resp.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getDiscapacidades = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get('/saad/expediente/tipodiscapacidad')
      if (resp.data.responseCode === 200) {
        dispatch(getTipoDiscapacidad(resp.data))
        return resp.data.responseCode
      }
    } catch (error) {
      console.log(error)
    }
  }
}
