import axios, {type AxiosInstance} from 'axios'
import router from '@/router'
export const authServerInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_CUCURY_AUTH_SERVER}/user`,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
}
export const routineServerInstance = (): AxiosInstance => {
  const routineApi = axios.create({
    baseURL: import.meta.env.VITE_CUCURY_APP_SERVER_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async(error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        await router.push('/login')
      }
    }
  )

  return routineApi
}
