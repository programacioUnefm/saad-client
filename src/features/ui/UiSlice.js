import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    theme: '',
    layout: '',
    siebarState: null,
    paginationNumber: 12,
    filters: {
      search: '',
      status: false,
      url: '',
      result: []
    },
    menuState: {
      route: '',
      arrayRoute: []
    },
    dialog: {
      title: '',
      message: '',
      status: false,
      duration: 3000,
      variant: ''
    }
  },
  reducers: {
    themeChange: (state, { payload }) => {
      state.theme = payload
    },
    layoutChanged: (state, { payload }) => {
      state.layout = payload
    },
    dialogChange: (state, { payload }) => {
      state.dialog = payload
    },
    filtersChange: (state, { payload }) => {
      state.filters = payload
    },
    resetDialog: (state) => {
      state.dialog = { title: '', message: '', status: false, duration: 3000 }
    },
    filterUrlChange: (state, { payload }) => {
      state.filters = { ...state.filters, url: payload }
    },
    routeChange: (state, { payload }) => {
      state.menuState = payload
    },
    siebarStateChange: (state, { payload }) => {
      localStorage.setItem('sidebarState', payload)
      state.siebarState = payload
    },
    tablesFiltersState: (state, { payload }) => {
      const storage = localStorage.getItem('tablesFilters')
      let resp = JSON.parse(storage)
      if (!storage) {
        const dataTableDatosPer = payload
        if (resp == null) {
          localStorage.setItem('tablesFilters', JSON.stringify(dataTableDatosPer))
        }
      } else {
        resp = { ...resp, [Object.keys(payload)[0]]: Object.values(payload)[0] }
        localStorage.setItem('tablesFilters', JSON.stringify(resp))
      }
    }
  }
})

export const { themeChange, layoutChanged, dialogChange, filtersChange, resetDialog, filterUrlChange, routeChange, siebarStateChange, tablesFiltersState } =
  ui.actions

export default ui.reducer
