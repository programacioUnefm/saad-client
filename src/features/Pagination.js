import { saadApi } from "@/api/SaddApp";
import { permissionsPagination, roleRegister, usersRegister } from "./control/usuarios/UsersSlice";
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
          case "roles":
            dispatch(roleRegister(data));
            break;
          case "permissions":
            dispatch(permissionsPagination(data));
            break;
        }
      }
    } catch (error) {}
  };
};
