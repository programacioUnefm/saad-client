import { createSlice } from "@reduxjs/toolkit";

export const UsersSlice = createSlice({
  name: "usersList",
  initialState: {
    users: [],
    roles:[],
    permissions:[],
  },
  reducers: {
    usersRegister: (state, {payload}) => {
      state.users = payload
    },
    roleRegister: (state, action) => {
      state.roles = action.payload;
    },
    permissionsRegister: (state, action) => {
      state.permissions = action.payload;
    },
  },
});

export const { usersRegister, roleRegister, permissionsRegister } = UsersSlice.actions;

export default UsersSlice.reducer;
