import { saadApi } from "@/api/SaddApp";
import { login } from "./LoginSlice";
import { GetUsersList } from "../usuarios/UsersThunks";

export const RegisterApp = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.post(`auth/register`, data);
      dispatch(GetUsersList())
      return resp.status;
    } catch (error) {
      console.log(error);
    }
  };
};

export const LoginApp = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.post(`auth/login`, data);
      const code = resp.data.responseCode;
      const {data:user} = resp.data
      if (code == 200) {
        const { data } = resp.data;
        localStorage.setItem("token_access", data.token);
        dispatch(login(user))
      }
      return { user, code };
    } catch (error) {
      const {code} = error
      return {code}
    }
  };
};

export const VerifyUserApp = () => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(`users`);
      // console.log(resp)
      // const code = resp.data.responseCode;
      // const {data:user} = resp.data
      // if (code == 200) {
      //   const { data } = resp.data;
      //   localStorage.setItem("token_access", data.token);
      //   dispatch(login(user))
      // }
      // return { user, code };
    } catch (error) {
      const {code} = error
      return {code}
    }
  };
};

export const LogOutApp = () => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(`auth/logout`);
      // localStorage.removeItem("token_access");
      // console.log(resp)
    } catch (error) {
      console.log(error)
    }
  };
};
