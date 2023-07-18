import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.10.150:9110/mms/module'
})

// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (config.data == undefined) {
      config.data = {};
    }
    config.data['Account-Token'] = getToken();
  }
  if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
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
