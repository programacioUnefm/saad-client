import { saadApi } from "@/api/SaddApp";
import { usersRegister } from "./usuarios/UsersSlice";
export const pagination = (url) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(url);
      if (resp.data.responseCode == 200) {
        const { data } = resp.data;
        dispatch(usersRegister(data));
      }
    } catch (error) {
      
    }
  };
};
