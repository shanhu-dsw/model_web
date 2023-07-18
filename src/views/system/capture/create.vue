<template>
  <div>
    <div class="create_box">
      <div class="create_title">
        <a style="color: #6e789a; padding-left: 20px" @click="back_list"
          >返回</a
        >
        <div style="font-size: 20px; font-weight: bold">新增抓拍引擎</div>
        <el-button type="primary" size="" class="submit_form" @click="addEngineCapture">提交</el-button>
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
          <el-form-item label="抓拍引擎地址" :rules="rules.url" prop="url">
            <el-input v-model="form.url" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="版本号" :rules="rules.version" prop="version">
            <el-input v-model="form.version" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="进程数" :rules="rules.process_number" prop="process_number">
            <el-input v-model="form.process_number" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="描述" :rules="rules.description" prop="description">
            <el-input
              type="textarea"
              v-model="form.description"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { AddEngineCapture } from '@/api/system';
export default {
  data() {
    return {
      form: {
        name: "",
        url: "",
        version: "",
        process_number: "",
        description: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入抓拍引擎地址", trigger: "blur" }],
        version: [{ required: true, message: "请输入版本号", trigger: "blur" }],
        process_number: [
          { required: true, message: "请输入进程数", trigger: "blur" },
        ],
        description: [{ required: false, message: "请输入描述", trigger: "blur" }],
      },
    };
  },
  methods: {
    addEngineCapture(){
      this.$refs["form"].validate((valid) => {
      if(valid){
        AddEngineCapture(this.form).then(res => {
          if(res.data.status == "SUCCESS"){
            this.$message({
              message: "新增成功",
              type: "success",
            });
            this.$router.push({ path: "/system/capture/index" });
          }
        })
      }
      })
    },
    back_list() {
      this.$router.push({ path: "/system/capture/index" });
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
</style>