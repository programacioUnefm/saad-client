import { createSlice } from "@reduxjs/toolkit";

export const Auth = createSlice({
  name: "loginState",
  initialState: {
    Authstatus: true,
    name: "",
    roles: [],
    permissions: [],
    document_id: "",
    token: "",
  },
  reducers: {
    login: (state, { payload }) => {
      let permissionsList = [];
      if(payload.Authstatus){
        payload.roles.forEach((element) => {
          permissionsList.push(...element.permissions);
        });
      }
      state.Authstatus = payload.Authstatus;
      state.name = payload.name;
      state.roles = payload.roles;
      state.permissions = permissionsList;
      state.document_id = payload.document_id;
      state.token = payload.token;
    },
    
    logOut: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { login, logOut } = Auth.actions;

export default Auth.reducer;
