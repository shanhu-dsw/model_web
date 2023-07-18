<template>
  <div>
    <div class="model_type">
      <div class="type_title">智能预警</div>
      <el-table
        :border="true"
        ref="multipleTable"
        :data="displayedData"
        tooltip-effect="dark"
        style="width: 90%; margin-left: 40px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" style="width:5%"> </el-table-column>
        <el-table-column label="房间" style="width:10%">
          <template slot-scope="scope">{{ scope.row.location }}</template>
        </el-table-column>
        <el-table-column label="模型" style="width:15%">
          <template slot-scope="scope">{{ scope.row.model }}</template>
        </el-table-column>
        <el-table-column label="发生时间" style="width:15%">
          <template slot-scope="scope">{{
            scope.row.create_datetime
          }}</template>
        </el-table-column>
        <el-table-column label="预警图片" style="width:25%">
          <template slot-scope="scope">
            <img
              :src="scope.row.image"
              alt=""
              style="width: 100%; height: 150px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width:30%">
          <a style="color: #409eff;" @click="location_events_detail"
            >详情</a>
          <!-- <a style="color: #409eff" @click="remove_type">删除</a> -->
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
        style="padding:20px 0;"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      tableData: [
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
        {
          location: "东阿鱼山测试2",
          model: "人员聚集",
          create_datetime: "2023-06-01 12:25:36",
          image: "@/assets/images/image_error.png",
        },
      ],
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
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    location_events_detail(){
      this.$router.push({ path: "/location_events/show" })
    },
    Addlocation_events() {
      this.$router.push({ path: "/location_events/add" })
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