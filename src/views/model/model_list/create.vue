<template>
  <div>
    <div class="create_box">
      <div class="create_title">
        <a style="color: #6e789a; padding-left: 20px" @click="back_list"
          >返回</a
        >
        <div style="font-size: 20px; font-weight: bold">新增模型</div>
        <el-button
          type="primary"
          size=""
          class="submit_form"
          @click="addmodeList"
          >提交</el-button
        >
      </div>
      <div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="140px"
          style="margin: 20px 0"
        >
          <el-form-item
            label="基础模型"
            :rules="rules.event_id"
            prop="event_id"
          >
            <el-select
              v-model="form.event_id"
              placeholder="请选择基础模型"
              style="width: 80%"
            >
              <el-option
                v-for="item in event_id"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" :rules="rules.name" prop="name">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="类型" :rules="rules.type_uuid" prop="type_uuid">
            <el-select
              v-model="form.type_uuid"
              placeholder="请选择模型类型"
              style="width: 80%"
            >
              <el-option
                v-for="item in model_type"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="描述"
            :rules="rules.description"
            prop="description"
          >
            <el-input
              type="textarea"
              v-model="form.description"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模型示例附件"
            :rules="rules.model_file"
            prop="model_file"
          >
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img :src="dialogImageUrl" class="dialog-image" alt="Preview" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="是否启用" :rules="rules.status" prop="status">
            <el-select
              v-model="form.status"
              placeholder="请选择是否启用"
              style="width: 80%"
            >
              <el-option label="启用" value="ENABLE"></el-option>
              <el-option label="禁用" value="DISABLED"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序编号" :rules="rules.order" prop="order">
            <el-input v-model="form.order" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item
            label="容忍时间"
            :rules="rules.tolerance_time"
            prop="tolerance_time"
          >
            <el-input
              v-model="form.tolerance_time"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="合并时间"
            :rules="rules.merge_time"
            prop="merge_time"
          >
            <el-input v-model="form.merge_time" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="阈值" :rules="rules.threshold" prop="threshold">
            <el-input v-model="form.threshold" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item
            label="置信度"
            :rules="rules.confidence"
            prop="confidence"
          >
            <el-input
              v-model="form.confidence"
              style="width: 80%; margin-bottom: 40px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { GetmodelType, AddmodelList } from "@/api/model";
export default {
  data() {
    return {
      form: {
        event_id: "",
        name: "",
        type_uuid: "",
        description: "",
        status: "",
        order: "",
        tolerance_time: "",
        merge_time: "",
        threshold: "",
        confidence: "",
        text: "123",
        attach:[]
      },
      imageList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      model_type: [],
      event_id: [
        {
          name: "服务岗位脱空岗",
          id: "1",
        },
        {
          name: "值班岗位脱空岗",
          id: "2",
        },
        {
          name: "未戴口罩",
          id: "3",
        },
        {
          name: "单人训询问",
          id: "4",
        },
        {
          name: "人员聚集",
          id: "5",
        },
        {
          name: "人员攀高",
          id: "6",
        },
        {
          name: "人员倒地",
          id: "7",
        },
        {
          name: "闯入禁区",
          id: "8",
        },
        {
          name: "进入武器库",
          id: "9",
        },
        {
          name: "单人进入武器库",
          id: "10",
        },
        {
          name: "检查站-单人拦检",
          id: "11",
        },
        {
          name: "检查站-无人引导分流",
          id: "12",
        },
        {
          name: "检查站-无人执勤",
          id: "13",
        },
        {
          name: "检查站-未穿戴反光背心",
          id: "14",
        },
        {
          name: "检查站-车辆拥堵",
          id: "15",
        },
      ],
      rules: {
        event_id: [
          { required: true, message: "请选择基础模型", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type_uuid: [
          { required: true, message: "请选择模型类型", trigger: "change" },
        ],
        description: [
          { required: false, message: "请输入描述", trigger: "blur" },
        ],
        model_file: [
          { required: false, message: "请上传模型示例附件", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择是否启用", trigger: "change" },
        ],
        order: [{ required: true, message: "请输入排序编号", trigger: "blur" }],
        tolerance_time: [
          { required: true, message: "请输入容忍时间", trigger: "blur" },
        ],
        merge_time: [
          { required: true, message: "请输入合并时间", trigger: "blur" },
        ],
        threshold: [{ required: true, message: "请输入阈值", trigger: "blur" }],
        confidence: [
          { required: true, message: "请输入置信度", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getmodelType();
  },
  methods: {
    getmodelType() {
      GetmodelType()
        .then((res) => {
          this.model_type = res.data.content.array;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // handleUpload(event) {
    //   console.log(event)
    //   const file = event.url;
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     const base64Data = reader.result;
    //     // 在这里可以使用 base64Data 进行后续操作，比如存储到变量或发送到服务器等
    //     console.log(base64Data);
    //   };
    //   reader.readAsDataURL(file);
    // },
    handleUpload(event) {
      const imageUrl = event.url;
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = reader.result;
        const title = "模型示例"
        const description = "模型示例"
        const request = { data, title , description};
        this.form.attach.push(request);
        // 在这里可以使用 base64Data 进行后续操作，比如存储到变量或发送到服务器等
        console.log(this.form);
      };
      reader.readAsDataURL(blob);
    });
    },
    handlePreview(image) {
      this.dialogImageUrl = image.url;
      this.dialogVisible = true;
    },
    handleRemove(index) {
      this.imageList.splice(index, 1);
    },
    addmodeList() {
      console.log(this.imageBase64);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              AddmodelList(this.form).then((res) => {
                if (res.data.status == "SUCCESS") {
                  this.$message({
                    type: "success",
                    message: "提交成功!",
                  });
                  this.$router.push({ path: "/model/model_list/index" });
                } else {
                  this.$message({
                    type: "info",
                    message: res.data.attach,
                  });
                }
              });
            })
            .catch((error) => {
              this.$message({
                type: "info",
                message: error,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back_list() {
      this.$router.push({ path: "/model/model_list/index" });
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
