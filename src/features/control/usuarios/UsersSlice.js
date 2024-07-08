import { createSlice } from "@reduxjs/toolkit";

export const UsersSlice = createSlice({
  name: "usersList",
  initialState: {
    users: [],
    roles:[],
    permissions:[],
    permissionsFull:[],
    tabState: "",
  },
  reducers: {
    usersRegister: (state, {payload}) => {
      state.users = payload
    },
    roleRegister: (state, action) => {
      state.roles = action.payload;
    },
    permissionsRegister: (state, {payload}) => {
      state.permissions = payload.data;
      state.permissionsFull = payload.dataFull;
    },
    permissionsPagination: (state, {payload}) => {
      state.permissions = payload;
    }, 
    tabStateChange: (state, {payload}) => {
      state.tabState = payload;
    }
  },
});

export const { usersRegister, roleRegister, permissionsRegister,permissionsPagination, tabStateChange } = UsersSlice.actions;

export default UsersSlice.reducer;
