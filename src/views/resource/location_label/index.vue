<template>
  <div>
    <div class="model_type">
      <div class="type_title">标注列表</div>
      <div
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
      </div>
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
        <el-table-column label="房间" style="width: 15%">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="监控" style="width: 5%">
          <template slot-scope="scope">{{ scope.row.type_name }}</template>
        </el-table-column>
        <el-table-column label="模型" style="width: 5%">
          <template slot-scope="scope">
            {{ scope.row.cameras_number }}
          </template>
        </el-table-column>

        <el-table-column label="标注信息" style="width: 25%">
          <template slot-scope="scope">
            {{ scope.row.model_name ? scope.row.model_name : "未绑定模型" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width: 37%">
          <template slot-scope="scope">
            <a style="color: #409eff" @click="delete_location(scope.row.uuid)"
              >标注</a
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
  ModifyLocation,
  RemoveLocation,
} from "@/api/location";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      currentPage: 1,
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
            message: "获取房间列表失败!",
          });
        }
      });
    },
    getLocationModel() {  
      const uuid_array = this.tableData.map((item) => item.uuid);
      const uuid_string = uuid_array.join(";");
      console.log(uuid_string);
      const request = {
        location_uuid_array: uuid_string,
      };
        GetLocationModel(request).then((res) => {
          const models = res.data.content.array; // 假设接口返回的模型数据为一个数组
          this.tableData.forEach((location,index) => {
            const matchingModels = models.filter(
              (model) => model.location_uuid === location.uuid
            );
            if (matchingModels.length > 0) {
              // 找到匹配的模型数据
              // 在这里可以根据需要进行处理
              location.model_name = matchingModels[0].model_name;
        console.log(location.model_name)
            } 
          });
        });
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
</style>
