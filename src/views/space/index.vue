<template>
  <div>
    <div style="margin-top: 20px; margin-bottom: 20px; text-align: center">
      <span style="margin-right: 50px">服务器状态</span>
      <el-switch
        v-model="value"
        inactive-text="自动刷新"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </div>
    <div id="start_ip"></div>
    <div style="display: flex">
      <div id="main" style="height: 300px; flex: 1"></div>
      <div id="main2" style="height: 300px; flex: 1"></div>
      <div id="main3" style="height:300px; flex:1"></div>
    </div>
    <div id="post_ip"></div>
    <div style="display: flex">
      <div id="main-space" style="height: 300px; flex: 1"></div>
      <div id="main-storage" style="height: 300px; flex: 1"></div>
      <div id="main-gpu" style="height:300px; flex:1"></div>
    </div>
  </div>
</template>
<script>
import { LookSpace225,LookSpace150,Lookstorage225,Lookstorage150,LookGpu,LookCpu,LookIP_one,LookIP_two} from "@/api/Call-service" 
import $ from "jquery";
import { domainToUnicode } from "url";
export default {
  data() {
    return {
      value: true,
    };
  },
  methods: {
    async Call_Lookspace() {
      var chartDom = document.getElementById("main");
      var chartDom2 = document.getElementById("main-space");
      await LookSpace225(chartDom)
      await LookSpace150(chartDom2)
    },
    async Internal_storage() {
      var charset = document.getElementById("main2");
      var charset2 = document.getElementById("main-storage");
      await Lookstorage225(charset)
      await Lookstorage150(charset2)
    },
    async hardware_state(){
      var  charset_cpu= document.getElementById("main3");
      var  charset_gpu= document.getElementById("main-gpu");
      await LookCpu(charset_cpu)
      await LookGpu(charset_gpu)
    },
    async Call_LookIP(){
      var addIp1 = document.getElementById("start_ip")
      var addIp2 = document.getElementById("post_ip")
      await LookIP_one(addIp1)
      await LookIP_two(addIp2)
    }
  },
  mounted(){
    this.Call_Lookspace();
    this.Internal_storage();
    this.hardware_state()
    this.Call_LookIP()
    if (this.value == true) {
      var look = setInterval(() => {
          this.Call_Lookspace();
        if (this.value == false) {
          clearInterval(look);
        }
      }, 10000);
      var storage = setInterval(() => {
          this.Internal_storage();
        if (this.value == false) {
          clearInterval(storage);
        }
      }, 3000);
      var hardware = setInterval(() => {
        this.hardware_state()
        if(this.value ==false){
          clearInterval(hardware)
        }
      }, 3000);
    }
  },
  updated(){
    if (this.value == true) {
      var look = setInterval(() => {
          this.Call_Lookspace();
        if (this.value == false) {
          clearInterval(look);
        }
      }, 10000);
      var storage = setInterval(() => {
          this.Internal_storage();
        if (this.value == false) {
          clearInterval(storage);
        }
      }, 3000);
    }
  },
  beforeDestroy(){
    this.value = false
}
};
</script>

<style>
</style>