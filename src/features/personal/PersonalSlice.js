import { createSlice } from "@reduxjs/toolkit";

export const PersonalSlice = createSlice({
  name: "template",
  initialState: {
    expediente: {
      tablasBasicas: {
        personal:[],
        datosPer: {
          paises: {},
          estados: {},
          municipios: {},
          parroquias: {},
        },
      },
    },
  },
  reducers: {
    getPaises: (state ,action) => {
        state.expediente.tablasBasicas.datosPer.paises = action.payload;
    },
    getEstados: (state, action) => {
        state.expediente.tablasBasicas.datosPer.estados = action.payload;
    },
    getMunicipios: (state, action) => {
        state.expediente.tablasBasicas.datosPer.municipios = action.payload;
    },
    getParroquias: (state, action) => {
        state.expediente.tablasBasicas.datosPer.parroquias = action.payload;
    },
    getEmployeSlice:(state, action) => {
      state.expediente.tablasBasicas.personal = action.payload;
    }
  },
});
export const { getPaises, getEstados, getMunicipios, getParroquias, getEmployeSlice } = PersonalSlice.actions;

export default PersonalSlice.reducer;
