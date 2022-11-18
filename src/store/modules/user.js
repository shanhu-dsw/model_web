import {getToken,setToken,removeToken} from '@/utils/auth'
import { login } from '@/api/user'
const state ={
    token:getToken() || null,
    userInfo:{}
}
const mutations = {
    setToken(state,token){
        state.token = token
        setToken(token)
    },
    removeToken(state){
        state.token = null
        removeToken()
    }
}
const actions = {
    async login(context, data) {
      const result = await login(data) 
      if (result.data) {
        context.commit('setToken', result.data.data.token)
      }else{
        Message.error(message)
      }
    },
    logout(context) {
      // 删除token
      context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    }
  }
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  