import { createSlice } from "@reduxjs/toolkit";

export const UsersSlice = createSlice({
  name: "usersList",
  initialState: {
    users: [],
    roles:[]
  },
  reducers: {
    usersRegister: (state, action) => {
      state.users = action.payload;
    },
    roleRegister: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const { usersRegister, roleRegister } = UsersSlice.actions;

export default UsersSlice.reducer;
