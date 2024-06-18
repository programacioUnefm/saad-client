
import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    theme: "",
    layout: "",
  },
  reducers: {
    themeChange: (state, {payload}) => {
      state.theme = payload;
    }, 
    layoutChanged:(state, {payload}) => {
      state.layout = payload;
    }
  }
})

export const { themeChange, layoutChanged} = ui.actions

export default ui.reducer