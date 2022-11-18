<template>
  <div>
    <div style="margin-top:20px;text-align:center">
      <span style="margin-right:50px">最新日志信息(最后50条)</span>
      <el-switch v-model="value" inactive-text="自动刷新" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
    <el-select v-model="region" placeholder="选择显示日志数量" style="margin-right:20px;margin-left:20px">
      <el-option label="50" value="50"></el-option>
      <el-option label="100" value="100"></el-option>
      <el-option label="200" value="200"></el-option>
      <el-option label="500" value="500"></el-option>
    </el-select>
    <el-button @click="newlog">查询</el-button>
    </div>
    <div style="text-align:center;border-color:inherit">
      <textarea
      class="readlog_text"
      cols="120"
      rows="20"
      style="text-align: left; margin-top: 20px;width: 100%;line-height:30px;;"
    ></textarea>
    </div>
  </div>
</template>

<script>
import { Looklog50,Looklog100,Looklog200,Looklog500 } from "@/api/Call-service"
import $ from "jquery";
export default {
  data(){
    return{
      value:true,
      region:"",

    }
  },
  methods: {
    newlog(){
      if(this.region == ""){
        var logtext =document.querySelector(".readlog_text")
        Looklog50(logtext)
      }
      else if(this.region == 100){
        var logtext100 =document.querySelector(".readlog_text") ;
        Looklog100(logtext100)
      }
      else if (this.region == 200){
        var logtext200 =document.querySelector(".readlog_text") ;
        Looklog200(logtext200)
      }
      else if (this.region == 500){
        var logtext500 =document.querySelector(".readlog_text") ;
        Looklog500(logtext500)
      }else if(this.value == false){
      clearInterval(logtime)
    }
    }
  },
  mounted() {
    this.newlog()
    if(this.value == true){
      var logtime = setInterval(()=>{
        this.newlog()
        if(this.value == false){
          clearInterval(logtime)
        }
      },3000)
    }
  },
  updated(){
    if(this.value == true){
      var logtime = setInterval(()=>{
        this.newlog()
        if(this.value == false){
          clearInterval(logtime)
        }
      },3000)
    }
  },beforeDestroy(){
    this.value=false
  }
};
</script>

<style>
</style>