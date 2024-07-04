import { createSlice } from "@reduxjs/toolkit";

export const ui = createSlice({
  name: "ui",
  initialState: {
    theme: "",
    layout: "",
    paginationNumber: 12,
    filters: {
      search: "",
      status: false,
      url: "",
      result: [],
    },
    menuState:{
      route:"",
      arrayRoute:[]
    },
    dialog: {
      title: "",
      message: "",
      status: false,
      duration: 3000,
      variant: ""
    },
  },
  reducers: {
    themeChange: (state, { payload }) => {
      state.theme = payload;
    },
    layoutChanged: (state, { payload }) => {
      state.layout = payload;
    },
    dialogChange: (state, { payload }) => {
      state.dialog = payload;
    },
    filtersChange: (state, { payload }) => {
      state.filters = payload;
    },
    resetDialog: (state) => {
      state.dialog = { title: "", message: "", status: false, duration: 3000 };
    },
    filterUrlChange:(state, {payload}) => {
      state.filters = {...state.filters, url: payload};
    }
  },
});

export const { themeChange, layoutChanged, dialogChange, filtersChange, resetDialog, filterUrlChange } =
  ui.actions;

export default ui.reducer;
