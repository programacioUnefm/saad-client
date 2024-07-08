export const permissionCheck = (permission, permissionsList) => {
    if(permission != undefined){
      return permission.every((element) => permissionsList.includes(element));
    }
    return false
  }