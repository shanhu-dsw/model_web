<template>
  <div>
    <div class="create_box">
      <div class="create_title">
        <a style="color: #6e789a; padding-left: 20px" @click="back_list"
          >返回</a
        >
        <div style="font-size: 20px; font-weight: bold">新增监控</div>
        <el-button type="primary" size="" class="submit_form" @click="addCamera"
          >提交</el-button
        >
      </div>
      <div style="margin-bottom: 20px">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="140px"
          style="padding: 20px 0; height: 100%"
        >
          <el-form-item label="名称" :rules="rules.name" prop="name">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="标识码" :rules="rules.code" prop="code">
            <el-input v-model="form.code" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="监控地址" :rules="rules.url" prop="url">
            <el-input v-model="form.url" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item
            label="协议类型"
            :rules="rules.protocol_type"
            prop="protocol_type"
          >
            <el-select
              v-model="form.protocol_type"
              placeholder="请选择协议类型"
              style="width: 80%"
            >
              <el-option
                v-for="item in ProtocolType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="连接类型"
            :rules="rules.connect_type"
            prop="connect_type"
          >
            <el-select
              v-model="form.connect_type"
              placeholder="请选择连接类型"
              style="width: 80%"
            >
              <el-option label="直连" value="DIRECT"></el-option>
              <el-option label="海康" value="HIKVISION"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经度" :rules="rules.lng" prop="lng">
            <el-input v-model="form.lng" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="纬度" :rules="rules.lat" prop="lat">
            <el-input v-model="form.lat" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item
            label="平台扩展参数"
            :rules="rules.platform_extend_parameter"
            prop="platform_extend_parameter"
          >
            <el-input
              type="textarea"
              v-model="form.platform_extend_parameter"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { AddCamera } from "@/api/camera";
export default {
  data() {
    return {
      form: {
        name: "",
        code: "",
        url: "",
        protocol_type: "",
        connect_type: "",
        lng: "",
        lat: "",
        platform_extend_parameter: "",
      },
      ProtocolType: [
        {
          name: "RTSP",
          id: "RTSP",
        },
        {
          name: "RTMP",
          id: "RTMP",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入标识码", trigger: "blur" }],
        url: [{ required: true, message: "请输入监控地址", trigger: "blur" }],
        protocol_type: [
          { required: true, message: "请选择协议类型", trigger: "blur" },
        ],
        connect_type: [
          { required: true, message: "请选择连接类型", trigger: "blur" },
        ],
        lng: [{ required: false, message: "请输入经度", trigger: "blur" }],
        lat: [{ required: false, message: "请输入纬度", trigger: "blur" }],
        platform_extend_parameter: [
          { required: false, message: "请输入平台扩展参数", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    back_list() {
      this.$router.push({ path: "/resource/cameras/index" });
    },
    addCamera() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          AddCamera(this.form).then((res) => {
            console.log(res);
            if (res.data.status == "SUCCESS") {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.$router.push({ path: "/resource/cameras/index" });
            } else {
              this.$message({
                message: res.data.attach,
                type: "error",
              });
            }
          });
        }else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.create_box {
  width: 100%;
  height: 100%;
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
</style>
