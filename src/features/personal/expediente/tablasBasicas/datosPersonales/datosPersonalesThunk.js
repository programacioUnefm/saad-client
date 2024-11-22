import { saadApi } from "@/api/SaddApp";

import { dialogChange, resetDialog } from "@/features/ui/UiSlice";

//paises
export const addNewPersonal = (data) => {
  return async (dispatch, getState) => {
    try {    
      const resp = await saadApi.post(`/saad/expediente/empleados` , data);
      console.log(data)
      if (resp.data.responseCode == 200) {
        // console.log(resp)
        // dispatch(getPaises(resp.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
