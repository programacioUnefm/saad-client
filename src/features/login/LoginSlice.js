import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "loginState",
  initialState: {
    user: {
      // id: "qweas56dxcas354981",
      name: "",
      // role: ["contabilidad"],
      token: "",
    },
    theme: null,
    layout: null
    // user:null
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    logOut: (state, action) => {
      console.log(action.payload);
    },
    themeState: (state, action) => {
      state.theme = action.payload
    },
    layout:(state, action) => {
      state.layout = action.payload;
    }
  },
});

export const { login, logOut, themeState, layout } = LoginSlice.actions;

export default LoginSlice.reducer;
