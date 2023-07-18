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
        预警详情
      </div>
    </div>
    <div class="cameras_body">
      <div style="width:40%;background: #FFF;margin-right: 20px;padding-bottom: 50px;">
      <div class="data_title">
        <div style="font-size: 20px; font-weight: bold;text-align: center;margin: 20px 0;">预警信息</div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;text-align: left;">房间</span>
          <div class="camera_data">
            {{ cameras[0].name }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">预警模型</span>
          <div class="camera_data">
            {{ cameras[0].code }}
          </div>
        </div>
        <div class="camera_box" >
          <span style="line-height:40px;height: 40px;width: 100px;">发生时间</span>
          <div class="camera_data">
            {{ cameras[0].address }}
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
export default {
  data(){
    return{
      cameras:[
        {
          name:"摄像头1",
          code: "3709214586954156",
          address: "rtsp://admin:jnga12345@192.168.10.171:554",
          status:"在线",
          protocol_type: "直连",
          longitude: "",
          latitude: "",
          create_time: "2023年05月08日 13时05分",
          last_capture_time: "2023年05月08日 13时05分",
          extend: "",
        }
      ]
    }
  },
  methods:{
    back_list(){
      this.$router.push({path:'/location_events/index'})
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