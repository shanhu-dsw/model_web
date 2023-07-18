<template>
  <div>
    <div class="create_title">
      <a style="color: #6e789a; padding-left: 20px" @click="back_list">返回</a>
      <div
        style="
          font-size: 20px;
          font-weight: bold;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;">
        监控详情
      </div>
    </div>
    <div class="cameras_body">
      <div style="width:40%;background: #FFF;margin-right: 20px;padding-bottom: 50px;">
      <div class="data_title">
        <div style="font-size: 20px; font-weight: bold;text-align: center;margin: 20px 0;">基本信息</div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;text-align: left;">名称</span>
          <div class="camera_data">
            {{ cameras[0].name }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">标识码</span>
          <div class="camera_data">
            {{ cameras[0].code }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">监控地址</span>
          <div class="camera_data">
            {{ cameras[0].url }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">状态</span>
          <div class="camera_data">
            {{ cameras[0].status }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">连接类型</span>
          <div class="camera_data">
            {{ cameras[0].protocol_type }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">经度</span>
          <div class="camera_data">
            {{ cameras[0].lng }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">纬度</span>
          <div class="camera_data">
            {{ cameras[0].lat }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">创建时间</span>
          <div class="camera_data">
            {{ cameras[0].create_datetime }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">最新抓拍时间</span>
          <div class="camera_data">
            {{ cameras[0].last_capture_time }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">平台扩展参数</span>
          <div class="camera_data">
            {{ cameras[0].platform_extend_parameter }}
          </div>
        </div>
      </div>
      </div>
      <div style="width:40%;background: #FFF;padding-bottom: 50px;">
        <div class="data_title">
          <div style="font-size: 20px; font-weight: bold;text-align: center;margin: 20px 0;">最新抓拍 </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { GetCamera } from "@/api/camera";
export default {
  data(){
    return{
      cameras:[
        {
          name:"",
          code: "",
          url: "",
          status:"",
          protocol_type: "",
          lng: "",
          lat: "",
          create_time: "",
          create_datetime: "",
          platform_extend_parameter: "",
        },
      ],
      uuid:"",
    }
  },
  mounted(){
    this.uuid = this.$route.query.uuid
    console.log(this.$route.query.uuid)
    this.getcamera()
  },
  methods:{
    back_list(){
      this.$router.push({path:'/resource/cameras/index'})
    },
    getcamera(){
      const request = {
        uuid_array: this.uuid,
      }
      GetCamera(request).then(res=>{
        this.cameras = res.data.content.array
      })
    }
  },
};
</script>

<style>
.create_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  width: 100%;
  background: #FFF;
  margin: 60px 0 30px 0;
  /* border-bottom: 1px solid #e9ebf6; */
}
.cameras_body{
  display: flex;
  width: 100%;
  justify-content: center;
  /* height: 100%; */
  /* background: #FFF; */
}
.camera_box{
  display: flex;
  margin: 0px 0 20px 20px;
  color: #545E75;
}
.camera_data{
  width: 80%;
  height: 40px;
  line-height: 40px;
  background: #FAFBFC;
  border: 1px solid #C0D2E2;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>