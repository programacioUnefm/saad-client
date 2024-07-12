export const permissionCheck = (permission, permissionsList) => {
    if(permission != undefined && permissionsList.length > 0){
      return permission.every((element) => permissionsList.includes(element));
    }
    if(permissionsList.length  == 0){
      return null
    }
    return false
  }