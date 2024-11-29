import { saadApi } from '@/api/SaddApp'
import { handleError, handleResponse } from '@/features/handleResponse'
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
      const errorResult = await handleError(error)
      return errorResult
    }
  }
}

export const addNewEmploye = (data) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.post('/saad/expediente/empleados', data)
      const result = handleResponse(resp)
      if (result.data.responseCode === 200) {
        dispatch(getEmploye())
      }
      return result
    } catch (error) {
      const errorResult = await handleError(error)
      return errorResult
    }
  }
}

export const editEmploye = (data) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.put(`/saad/expediente/empleados/update/${data.id}`, data)
      const result = handleResponse(resp)
      if (result.data.responseCode === 200) {
        dispatch(getEmploye())
      }
      return result
    } catch (error) {
      const errorResult = await handleError(error)
      return errorResult
    }
  }
}

export const getDiscapacidades = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get('/saad/expediente/tipodiscapacidad')
      const result = handleResponse(resp)
      if (result.data.responseCode === 200) {
        dispatch(getTipoDiscapacidad(resp.data))
        return resp.data.responseCode
      }
      return result
    } catch (error) {
      const errorResult = await handleError(error)
      return errorResult
    }
  }
}
