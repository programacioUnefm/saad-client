import { dialogChange, resetDialog } from "@/features/ui/UiSlice";
import { saadApi } from "../../../api/SaddApp";
import { permissionsRegister, roleRegister, usersRegister } from "./UsersSlice";


//usuarios
export const GetUsersList = () => {
  return async (dispatch, getState) => {
    const paginationNum = getState().ui.paginationNumber
    try {
      const resp = await saadApi.get(`admin/users`);
      
      if (resp.data.responseCode == 200) {
        // const { data } = resp.data;
        dispatch(usersRegister(resp.data));
      }
    } catch (error) {
      
      dispatch(usersRegister({data:[]}));
    }
  };
};


export const editUserAsync = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.put(`admin/users/${data.id}`, data);
      if (resp.data.responseCode == 200) {
        dispatch(GetUsersList());
        return resp.data.responseCode;
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

export const paginateUsers = (url) => {
  return async (dispatch, getState) => {
    try {
      let newData = {}
      const {data} = getState().usersList.users;
      let resp = await saadApi.get(url);
      newData = [...data, ...resp.data.data.data]
      const newState = {...resp.data.data, data: [...newData]};
      if (resp.data.responseCode == 200) {
        dispatch(usersRegister(newState));  
      }
    } catch (error) {
      console.log(error);
    }
  };
};


//usuarios

//roles

export const userRoleAssign = (data) => {
  return async (dispatch) => {
    try {
      const {userId, roles} = data;
      console.log(roles)
      console.log(userId)
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
      const resp = await saadApi.get(`admin/roles`);
      if (resp.data.responseCode == 200) {
        // const { data } = resp.data;
        
        dispatch(roleRegister(resp.data));  
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
      const errorMessage = error.response.data.errors.code[0];
      dispatch(dialogChange( {
        title: "Ups, parece haber un error",
        message: errorMessage,
        status: true,
        duration: 3000,
        variant: "destructive"
      }))
      setTimeout(() => {
        dispatch(resetDialog());
      }, 3000);
    }
  };
};

export const paginateRole = (url) => {
  return async (dispatch, getState) => {
    try {
      let newData = {}
      const {data} = getState().usersList.roles;
      let resp = await saadApi.get(url);
      newData = [...data, ...resp.data.data.data]
      const newState = {...resp.data.data, data: [...newData]};
      if (resp.data.responseCode == 200) {
        dispatch(roleRegister(newState));  
      }
    } catch (error) {
      console.log(error);
    }
  };
};


//permissions

export const updatePermissionToRole = (data, id) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.post(`admin/roles/${id}/assign-permissions`, data);
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
      const respFull = await saadApi.get(`admin/permissions/`);
      if (resp.data.responseCode == 200) {
        const { data } = resp.data;
        const {data:dataFull} = respFull.data
        dispatch(permissionsRegister({data, dataFull}));  
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const addPermissionAsync = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.post(`admin/permissions`, data);
      if (resp.data.responseCode == 200) {
        dispatch(GetPermissionsList());
      }
      return resp.data.responseCode;
    } catch (error) {
      console.log(error);
    }
  };
};

export const editPermission = (data) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.put(`admin/permissions/${data.id}`, data);
      if (resp.data.responseCode == 200) {
        dispatch(GetPermissionsList());
      }
      return resp.data.responseCode;
    } catch (error) {
      console.log(error);
    }
  };
};



export const deletePermission = (id) => {
  return async (dispatch) => {
    try {
      const resp = await saadApi.delete(`admin/permissions/${id}`);
      if (resp.data.responseCode == 200) {
        dispatch(GetPermissionsList());
      }
      return resp.data.responseCode;
    } catch (error) {
      console.log(error);
    }
  };
};