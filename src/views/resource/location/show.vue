<template>
  <div>
    <div class="create_box">
      <div class="create_title">
        <a style="color: #6e789a; padding-left: 20px" @click="back_list"
          >返回</a
        >
        <div
          style="
            font-size: 20px;
            font-weight: bold;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
        房间详情
        </div>
      </div>
      <div
        style="margin-bottom: 20px; color: #6e789a; padding: 0 50px 20px 50px"
      >
        <div style="padding: 20px 0; height: 100%">
          <div style="display: flex">
            <div style="line-height: 40px; width: 80px">引擎</div>
            <div class="camera_data"> {{ location.capture_name }} </div>
          </div>
        </div>
        <div style="padding: 20px 0; height: 100%">
          <div style="display: flex">
            <div style="line-height: 40px; width: 80px">房间类型</div>
            <div class="camera_data"> {{ location.type_name }} </div>
          </div>
        </div>
        <div style="padding: 20px 0; height: 100%">
          <div style="display: flex">
            <div style="line-height: 40px; width: 80px">名称</div>
            <div class="camera_data"> {{ location.name }} </div>
          </div>
        </div>
        <div style="padding: 20px 0; height: 100%">
          <div style="display: flex">
            <div style="line-height: 40px; width: 80px">标识码</div>
            <div class="camera_data"> {{ location.code }} </div>
          </div>
        </div>
        <div style="padding: 20px 0; height: 100%">
          <div style="display: flex">
            <div style="line-height: 40px; width: 80px">摄像头</div>
            <div class="camera_data">
              <el-button 
              type="primary"
              v-for="item in location_camera"
              :key="item.uuid"
              style="background: #3f74f9;"
              >
              {{ item.camera_name ? item.camera_name : "暂无" }}
            </el-button>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0; height: 100%">
          <div style="display: flex">
            <div style="line-height: 40px; width: 80px">所用模型</div>
            <div class="camera_data">
              <el-button type="primary"
                v-for="item in location_model"
                :key="item.uuid"
                @click="showModal2" 
                style="background: #3f74f9;">
                {{ item.model_name ? item.model_name : "暂无" }}
              </el-button>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0; height: 100%">
          <div style="display: flex">
            <div style="line-height: 40px; width: 80px">是否启用</div>
            <div class="camera_data"> {{ location.status }} </div>
          </div>
        </div>
      </div>
      <ModelShow ref="ModelShow"></ModelShow>
    </div>
  </div>
</template>

<script>
import { GetLocation,GetLocationModel,GetLocationCamera } from "@/api/location.js";
import ModelShow from "@/components/LocationModal/mode_show.vue";
export default {
  data() {
    return {
      uuid: "",
      location:[],
      location_camera:[],
      location_model:[]
    };
  },
  components: {
    ModelShow,
  },
  mounted() {
    this.uuid = this.$route.query.uuid;
    this.getLocation();
    this.getLocationCamera();
    this.getLocationModel();
    console.log(this.$route.query);
  },
  methods: {
    getLocation(){
      const request = {
        uuid_array: this.uuid,
      };
      GetLocation(request).then(res=>{
        this.location = res.data.content.array[0]
      })
    },
    getLocationCamera(){
      const request = {
        location_uuid_array: this.uuid,
      };
      GetLocationCamera(request).then(res=>{
        this.location_camera = res.data.content.array
      })
    },
    getLocationModel(){
      const request = {
        location_uuid_array: this.uuid,
      };
      GetLocationModel(request).then(res=>{
        this.location_model = res.data.content.array
      })
    },
    back_list() {
      this.$router.push({ path: "/resource/location/index" });
    },
    showModal2() {
      this.$refs.ModelShow.showModal2(this.location);
    },
  },
};
</script>

<style>
.create_box {
  width: 60%;
  background: #fff;
  margin: 40px auto;
}
.create_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e9ebf6;
}
.submit_form {
  height: 40px;
  width: 80px;
  margin-right: 20px;
  margin-top: 5px;
}
.camera_data {
  width: 80%;
  height: 40px;
  line-height: 40px;
  background: #fafbfc;
  border: 1px solid #c0d2e2;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
