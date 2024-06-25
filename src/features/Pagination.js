import { saadApi } from "@/api/SaddApp";
import { permissionsRegister, roleRegister, usersRegister } from "./usuarios/UsersSlice";
export const paginationAdminUserPrivileges = (url, tabState) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(url);
      if (resp.data.responseCode == 200) {
        const { data } = resp.data;
        switch (tabState) {
          case "users":
            dispatch(usersRegister(data));
            break;
          case "role":
            dispatch(roleRegister(data));
            break;
          case "permissions":
            dispatch(permissionsRegister(data));
            break;
        }
      }
    } catch (error) {}
  };
};
