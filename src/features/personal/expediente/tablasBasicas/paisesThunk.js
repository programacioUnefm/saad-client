import { saadApi } from '@/api/SaddApp'
import {
  getEstados,
  getMunicipios,
  getPaises,
  getParroquias
} from '@/features/personal/PersonalSlice'
import { dialogChange, resetDialog } from '@/features/ui/UiSlice'

// paises
export const getCountry = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get('/saad/expediente/paises')
      if (resp.data.responseCode === 200) {
        dispatch(getPaises(resp.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const AddCountry = (data) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.post('/saad/expediente/paises', data)
      if (resp.data.responseCode === 200) {
        dispatch(getCountry())
        dispatch(
          dialogChange({
            title: 'Acción realizada',
            message: `El País "${data.pais}" fué agregado dentro de la lista.`,
            status: true,
            duration: 3000,
            variant: ''
          })
        )
        setTimeout(() => {
          dispatch(resetDialog())
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const editCountry = (data) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.put(`/saad/expediente/paises/${data.id}`, data)
      if (resp.data.responseCode === 200) {
        dispatch(getCountry())
        dispatch(
          dialogChange({
            title: 'Acción realizada',
            message: `El País "${data.pais}" fué editado.`,
            status: true,
            duration: 3000,
            variant: ''
          })
        )
        setTimeout(() => {
          dispatch(resetDialog())
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteCountry = (idPais) => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.delete(`/saad/expediente/paises/${idPais}`)
      if (resp.data.responseCode === 200) {
        dispatch(getCountry())
        dispatch(
          dialogChange({
            title: 'Acción realizada',
            message: 'El País fué eliminado de la lista.',
            status: true,
            duration: 3000,
            variant: ''
          })
        )
        setTimeout(() => {
          dispatch(resetDialog())
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// estados
export const getContryState = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get('/saad/expediente/estados')
      if (resp.data.responseCode === 200) {
        dispatch(getEstados(resp.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// municipios
export const getMunicipality = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get('/saad/expediente/municipios')
      if (resp.data.responseCode === 200) {
        dispatch(getMunicipios(resp.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// parroquias
export const getParishes = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await saadApi.get('/saad/expediente/parroquias')
      if (resp.data.responseCode === 200) {
        dispatch(getParroquias(resp.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
