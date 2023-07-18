<template>
    <div>
      <div class="create_box">
        <div class="create_title">
          <a style="color: #6e789a; padding-left: 20px" @click="back_list"
            >返回</a
          >
          <div style="font-size: 20px; font-weight: bold">编辑识别引擎</div>
          <el-button type="primary" size="" class="submit_form" @click="modifyEngineVision">提交</el-button>
        </div>
        <div style="margin-bottom: 20px">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="140px"
            style="padding: 20px 0; height: 100%"
          >
          <el-form-item label="抓拍引擎" :rules="rules.capture_uuid" prop="capture_uuid">
            <el-select v-model="form.capture_uuid" placeholder="请选择抓拍引擎" style="width:80%">
              <el-option v-for="item in capture_list" :key="item.uuid" :label="item.name" :value="item.uuid"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="名称" :rules="rules.name" prop="name">
              <el-input v-model="form.name" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="抓拍引擎地址" :rules="rules.url" prop="url">
              <el-input v-model="form.url" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="版本号" :rules="rules.version" prop="version">
              <el-input v-model="form.version" style="width: 80%"></el-input>
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
    import { GetEngineCapture,GetEngineVision,ModifyEngineVision} from '@/api/system';
  export default {
    data() {
      return {
        form: {
          capture_uuid:"",
          name: "",
          url: "",
          version: "",
          description: "",
        },
        uuid: "",
        capture_list:[],
        rules: {
          capture_uuid:[
            { required: true, message: "请选择抓拍引擎", trigger: "blur"}
          ],
          name: [
            { required: true, message: "请输入名称", trigger: "blur" },
          ],
          url: [
            { required: true, message: "请输入抓拍引擎地址", trigger: "blur" },
          ],
          version: [
            { required: true, message: "请输入版本号", trigger: "blur" },
          ],
          description: [
            { required: false, message: "请输入描述", trigger: "blur" },
          ],
        },
      };
    },
    created(){
      this.getEngineCapture()
      this.uuid = this.$route.query.uuid
      this.getEngineVision()
    },
    methods: {
      back_list() {
        this.$router.push({ path: "/system/vision/index" });
      },
      getEngineCapture(){
        GetEngineCapture().then((res) => {
          if (res.data.status == "SUCCESS") {
            this.capture_list = res.data.content.array
            console.log(this.capture_list)
          }
        });
      },
      getEngineVision(){
        const request = {
          uuid_array: this.uuid,
        };
        GetEngineVision(request).then((res) => {
          if (res.data.status == "SUCCESS") {
            this.form = res.data.content.array[0]
          }
        });
      },
      modifyEngineVision(){
        this.$refs["form"].validate((valid) => {
        if(valid){
          ModifyEngineVision(this.form).then((res) => {
            if (res.data.status == "SUCCESS") {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.$router.push({ path: "/system/vision/index" });
            } else {
              this.$message({
                message: "修改失败",
                type: "error",
              });
            }
          });
        }
        else{
          return false
        }
        })
      }
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