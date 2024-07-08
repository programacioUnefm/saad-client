import { saadApi } from "@/api/SaddApp";
import { getListLogs } from "./logsSlice";

export const getLogsList = () => {
    return async (dispatch, getState) => {
      const paginationNum = getState().ui.paginationNumber
      try {
        const resp = await saadApi.get(`/admin/bitacora/results/${60}`);
        if (resp.data.responseCode == 200) {
          const { data } = resp.data;
          dispatch(getListLogs(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
  };