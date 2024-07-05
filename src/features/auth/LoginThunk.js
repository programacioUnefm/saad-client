import { saadApi } from "../../api/SaddApp";
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

export const VerifyUser = () => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(`/auth/whoIAm`);
      const code = resp.data.responseCode;
      const { data } = resp.data;
      if (code == 200) {
        const token = localStorage.getItem("token_access");
        const newState = { name:data.name, id:data.id, document_id:data.document_id, token, roles: data.roles, Authstatus: true };
        dispatch(login(newState));
      }
      return { code };
    } catch (error) {
      const message = error.response.data.message;
      if (message == "Unauthenticated.") {
        dispatch(login({ Authstatus: false, name: "",document_id:"", roles: [], token: "" }));
        dispatch(
          dialogChange({
            message: "Tu sesión ha expirado inicia sesión nuevamente",
            status: true,
            duration: 3000,
            variant: "destructive"
          })
        );
        setTimeout(() => {
          dispatch(
            dialogChange({
              message: "",
              status: false,
              duration: 3000,
              variant: ""
            })
          );
        }, 3000);
      }
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
      
    }
  };
};
