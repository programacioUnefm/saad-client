export const permissionCheck = (
  permission,
  permissionsList,
  roleList = null
) => {
  if (roleList.includes("ADMIN")) {
    return true;
  } else {
    if (permission != undefined && permissionsList.length > 0) {
      return permission.every((element) => permissionsList.includes(element));
    }
    if (permissionsList.length == 0) {
      return null;
    }
    return false;
  }
};
