import axios, {type AxiosInstance} from 'axios'
import router from '@/router'
export const authServerInstance = (): AxiosInstance => {
  const authApi = axios.create({
    baseURL: `${import.meta.env.VITE_CUCURY_AUTH_SERVER}/user`,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  authApi.interceptors.request.use(
    (config) => {
      config.headers['x-refresh-token'] = `${localStorage.getItem('refreshToken')}`
      return config
    }
  )
  return authApi
}
export const routineServerInstance = (): AxiosInstance => {
  const routineApi = axios.create({
    baseURL: import.meta.env.VITE_CUCURY_APP_SERVER_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  routineApi.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
      return config
    }
  )

  routineApi.interceptors.response.use(
    (response) => {
      return response
    },
    async(error) => {
      if (error.response.status === 401) {
        if (!localStorage.getItem('refreshToken')) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          await router.push('/login')
          return
        } else {
          try {
            const response = await authServerInstance().post('/refresh', {
              refreshToken: localStorage.getItem('refreshToken')
            })
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            error.config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            return routineApi.request(error.config)
          } catch (e) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            await router.push('/login')
          }
        }
      }
    }
  )

  return routineApi
}
