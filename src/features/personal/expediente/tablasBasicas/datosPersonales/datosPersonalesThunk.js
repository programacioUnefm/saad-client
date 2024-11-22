import { saadApi } from '@/api/SaddApp'
import { getEmployeSlice } from '@/features/personal/PersonalSlice'

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
        return resp.data
        // console.log(resp)
        // dispatch(getPaises(resp.data));
      }
      if (resp.data.responseCode === 422) {
        return resp.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}
