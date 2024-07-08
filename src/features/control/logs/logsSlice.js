
import { createSlice } from '@reduxjs/toolkit'

export const LogsSlice = createSlice({
  name: 'Logs',
  initialState: {
    list: []
  },
  reducers: {
    getListLogs: (state, {payload}) => {
      state.list = payload;
    },
  }
})
export const { getListLogs } = LogsSlice.actions

export default LogsSlice.reducer