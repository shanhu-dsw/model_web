import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.10.150'
})

// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config 
}, error => {
  return Promise.reject(error)
}) 

// service.interceptors.response.use(response => {
//   const { success, message, data } = response.data
//   if (success) {
//     return data
//   } else {
//     Message.error(message) 
//     return Promise.reject(new Error(message))
//   }
// }, error => {
//   Message.error(error.message) 
//   return Promise.reject(error) 
// })

export default service
