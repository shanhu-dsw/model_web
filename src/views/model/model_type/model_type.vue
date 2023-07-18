<template>
  <div>
    <div class="model_type">
      <div class="type_title">模型类型</div>
      <div style="display: flex; justify-content: right; padding-right: 20px">
        <el-button type="primary" icon="el-icon-plus" style="" @click="add_type"
          >新增</el-button
        >
      </div>
      <el-table
        :border="true"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 60%; margin-left: 40px; margin-bottom: 10px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="名称" width="300">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="操作" width="auto">
          <a style="color: #409eff; margin-right: 10px" @click="compile_type"
            >编辑</a
          >
          <a slot-scope="scope" style="color: #409eff" @click="delete_type(scope.row.uuid)">删除</a>
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
        style="margin: 40px 0"
      >
      </el-pagination>
      <!-- 添加弹出框组件 -->
      <el-dialog
        title="新增模型类型"
        :visible="showDialog"
        @close="showDialog = false"
        center
      >
        <!-- 表单内容 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="模型类型">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="排序编号">
            <el-input v-model="form.order" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <!-- ... -->
        <div
          slot="footer"
          class="dialog-footer"
          style="display: flex; justify-content: right"
        >
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </div>
      </el-dialog>
      <ModeltypeCompile ref="ModeltypeCompile"></ModeltypeCompile>
    </div>
  </div>
</template>

<script>
import ModeltypeCompile from "@/components/model_type/compile.vue";
import {
  GetmodelType,
  AddmodelType,
  RemoveModelType,
  ModifyModelType,
} from "@/api/model";
export default {
  data() {
    return {
      form: {
        name: "",
        desc: "",
      },
      tableData: [],
      selection: [],
      currentPage: 1,
      showDialog: false, // 控制弹出框显示与隐藏
    };
  },
  components: {
    ModeltypeCompile,
  },
  created() {
    this.GetmodelType();
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    compile_type() {
      this.$refs.ModeltypeCompile.showDialog2 = true;
    },
    delete_type(typeuuid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const request = {
            uuid_array: typeuuid,
          };
          RemoveModelType(request).then((res) => {
            if (res.data.status == "SUCCESS") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.GetmodelType();
            }else{
              this.$message({
                type: "error",
                message: res.data.attach,
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
    add_type() {
      this.showDialog = true;
    },
    GetmodelType() {
      GetmodelType()
        .then((res) => {
          this.tableData = res.data.content.array;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      AddmodelType(this.form).then((res) => {
        console.log(res);
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.showDialog = false;
        this.$emit("refresh");
        this.GetmodelType();
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
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
  margin: 100px 50px 0 50px;
  background: #fff;
}
</style>
