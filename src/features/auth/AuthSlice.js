import { createSlice } from "@reduxjs/toolkit";

export const Auth = createSlice({
  name: "loginState",
  initialState: {
    user: {
      Authstatus: true,
      name: "",
      roles: [],
      document_id: "",
      token: "",
    },
  },
  reducers: {
    login: (state, {payload}) => {
      state.user = payload
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

export const { login, logOut, themeState, layout } = Auth.actions;

export default Auth.reducer;
