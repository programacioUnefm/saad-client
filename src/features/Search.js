import { saadApi } from "../api/SaddApp";
import { dialogChange, filtersChange, resetDialog } from "./ui/UiSlice";

export const search = (route) => {
  return async (dispatch, getState) => {
    try {
      const {ui} = getState();
      const resp = await saadApi.post(`${route}${ui.paginationNumber}`, {"term": ui.filters.search});
      if (resp.data.responseCode == 200) {
        const result = resp.data;
        dispatch(filtersChange({...ui.filters, result: result, status: true, url: route}));
        dispatch(resetDialog())
      }
    } catch (error) {
      const {ui} = getState();
      const resp = error.response.data.responseCode;
      if(resp == 404){
        dispatch(filtersChange({...ui.filters, result: [], status: false, url: ""}));
        dispatch(dialogChange( { 
          ...ui.dialog,
          title: "Ups, hubo un error",
          message: "Parece que lo que estás buscando no existe en este lugar.",
          status:true,
        }))
      }
    }
  };
};