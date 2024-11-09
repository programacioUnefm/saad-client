export const permissionCheck = (
  permission, //lista de permisos que se necesitan para que devuelva true
  permissionsList, // lista de permisos que posee el usuario
  roleList = null // este no hace nada
) => {
  
  if (permissionsList[0] == "*") { // si la lista de permisos pose en su primer item el "*" es por que ese usuario es un admin
    return true;
  } else { // si no se realiza una operacion para ver si el usuario posee los permisos necesarios para que la función devuelva un true o false
    if (permission != undefined && permissionsList.length > 0) {
      return permission.every((element) => permissionsList.includes(element));
    }
    if (permissionsList.length == 0) {
      return null;
    }
    return false;
  }
};
