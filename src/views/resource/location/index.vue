<template>
  <div>
    <div class="model_type">
      <div class="type_title">房间列表</div>
      <div class="list_filter">
        <div class="filter_left">
          <el-input
            v-model="locationname"
            style="width: 25%; margin-right: 20px"
            placeholder="请输入房间名称"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
          <el-select
            style="margin-right: 20px"
            v-model="Typevalue"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in locationType"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="base_value"
            placeholder="请选择模型"
            style="margin-right: 20px"
          >
            <el-option
              v-for="item in base_model"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="filter_right">
          <el-button type="primary" icon="el-icon-plus" @click="Addlocations()"
          >新增</el-button>
        </div>
      </div>
      <!-- <div
        style="
          display: flex;
          justify-content: right;
          padding-right: 20px;
          padding-bottom: 10px;
        "
      >
        <el-button style="background: #07b9b9; color: #fff">导入</el-button>
        <el-button style="background: #ffc300; color: #fff">导出</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="Addlocations()"
          >新增</el-button
        >
      </div> -->
      <el-table
        :border="true"
        ref="multipleTable"
        :data="displayedData"
        tooltip-effect="dark"
        style="width: 95%; margin-left: 40px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" style="width: 3%"> </el-table-column>
        <el-table-column label="标识码" style="width: 10%">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column label="名称" style="width: 15%">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="类型" style="width: 5%">
          <template slot-scope="scope">{{ scope.row.type_name }}</template>
        </el-table-column>
        <el-table-column label="设备数量" style="width: 5%">
          <template slot-scope="scope">
            {{ scope.row.cameras_number }}
          </template>
        </el-table-column>

        <el-table-column label="已绑定模型" style="width: 25%">
  <template slot-scope="scope">
    <template v-if="scope.row.model_list && scope.row.model_list.length > 0">
      <template v-for="item in scope.row.model_list">
        <el-tag
              style="background: #202121; color: #ffff; border-radius: 5px"
              >{{ item.model_name }}</el-tag>
      </template>
    </template>
    <template v-else>
      <span>未绑定模型</span>
    </template>
  </template>
</el-table-column>
        <el-table-column label="操作" style="width: 37%">
          <template slot-scope="scope">
            <a
              style="color: #409eff; margin-right: 10px"
              @click="location_detail(scope.row.uuid)"
              >详情</a
            >
            <a
              style="color: #409eff; margin-right: 10px"
              @click="redact_location(scope.row.uuid)"
              >编辑</a
            >
            <a style="color: #409eff" @click="delete_location(scope.row.uuid)"
              >删除</a
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加分页组件 -->
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        prev-text="上一页"
        next-text="下一页"
        style="padding: 20px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  GetLocation,
  GetLocationModel,
  GetLocationType,
  ModifyLocation,
  RemoveLocation,
} from "@/api/location";
import { GetmodelList } from "@/api/model";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      currentPage: 1,
      locationname: "",
      Typevalue:"",
      locationType:[],
      base_value:"",
      base_model:[],
    };
  },
  computed: {
    displayedData() {
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      return this.tableData.slice(startIndex, endIndex);
    },
  },
  created() {
    this.getLocation();
    this.getLocationType();
    this.getmodelList();
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    location_detail(uuid) {
      this.$router.push({ path: "/resource/location/show", query: { uuid } });
    },
    Addlocations() {
      this.$router.push({ path: "/resource/location/create" });
    },
    redact_location(uuid) {
      this.$router.push({ path: "/resource/location/edit" , query: { uuid } });
    },
    getLocation() {
      const request = {
        offset: 0,
        rows: 10,
      };
      GetLocation().then((res) => {
        if (res.data.status == "SUCCESS") {
          this.tableData = res.data.content.array;
          this.getLocationModel();
        } else {
          this.$message({
            type: "error",
            message: "获房间列表失败!",
          });
        }
      });
    },
    getLocationType(){
      GetLocationType().then(res=>{
        if(res.data.status == "SUCCESS"){
          this.locationType = res.data.content.array;
        }else{
          this.$message({
            type: "error",
            message: "获房间类型失败!",
          });
        }
      })
    },
    getmodelList(){
      GetmodelList().then(res=>{
        this.base_model = res.data.content.array;
      })
    },
    search(){
      const request = {}
      if(this.locationname !== ""){
        request.name_like = this.locationname
      }
      if(this.Typevalue !== ""){
        request.type_uuid_array = this.Typevalue
      }
      if(this.base_value !== ""){
        request.model_uuid_array = this.base_value
      }
      GetLocation(request).then(res=>{
        if(res.data.status == "SUCCESS"){
          this.tableData = res.data.content.array;
          this.getLocationModel();
        }else{
          this.$message({
            type: "error",
            message: "获房间列表失败!",
          });
        }
      })
    },
    getLocationModel() {
      // const uuid_array = this.tableData.map((item) => item.uuid);
      // const uuid_string = uuid_array.join(";");
      // console.log(uuid_string);
      // const request = {
      //   location_uuid_array: uuid_string,
      // };
      for(let i= 0;i < this.tableData.length;i++){
        const request = {
          location_uuid_array: this.tableData[i].uuid,
        };
        GetLocationModel(request).then((res) => {
          console.log(res)
          this.tableData[i].model_list = res.data.content.array;
          console.log(this.tableData[i])
        });
      }
        // GetLocationModel(request).then((res) => {
        //   const models = res.data.content.array; // 假设接口返回的模型数据为一个数组
        //   this.tableData.forEach((location,index) => {
        //     const matchingModels = models.filter(
        //       (model) => model.location_uuid == location.uuid
        //     );
        //     if (matchingModels.length > 0) {
        //       // 找到匹配的模型数据
        //       // 在这里可以根据需要进行处理
        //       location.model_name = matchingModels[0].model_name;
        //       console.log(matchingModels)
        //     } else {
        //       // 没有找到匹配的模型数据
        //       // 在这里可以根据需要进行处理
        //       console.log("No matching models found for location:", location);
        //     }
        //   });
        // });
    },
    submitForm() {
      // 在这里执行表单提交逻辑
      // 可以将表单数据发送到后端进行保存或执行其他操作
      // 表单提交完成后，可以关闭弹出框
      this.showDialog = false;
    },
    handleCurrentChange(page) {
      console.log(page)
      this.currentPage = page;
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
    },
    delete_location(uuid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const request = {
            uuid_array: uuid,
          };
          RemoveLocation(request).then((res) => {
            if (res.data.status == "SUCCESS") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getLocation();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.type_title {
  padding: 20px 0;
  margin-left: 50px;
  font-size: 24px;
  font-weight: bold;
  color: #5b6388;
}
.model_type {
  margin-top: 100px;
  margin: 100px 50px 20px 50px;
  background: #fff;
}

.list_filter {
  display: flex;
  padding: 0px 0px 30px 80px;
  width: 100%;
}
.filter_left {
width: 60%;
}
.filter_right{
  width: 40%;
}
</style>
