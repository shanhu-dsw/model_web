<template>
  <div>
   <div class="model_type">
      <div class="type_title">监控列表</div>
      <div class="list_filter">
        <div class="filter_left">
          <el-input
            v-model="filter_name"
            style="width: 25%; margin-right: 20px"
            placeholder="请输入监控名称"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
          <el-select
            style="margin-right: 20px"
            placeholder="请选择状态"
          >
            <el-option
              label="123"
              value="1"
            >
            </el-option>
          </el-select>
          <el-select
            placeholder="请选择房间"
            style="margin-right: 20px"
            v-model="filter_location"
            @change="filterLocation"
          >
            <el-option
              v-for="item in location"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            >
            </el-option>
          </el-select>
          <el-select
            placeholder="请选择应用模型"
            style="margin-right: 20px"
            v-model="filter_model"
            @change="filterModel"
          >
            <el-option
              v-for="item in modellist"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="filterName">搜索</el-button>
        </div>
        <div class="filter_right">
          <el-button style="background:#07B9B9;color:#FFF">导入</el-button>
        <el-button style="background:#FFC300;color:#FFF">导出</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="cameras_add" 
          >新增</el-button>
        </div>
      </div>
      <el-table
        :border="true"
        ref="multipleTable"
        :data="displayedData"
        tooltip-effect="dark"
        style="width: 95%; margin-left: 40px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" style="width:5%"> </el-table-column>
        <el-table-column label="状态" style="width:5%">
          <template slot-scope="scope">在线</template>
        </el-table-column>
        <el-table-column label="名称" style="width:10%">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="创建时间" style="width:15%">
          <template slot-scope="scope">{{
            scope.row.create_datetime
          }}</template>
        </el-table-column>
        <el-table-column label="监控地址" style="width:35%">
          <template slot-scope="scope">
            {{ scope.row.url }}
          </template>
        </el-table-column>

        <el-table-column label="最新抓拍" style="width:20%">
          <template slot-scope="scope">
            <img
              :src="scope.row.image"
              alt=""
              style="width: 100%; height: 150px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width:15%">
          <template slot-scope="scope">
            <a style="color: #409eff;margin-right: 10px;" @click="cameras_detail(scope.row.uuid)"
            >详情</a>
          <a style="color: #409eff;margin-right: 10px;" @click="edit_cameras(scope.row.uuid)">编辑</a>
          <a  style="color: #409eff" @click="delete_cameras(scope.row.uuid)">删除</a>
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
        style="padding:20px 0"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
  import { GetmodelList } from "@/api/model";
  import { GetCamera,RemoveCamera } from "@/api/camera";
  import { GetLocation,GetLocationCamera,GetLocationModel } from "@/api/location";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      currentPage: 1,
      filter_name:"",
      location:[],
      filter_location:"",
      filter_model:"",
      modellist:[],
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
    this.getCamera();
    this.getLocation();
    this.getmodelList();
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    cameras_detail(uuid){
      this.$router.push({ path: "/resource/cameras/show",query: { uuid: uuid } })
    },
    Addlocation_events() {
      this.$router.push({ path: "/location_events/add" })
    },
    edit_cameras(uuid){
      this.$router.push({ path: "/resource/cameras/edit",query: { uuid: uuid } })
    },
    getCamera(){
      GetCamera().then((res) => {
        this.tableData = res.data.content.array;
      });
    },
    getLocation(){
      GetLocation().then((res) => {
        this.location = res.data.content.array;
      });
    },
    getmodelList(){
      GetmodelList().then((res) => {
        this.modellist = res.data.content.array;
      });
    },
    filterName(){
      const request = {}
      if(this.filter_name !==""){
        request.name_like = this.filter_name
      }
      if(this.filter_location !==""){
        request.location_uuid_array = this.filter_location
      }
      if(this.filter_model !==""){
        request.model_uuid_array = this.filter_model
      }
      GetCamera(request).then((res) => {
        this.tableData = res.data.content.array;
      });
    },
    filterLocation(){
      const request = {
        location_uuid_array: this.filter_location
      }
      GetLocationCamera(request).then((res) => {
        this.tableData = res.data.content.array;
      });
    },
    filterModel(){
      
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
    delete_cameras(uuid){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const request = {
            uuid_array: uuid
          }
          RemoveCamera(request).then((res) => {
            if(res.data.status == "SUCCESS"){
              this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.getCamera();
            }
          });
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    cameras_add(){
      this.$router.push({ path: "/resource/cameras/create" })
    }
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
 width: 75%;
}
</style>