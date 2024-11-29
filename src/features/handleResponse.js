// responseHandler.js
export const handleResponse = (response) => {
  let message = ''
  switch (response.data.responseCode) {
    case 200:
      message = 'Operación exitosa.'
      console.log(message)
      break
    case 201:
      message = 'Recurso creado con éxito.'
      console.log(message)
      break
    case 422:
      message = 'Datos inválidos. Por favor, verifica los campos.'
      console.warn(message)
      break
    default:
      message = `Código de respuesta inesperado: ${response.data.responseCode}`
      console.error(message)
      break
  }
  return { data: response.data, message }
}

export const handleError = (error) => {
  let errorMsg = 'Error desconocido.'
  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorMsg = 'Solicitud incorrecta (400).'
        break
      case 401:
        errorMsg = 'No autorizado (401). Redirigiendo al login...'
        localStorage.removeItem('token_access')
        break
      case 403:
        errorMsg = 'Acceso prohibido (403).'
        break
      case 404:
        errorMsg = 'Recurso no encontrado (404).'
        break
      case 500:
        errorMsg = 'Error interno del servidor (500).'
        break
      default:
        errorMsg = `Error inesperado del servidor: ${error.response.status}`
        break
    }
  } else if (error.request) {
    errorMsg = 'No se recibió respuesta del servidor. Puede ser un problema de red.'
  } else {
    errorMsg = `Error al configurar la solicitud: ${error.message}`
  }
  console.error(errorMsg)
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ message: errorMsg, originalError: error })
}
