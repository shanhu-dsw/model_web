<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapActions } from "vuex";
export default {
  name: 'App',
  created(){
    setInterval(()=>{
      this.refreshToken()
    },6000*10)
    this.refreshToken()
  },
  methods:{
    ...mapActions(["user/refreshAdminToken"]),
    refreshToken(){
      this['user/refreshAdminToken']().then((res)=>{
        // console.log(res)
      })
    }
  }
}
</script>
<style>
#app{
  background: #D8D8D8;
  height: 100%;
}
</style>