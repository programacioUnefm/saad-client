import { saadApi } from '@/api/SaddApp'

export const getCargaFam = (id) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get(`/saad/expediente/cargafamiliar/show/${id}`)
      if (resp.data.responseCode === 200 && resp.data.data.length > 0) {
        return resp.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const addNewCargaFam = (data) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.post('/saad/expediente/cargafamiliar', data)
      if (resp.data.responseCode === 200) {
        // dispatch(getEmploye())
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
