import { saadApi } from "@/api/SaddApp";
import { getListLogs } from "./logsSlice";
import { dialogChange, resetDialog } from "@/features/ui/UiSlice";

export const getLogsList = () => {
    return async (dispatch, getState) => {
      const paginationNum = getState().ui.paginationNumber
      try {
        const resp = await saadApi.get(`/admin/bitacora/`);
        if (resp.data.responseCode == 200) {
          const { data } = resp.data;
          dispatch(getListLogs(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
  };


  export const paginateLogs = (url) => {
    return async (dispatch, getState) => {
      try {
        let newData = {}
        const {data} = getState().logs.list;
        let resp = await saadApi.get(url);
        newData = [...data, ...resp.data.data.data]
        const newState = {...resp.data.data, data: [...newData]};
        if (resp.data.responseCode == 200) {
          dispatch(getListLogs(newState));  
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const filtersLogs = (terms) => {
    return async (dispatch, getState) => {
      try {
        const paginationNum = getState().ui.paginationNumber
        let resp = await saadApi.post(`/admin/bitacora/search/${paginationNum}`, terms);
        if (resp.data.responseCode == 200) {
          dispatch(getListLogs(resp.data.data));  
        }
      } catch (error) {
        dispatch(dialogChange({
          title: "No se encontró el registro",
          message: "El registro que buscas no existe.",
          status: true,
          duration: 500,
          variant: "destructive"
        }))
        setTimeout(() => {
          dispatch(resetDialog());
        }, 500);
      }
    };
  };