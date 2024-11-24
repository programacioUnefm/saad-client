import { createSlice } from '@reduxjs/toolkit'

export const PersonalSlice = createSlice({
  name: 'template',
  initialState: {
    expediente: {
      tablasBasicas: {
        personal: [],
        tipoDiscapacidades: [],
        dataPais: {
          paises: {},
          estados: {},
          municipios: {},
          parroquias: {}
        }
      }
    }
  },
  reducers: {
    getPaises: (state, action) => {
      state.expediente.tablasBasicas.dataPais.paises = action.payload
    },
    getEstados: (state, action) => {
      state.expediente.tablasBasicas.dataPais.estados = action.payload
    },
    getMunicipios: (state, action) => {
      state.expediente.tablasBasicas.dataPais.municipios = action.payload
    },
    getParroquias: (state, action) => {
      state.expediente.tablasBasicas.dataPais.parroquias = action.payload
    },
    getEmployeSlice: (state, action) => {
      state.expediente.tablasBasicas.personal = action.payload
    },
    getTipoDiscapacidad: (state, action) => {
      state.expediente.tablasBasicas.tipoDiscapacidades = action.payload
    }
  }
})
export const { getPaises, getEstados, getMunicipios, getParroquias, getEmployeSlice, getTipoDiscapacidad } = PersonalSlice.actions

export default PersonalSlice.reducer
