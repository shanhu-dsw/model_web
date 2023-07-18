<template>
  <div>
    <div class="steps">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="绑定房间"></el-step>
        <el-step title="监控配置"></el-step>
        <el-step title="完成创建"></el-step>
      </el-steps>
    </div>

    <div class="create_box" v-show="create_first">
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
          新增房间
        </div>
      </div>
      <div style="margin-bottom: 20px">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="140px"
          style="padding: 20px 0; height: 100%"
        >
          <el-form-item
            label="引擎"
            :rules="rules.capture_uuid"
            prop="capture_uuid"
          >
            <el-select
              v-model="form.capture_uuid"
              placeholder="请选择抓拍引擎"
              style="width: 80%"
            >
              <el-option
                v-for="item in capture_list"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="房间类型"
            :rules="rules.type_uuid"
            prop="type_uuid"
          >
            <el-select
              v-model="form.type_uuid"
              placeholder="请选择房间类型"
              style="width: 80%"
            >
              <el-option
                v-for="item in LocationType"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" :rules="rules.name" prop="name">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="标识码" :rules="rules.code" prop="code">
            <el-input v-model="form.code" style="width: 65%"> </el-input>
            <el-button type="primary" style="width: 15%" @click="random"
              >随机生成</el-button
            >
          </el-form-item>
          <el-form-item
            label="摄像头"
            :rules="rules.cameras_form"
            prop="cameras_form"
          >
            <el-select
              v-model="form.cameras_form"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 80%"
            >
              <el-option
                v-for="item in CameraList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="模型绑定"
            :rules="rules.model_form"
            prop="model_form"
          >
            <el-select
              v-model="form.model_form"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod2"
              :loading="loading2"
              style="width: 65%"
            >
              <el-option
                v-for="item in ModelList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              >
              </el-option>
            </el-select>
            <el-button type="primary" style="width: 15%" @click="model_binding"
              >编辑模型参数</el-button
            >
            <!-- <div
              style="
                width: 80%;
                border: 1px solid #dcdfe6;
                display: flex;
                flex-wrap: wrap;
              "
            >
              <div
                v-for="box in model_list"
                :key="box.id"
                style="
                  height: 40px;
                  background: #3f74f9;
                  margin: auto 10px;
                  padding: 0 10px;
                  border-radius: 3px;
                  color: #fff;
                "
              >
                {{ box.name }}
              </div>
              <el-button
                style="background: black; color: #fff; margin: 5px"
                @click="model_binding"
                >+</el-button
              >
            </div> -->
          </el-form-item>
          <el-form-item label="是否启用" :rules="rules.status" prop="status">
            <el-switch
              v-model="model_status"
              active-color="#1890FF"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div
          style="display: flex; justify-content: right; padding: 0 50px 20px 0"
        >
          <el-button type="primary" style="" @click="submit">提交</el-button>
          <el-button type="primary" style="" @click="next">下一步</el-button>
        </div>
      </div>
    </div>
    <cameras_deploy
      ref="cameras_deploy"
      :deploy_show="deployShowValue"
      :cameras_list="cameras_form"
      :model_list="model_form"
      @parameter-updated="handleParameter"
    />
    <ModelParameter ref="ModelParameter"></ModelParameter>
    <!-- 调用弹出框组件 -->
    <!-- <LocationModal
      ref="locationModal"
      @selection-changed="handleSelectionChanged"
    /> -->
  </div>
</template>

<script>
import {
  GetLocationType,
  AddLocation,
  AddLocationCamera,
  AddLocationModel,
  GetLocationModel
} from "@/api/location";
import { GetEngineCapture } from "@/api/system";
import { GetCamera } from "@/api/camera";
import { GetmodelList } from "@/api/model";
import ModelParameter from "@/components/LocationModal/mode_parameter.vue";
import cameras_deploy from "@/components/LocationModal/cameras_deploy.vue";
export default {
  components: {
    ModelParameter,
    cameras_deploy,
  },
  data() {
    return {
      form: {
        capture_uuid: "",
        type_uuid: "",
        name: "",
        code: "",
        status: "ENABLE",
        cameras_form: [],
        model_form: [],
      },
      model_status: true,
      create_first: true,
      active: 0,
      deployShowValue: false,
      cameras_form: [],
      model_form: [],
      is_mark: 0,
      list: [],
      list2: [],
      capture_list: [],
      LocationType: [],
      CameraList: [],
      ModelList: [],
      loading: false,
      loading2: false,
      rules: {
        capture_uuid: [
          { required: true, message: "请选择引擎", trigger: "blur" },
        ],
        type_uuid: [
          { required: true, message: "请选择房间类型", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入标识码", trigger: "blur" }],
        cameras_form: [
          { required: true, message: "请选择摄像头", trigger: "blur" },
        ],
        model_form: [
          { required: true, message: "请选择模型", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择是否启用", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.list = this.CameraList.map((item) => {
      return { value: `${item.uuid}`, label: `${item.name}` };
    });
    this.list2 = this.ModelList.map((item) => {
      return { value: `${item.uuid}`, label: `${item.name}` };
    });
  },
  created() {
    this.random();
    this.getEngineCapture();
    this.getLocationType();
    this.getCamera();
    this.getmodelList();
  },
  methods: {
    back_list() {
      this.$router.push({ path: "/resource/location/index" });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.CameraList = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.CameraList = [];
      }
    },
    remoteMethod2(query) {
      if (query !== "") {
        this.loading2 = true;
        setTimeout(() => {
          this.loading = false;
          this.ModelList = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.ModelList = [];
      }
    },
    model_binding() {
      const model_list = this.ModelList.filter((item, index) => {
        return item.uuid == this.form.model_form[index];
      });
      this.$refs.ModelParameter.showModal2(model_list); // 调用子组件的方法显示弹出框
    },
    next() {
      console.log(this.form.model_form)
      console.log(this.form.cameras_form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.active++;
          if (this.active > 0) {
            this.create_first = false;
            this.cameras_form = this.CameraList.filter((item, index) => {
              return item.uuid == this.form.cameras_form[index];
            });
            this.model_form = this.ModelList.filter((item, index) => {
              return item.uuid == this.form.model_form[index];
            });
            this.create_first = false;
              this.$refs.cameras_deploy.showModal(this.cameras_form, this.model_form); // 调用子组件的方法显示弹出框              
          }
        }
      });
    },
    getEngineCapture() {
      GetEngineCapture().then((res) => {
        console.log(res);
        this.capture_list = res.data.content.array;
      });
    },
    getLocationType() {
      GetLocationType().then((res) => {
        this.LocationType = res.data.content.array;
      });
    },
    getCamera() {
      GetCamera().then((res) => {
        this.CameraList = res.data.content.array;
      });
    },
    getmodelList() {
      GetmodelList().then((res) => {
        this.ModelList = res.data.content.array;
      });
    },
    handleParameter(parameter) {
      console.log(parameter);
      this.create_first = parameter;
      this.deployShowValue = false;
      this.active--;
    },
    random() {
      //随机生成八位的字符串，要含有两个大写英文
      var str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var pwd = "";
      for (var i = 0; i < 8; i++) {
        pwd += str.charAt(Math.floor(Math.random() * str.length));
      }
      this.form.code = pwd;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.model_status) {
            this.form.status = "DISABLED";
          }
          AddLocation(this.form).then((res) => {
            if (res.data.status == "SUCCESS") {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              if (this.form.cameras_form) {
                for (let i = 0; i < this.form.cameras_form.length; i++) {
                  const request = {
                    location_uuid: res.data.content.uuid,
                    camera_uuid: this.form.cameras_form[i],
                    is_mark: this.is_mark,
                  };
                  AddLocationCamera(request);
                }
              }
              if (this.form.model_form) {
                console.log(this.form.model_form)
                for (let i = 0; i < this.form.model_form.length; i++) {
                  const model_list = this.ModelList.filter((item) => {
                    return item.uuid == this.form.model_form[i];
                  });
                  console.log(model_list)
                  const request = {
                    location_uuid: res.data.content.uuid,
                    model_uuid: this.form.model_form[i],
                    tolerance_time: model_list[0].tolerance_time,
                    merge_time: model_list[0].merge_time,
                    threshold: model_list[0].threshold,
                    confidence: model_list[0].confidence,
                  };
                  console.log(request)
                  AddLocationModel(request);
                }
              }
              this.$router.push({ path: "/resource/location/index" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.steps {
  width: 80%;
  margin: 0 auto;
  padding-top: 40px;
}

.create_box {
  width: 60%;
  background: #fff;
  margin: 40px auto;
}
.create_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  /* justify-content: center; */
  border-bottom: 1px solid #e9ebf6;
}
.submit_form {
  height: 40px;
  width: 80px;
  margin-right: 20px;
  margin-top: 5px;
}
</style>
