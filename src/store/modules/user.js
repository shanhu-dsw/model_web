import {getToken,setToken,removeToken} from '@/utils/auth'
import { login,refreshAdminToken} from '@/api/user'
const state ={
    token:getToken() || null,
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
      if (result.data.status == "SUCCESS") {
        context.commit('setToken', result.data.content.token)
      }
    },
    async refreshAdminToken(context, data) {
      const result_token = await refreshAdminToken() 
      if (result_token.data.status == "SUCCESS") {
        context.commit('setToken', result_token.data.content.token)
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
  