<template>
  <div>
    <div class="model_type">
      <div class="type_title">抓拍引擎管理</div>
      <div
        style="
          display: flex;
          justify-content: right;
          padding-right: 20px;
          padding-bottom: 10px;
        "
      >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="AddCapture_engines"
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
        <el-table-column label="名称" style="width: 10%">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="引擎地址" style="width: 30%">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column label="版本号" style="width: 3%">
          <template slot-scope="scope">
            {{ scope.row.version }}
          </template>
        </el-table-column>

        <el-table-column label="进程数" style="width: 3%">
          <template slot-scope="scope">
            {{ scope.row.process_number }}
          </template>
        </el-table-column>
        <el-table-column label="描述" style="width: 20%">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width: 37%">
          <template slot-scope="scope">
            <a style="color: #409eff; margin-right: 10px" 
            >连接测试</a
          >
          <a style="color: #409eff; margin-right: 10px" @click="edit_capture(scope.row.uuid)"
            >编辑</a
          >
          <a style="color: #409eff" @click="delete_capture(scope.row.uuid)">删除</a>
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
import { GetEngineCapture,RemoveEngineCapture } from "@/api/system";
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
    this.getEngineCapture();
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    edit_capture(uuid) {
      this.$router.push({ path: "/system/capture/edit", query: { uuid: uuid }})
    },
    getEngineCapture() {
      GetEngineCapture().then((res) => {
        this.tableData = res.data.content.array;
      });
    },
    AddCapture_engines() {
      this.$router.push({ path: "/system/capture/create" });
    },
    submitForm() {
      // 在这里执行表单提交逻辑
      // 可以将表单数据发送到后端进行保存或执行其他操作
      // 表单提交完成后，可以关闭弹出框
      this.showDialog = false;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
    },
    delete_capture(uuid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const request = {
            uuid_array: uuid,
          };
          RemoveEngineCapture(request).then((res) => {
            if(res.data.status == "SUCCESS"){
              this.$message({
            type: "success",
            message: "删除成功!",
          });
            this.getEngineCapture();
            }else{
              this.$message({
            type: "error",
            message: "删除失败!",
          });
            }
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
