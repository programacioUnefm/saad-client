
import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    theme: "",
    layout: "",
    paginationNumber: 12,
    dialog:{
      message: "",
      status:false,
      duration: 3000,
    }
  },
  reducers: {
    themeChange: (state, {payload}) => {
      state.theme = payload;
    }, 
    layoutChanged:(state, {payload}) => {
      state.layout = payload;
    },
    dialogChange:(state, {payload}) => {
      state.dialog = payload;
    }
  }
})

export const { themeChange, layoutChanged, dialogChange} = ui.actions

export default ui.reducer