
import { createSlice } from '@reduxjs/toolkit'

export const LogsSlice = createSlice({
  name: 'Logs',
  initialState: {
    logs: []
  },
  reducers: {
    getListLogs: (state, {payload}) => {
      state.logs = payload;
    },
  }
})
export const { getListLogs } = LogsSlice.actions

export default LogsSlice.reducer