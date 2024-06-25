import { saadApi } from "@/api/SaddApp";
import { permissionsRegister, roleRegister, usersRegister } from "./UsersSlice";



export const GetUsersList = () => {
  return async (dispatch, getState) => {
    const paginationNum = getState().ui.paginationNumber
    try {
      const resp = await saadApi.get(`admin/users/results/${paginationNum}`);
      if (resp.data.responseCode == 200) {
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

      if (resp.data.responseCode == 200) {
        dispatch(GetUsersList());
        return resp.data.responseCode;
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
      if (resp.data.responseCode == 200) {
        const { data } = resp.data;
        dispatch(GetUsersList());
      }
      return resp.data.responseCode;
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetRolesList = () => {
  return async (dispatch, getState) => {
    try {
      const paginationNum = getState().ui.paginationNumber
      const resp = await saadApi.get(`admin/roles/results/${paginationNum}`);
      if (resp.data.responseCode == 200) {
        const { data } = resp.data;
        dispatch(roleRegister(data));  
      }
    } catch (error) {
      console.log(error);
    }
  };
};



export const deleteRol = (id) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.delete(`admin/roles/${id}`);
      if (resp.data.responseCode == 200) {
        dispatch(GetRolesList());
      }
      return resp.data.responseCode;
    } catch (error) {
      console.log(error);
    }
  };
};


export const addRolAsync = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.post(`admin/roles`, data);
      if (resp.data.responseCode == 200) {
        dispatch(GetRolesList());
      }
      return resp.data.responseCode;
    } catch (error) {
      console.log(error);
    }
  };
};

export const UpdateRolAsync = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.put(`admin/roles/${data.id}`, data);
      if (resp.data.responseCode == 200) {
        dispatch(GetRolesList());
      }
      return resp.data.responseCode;
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetPermissionsList = () => {
  return async (dispatch, getState) => {
    try {
      const paginationNum = getState().ui.paginationNumber
      const resp = await saadApi.get(`admin/permissions/results/${paginationNum}`);
      if (resp.data.responseCode == 200) {
        const { data } = resp.data;
        dispatch(permissionsRegister(data));  
      }
    } catch (error) {
      console.log(error);
    }
  };
};
