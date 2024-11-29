import axios from 'axios'

export const saadApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
})

saadApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token_access')}`
  }
  return config
})

// Interceptor de respuesta
saadApi.interceptors.response.use(
  (response) => {
    // Solicitud exitosa
    return response
  },
  (error) => {
    // Manejo de errores
    const codeError = error.response ? error.response.status : null

    if (codeError) {
      switch (codeError) {
        case 400:
          // Solicitud incorrecta
          console.error('Solicitud incorrecta (400).')
          break
        case 401:
          // No autorizado
          localStorage.removeItem('token_access')
          // eslint-disable-next-line no-case-declarations
          const appUrl = import.meta.env.VITE_APP_URL
          window.location.href = `${appUrl}/login`
          break
        case 403:
          // Prohibido
          console.error('Acceso prohibido (403).')
          break
        case 404:
          // No encontrado
          console.error('Recurso no encontrado (404).')
          break
        case 500:
          // Error del servidor
          console.error('Uno de los módulos no está funcionando de manera correcta (500).')
          break
        default:
          console.error(`Error desconocido (${codeError}).`)
          break
      }
    } else {
      if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor. Puede ser un problema de red.')
      } else {
        // Otro tipo de error al configurar la solicitud
        console.error('Error al configurar la solicitud:', error.message)
      }
    }

    return Promise.reject(error)
  }
)
