import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'application/json',
  },
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
})

instance.interceptors.response.use((config: AxiosRequestConfig) => {
  // if (config.data.status === 403) {
  // }
  return config
})

// if (localStorage.getItem('token')) {
//     // instance.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
// }

export default instance
