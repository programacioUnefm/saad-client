import { saadApi } from "../../api/SaddApp";
import { GetUsersList } from "../control/usuarios/UsersThunks";
import { editMyUser, login } from "./AuthSlice";
import { dialogChange, resetDialog } from "../ui/UiSlice";

export const RegisterApp = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.post(`auth/register`, data);
      let rutaActual = window.location.pathname;
      if (rutaActual != "/login") {
        dispatch(GetUsersList());
      }
      return resp.status;
    } catch (error) {
      // console.log(error)
      const errorMessage = error.response.data.errors;
      let message = "";
      if (error.response.data.errors.document_id != undefined) {
        message = error.response.data.errors.document_id[0];
      }
      if (error.response.data.errors.email != undefined) {
        if (message != "") {
          message = message + " \n " + error.response.data.errors.email[0];
        } else {
          message = error.response.data.errors.email[0];
        }
      }
      dispatch(
        dialogChange({
          title: "Ups, parece haber un error",
          message: message,
          status: true,
          duration: 3000,
          variant: "destructive",
        })
      );
      setTimeout(() => {
        dispatch(resetDialog());
      }, 3000);
    }
  };
};

export const editUser = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.put(`admin/users/${data.id}`, data);
      dispatch(GetUsersList());
      dispatch(editMyUser(data));
      dispatch(
        dialogChange({
          title: "Usuario Editado",
          message: "",
          status: true,
          duration: 3000,
          variant: "",
        })
      );
      return true;
    } catch (error) {
      if (codeError == 401) {
        dispatch(LogOutApp());
      }
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
        return code;
      }
    } catch (error) {
      const codeError = error.response.status;
      // dispatch(LogOutApp());
      return codeError;
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
        const newState = {
          name: data.name,
          id: data.id,
          document_id: data.document_id,
          token,
          email: data.email,
          last_name: data.last_name,
          roles: data.roles,
          Authstatus: true,
        };
        dispatch(login(newState));
      }
      return { code };
    } catch (error) {
      //TODO: ver como resolver esto
      console.log(error);
      // const message = error.response.data.message;
      // const codeError = error.response.status;

      // if (codeError == 401) {
      //   dispatch(LogOutApp());
      // }

      // if (message == "Unauthenticated.") {
      //   dispatch(
      //     login({
      //       Authstatus: false,
      //       name: "",
      //       document_id: "",
      //       roles: [],
      //       token: "",
      //     })
      //   );
      //   dispatch(
      //     dialogChange({
      //       message: "Tu sesión ha expirado inicia sesión nuevamente",
      //       status: true,
      //       duration: 3000,
      //       variant: "destructive",
      //     })
      //   );
      //   setTimeout(() => {
      //     dispatch(
      //       dialogChange({
      //         message: "",
      //         status: false,
      //         duration: 3000,
      //         variant: "",
      //       })
      //     );
      //   }, 3000);
      // }
    }
  };
};

export const LogOutApp = () => {
  return async (dispatch) => {
    console.log("cerrando sesion");
    try {
      dispatch(login({ Authstatus: false, name: "", role: [], token: "" }));
      const resp = await saadApi.get(`auth/logout`);
      localStorage.removeItem("token_access");
      // const appUrl = import.meta.env.VITE_APP_URL;
      // window.location.href = `${appUrl}/login`;
    } catch (error) {}
  };
};
