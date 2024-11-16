import { createSlice } from "@reduxjs/toolkit";

export const Auth = createSlice({
  name: "loginState",
  initialState: {
    id: "",
    Authstatus: true,
    email: "",
    name: "",
    last_name: "",
    roles: [],
    roleList: [],
    permissions: [],
    document_id: "",
    token: "",
    loadData:false,
  },
  reducers: {
    login: (state, { payload }) => {
      let permissionsList = [];
      let roleList = [];
      if (payload.Authstatus) {
        payload.roles.forEach((element) => {
          roleList.push(element.code);
          permissionsList.push(...element.permissions);
          if(element.code == "ADMIN"){
            permissionsList = ["*"];
          }
        });
      }
      state.id = payload.id;
      state.Authstatus = payload.Authstatus;
      state.name = payload.name;
      state.roles = payload.roles;
      state.email = payload.email;
      state.roleList = roleList;
      state.last_name = payload.last_name;
      state.permissions = permissionsList;
      state.document_id = payload.document_id;
      state.token = payload.token;
      state.loadData = true;
    },

    editMyUser: (state, { payload }) => {
      state.document_id = payload.document_id;
      state.name = payload.name;
      state.last_name = payload.last_name;
      state.email = payload.email;
    },

    logOut: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { login, logOut, editMyUser } = Auth.actions;

export default Auth.reducer;
