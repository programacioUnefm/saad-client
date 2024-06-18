import { saadApi } from "@/api/SaddApp";
import { roleRegister, usersRegister } from "./UsersSlice";

export const GetUsersList = () => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(`admin/users`);
      if (resp.status == 200) {
        const { data } = resp.data;
        dispatch(usersRegister(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.delete(`admin/users/${id}`);

      if (resp.status == 200) {
        dispatch(GetUsersList());
        return resp.status;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const userRoleAssign = (data) => {
  return async (dispatch) => {
    try {
      const {userId, roles} = data;
      const resp = await saadApi.post(`admin/users/${userId}/roles`, roles);
      console.log(resp)
      if (resp.status == 200) {
        const { data } = resp.data;
        dispatch(GetUsersList());
        return resp.status;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetRolesList = () => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.get(`admin/roles`);
      if (resp.status == 200) {
        const { data } = resp.data;
        // const newData = data.map(item => ({ ...item, status: false }))
        // const rolesSinFechas = data.map(({ created_at, updated_at, ...resto }) => resto);
        dispatch(roleRegister(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
