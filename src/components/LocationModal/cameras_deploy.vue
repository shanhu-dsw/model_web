<template>
  <div class="create_box" v-show="showDialog">
    <div class="create_title">
     <a style="color: #6e789a; padding-left: 20px" @click="back_list">返回</a>
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
        新增房间
      </div>
    </div>
    <div>
     <el-collapse accordion style="margin-bottom:30px">
        <div v-for="item in cameras_list" :key="item.uuid" style="display:flex;padding: 30px 10px;">
          <div style="margin-bottom:20px">
            <div style="margin-bottom:30px;color: #1890FF;border-bottom: 1px solid #1890FF;">
           {{ item.name }}
          </div>
          <img style="width:220px" src="../../assets/images/image_error.png" alt="Camera Image">
          </div>
        <el-table
        ref="multipleTable"
        :data="model_list"
        tooltip-effect="dark"
        style="width: 60%; margin-left: 40px;height: 80%;"
      >
      <el-table-column label="识别模型" style="width:60%">
        <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
      </el-table-column>
      <el-table-column label="标注情况" style="width:20%"></el-table-column>
      <el-table-column label="区域标注" style="width:20%">
      <el-button type="text" @click="showModelArea">标注</el-button>
      </el-table-column>
      
    </el-table>
        <!-- <div @click="showModelArea" v-for="box in model_list" :key="box.id" style="height:30px;line-height:30px;background: #3F74F9;margin: auto 10px;padding: 0 10px;border-radius: 3px;color: #FFF;">
                {{ box.name }}
              </div> -->
        <!-- <div @click="showModelArea">{{ item.value }}</div> -->
        </div>
       
      </el-collapse>
     <div
        style="
          display: flex;
          justify-content: space-around;
          padding: 0 50px 20px 0;
        "
      >
        <el-button type="primary" @click="last">上一步</el-button>
        <el-button type="primary" style="" @click="next">提交</el-button>
      </div>
    </div>
    <ModelArea ref="ModelArea"></ModelArea>
  </div>
</template>

<script>
import ModelArea from "./model_area.vue"
export default {
  components: {
    ModelArea
  },
  props: {
    // deploy_show: {
    //   type: Boolean,
    //   required: true,
    // },
    // cameras_list: {
    //   type: Array,
    //   required: true,
    // },
    // model_list:{
    //   type: Array,
    //   required: true,
    // }
  },
  data() {
    return {
      showDialog: false,
      cameras_list:"",
      model_list:""
    };
  },
  mounted() {
    this.cameras_list = ""
    this.model_list = ""
    console.log(this.model_list);
  },
  methods: {
    showModal(cameras_list,model_list) {
      this.cameras_list = cameras_list;
      this.model_list = model_list;
      console.log(cameras_list,model_list);
      this.showDialog = true;
    },
    showModelArea(){
      this.$refs.ModelArea.showModal(); // 调用子组件的方法显示弹出框
    },
    last() {
      this.$emit("parameter-updated", true);
      this.showDialog = false;
    },
    next() {
      this.$router.push({ path: "/resource/location/index" });
    },
    back_list() {
      this.$router.push({ path: "/resource/location/index" });
    },
  },
};
</script>

<style>
.cameras_list {
  background: #e0eaff;
  margin: 15px;
}
</style>