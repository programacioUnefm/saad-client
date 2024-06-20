import { saadApi } from "@/api/SaddApp";
import { GetUsersList } from "../usuarios/UsersThunks";
import { login } from "./AuthSlice";
import { dialogChange } from "../ui/UiSlice";

export const RegisterApp = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.post(`admin/users/register`, data);
      dispatch(GetUsersList());
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
      const { data: user } = resp.data;
      if (code == 200) {
        const { data } = resp.data;
        localStorage.setItem("token_access", data.token);
        dispatch(login({ ...data, Authstatus: true }));
        return { user, code };
      }
    } catch (error) {
      const { code } = error;
      return { code };
    }
  };
};

export const VerifyUser = (token) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(`/auth/whoIAm`);
      const code = resp.data.responseCode;
      const { data } = resp.data;
      if (code == 200) {
        const token = localStorage.getItem("token_access");
        const { name, id } = data.user;
        const newState = { name, id, token, role: [], Authstatus: true };
        dispatch(login(newState));
      }
      return { user, code };
    } catch (error) {
      // const message = error.response.data.message;
      // if (message == "Unauthenticated.") {
      //   dispatch(login({ Authstatus: false, name: "", role: [], token: "" }));
      //   dispatch(
      //     dialogChange({
      //       message: "Tu sesión ha expirado inicia sesión nuevamente",
      //       status: true,
      //       duration: 3000,
      //     })
      //   );
      // }
    }
  };
};

export const LogOutApp = () => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(`auth/logout`);
      localStorage.removeItem("token_access");
      dispatch(login({ Authstatus: false, name: "", role: [], token: "" }));
    } catch (error) {
      console.log(error);
    }
  };
};
