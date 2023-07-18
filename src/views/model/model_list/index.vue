<template>
  <div style="background: #ffff">
    <h3 class="model_title">模型列表</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="model_tab" style="margin: 0 20px">
      <div class="list_filter">
        <div class="filter_left">
          <el-input
            v-model="modelname"
            style="width: 25%; margin-right: 20px"
            placeholder="请输入模型名称"
            prefix-icon="el-icon-search"
            clearable
          ></el-input>
          <el-select
            style="margin-right: 20px"
            v-model="statevalue"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in modelstate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="base_value"
            placeholder="请选择基础模型"
            style="margin-right: 20px"
          >
            <el-option
              v-for="item in base_model"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="filter_right">
          <el-button @click="Addmodel" type="primary">新增模型</el-button>
        </div>
      </div>
      <el-tab-pane 
      :label=" '全部'  "
      name="all"
      >
    </el-tab-pane>
    <el-tab-pane
    v-for="item in model_type"
    :key="item.uuid"
    :label="item.name"
    :name="item.uuid"
    >

    </el-tab-pane>
        <div class="model_tab_list">
          <div
            style="
              margin: 0 0.5%;
              width: 24%;
              height: 300px;
              background: #f5f7fa;
              margin-bottom: 20px;
            "
            v-for="item in divList"
            :key="item.uuid"
          >
          <div class="model_list_title">
          <div class="model_list_title_left">
            <img src="@/assets/images/Group.png" alt="" />
            <span>{{item.name}}</span>
          </div>  
          <div class="model_list_title_right">
            <el-button type="text" @click="model_show(item.uuid)">查看详情</el-button>
            <el-button type="text" @click="model_edit(item.uuid)">编辑</el-button>
            <el-button type="text" @click="delete_model(item.uuid)">删除</el-button>
          </div>
        </div>
        <div class="model_list_content">
          <div class="model_list_content_item_left">
            <img src="@/assets/images/武器库异动.jpg" style="width:100%;height:100%;" alt="">
          </div>
          <div class="model_list_content_item_right">
            <div style="display:flex;justify-content:space-between;padding: 7px 0;">
              <div>
                模型类型:
              </div>
              <div>{{ item.type_name }}</div>
            </div>
            <div style="display:flex;justify-content:space-between;padding: 7px 0;">
              <div>
                状态:
              </div>
              <div :style="{ color: item.status === 'ENABLE' ? 'blue' : 'red' }">{{ item.status === 'ENABLE' ? '启用' : '禁用' }}</div>
            </div>
            <div style="display:flex;justify-content:space-between;padding: 7px 0;">
              <div>
                已应用房间数:
              </div>
              <div></div>
            </div>
            <div style="display:flex;justify-content:space-between;padding: 5px 0;">
              <div>
                已应用监控数:
              </div>
              <div></div>
            </div>
          </div>
          <div class="model_content_foot">
            {{ item.description }}
          </div>
        </div>
        </div>
        </div>
        <el-pagination
          align="center"
          @current-change="handleCurrentChange"
          v-model="currentPage"
          :page-sizes="[12]"
          :page-size="pageSize"
          :total="divList.length"
          style="padding:20px 0">
        </el-pagination>
    </el-tabs>
  </div>
</template>
  
<script>
import { GetmodelList, RemoveModel, ModifyModel ,GetmodelType } from "@/api/model";
export default {
  data() {
    return {
      activeName: "all", // 默认选中"全部"
      modelstate: [
        {
          value: "ENABLE",
          label: "启用",
        },
        {
          value: "DISABLED",
          label: "禁用",
        },
      ],
      divList: [],
      statevalue: "",
      modelname:"",
      base_model: [
        // 基础模型选项
      ],
      model_type:[],
      base_value: "",
      currentPage: 1,
      pageSize: 12,
    };
  },
  computed: {
    
    pagedDivList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.divList.slice(start, end);
    },
  },
  created() {
    this.getmodelList();
    this.getmodelType();
  },
  methods: {
    getmodelList() {
      GetmodelList().then((res) => {
        this.divList = res.data.content.array;
      });
    },
    search(){
      const request = {
        type_uuid_array: this.activeName,
        status_array: this.statevalue,
        event_id_array: this.base_value,
        name_like: this.modelname,
      };
      GetmodelList(request).then((res) => {
        this.divList = res.data.content.array;
      });
    },
    handleClick(tab) {
      console.log(this.activeName)
      if(this.activeName == 'all'){
        this.getmodelList();
      }else{
        const request = {
          type_uuid_array: this.activeName,
        };
        GetmodelList(request).then((res) => {
          this.divList = res.data.content.array;
        });
      }
      // 调用接口进行筛选
      // 根据tab.name的值来构建请求参数，并调用相应的接口来获取筛选后的数据
    },
    Addmodel() {
      this.$router.push("/model/model_list/create");
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getmodelType(){
      GetmodelType().then((res) => {
        this.model_type = res.data.content.array;
      });
    },
    model_show(id) {
      this.$router.push({ path: "/model/model_list/show", query: { id: id } });
    },
    delete_model(uuid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const request = {
            uuid_array: uuid,
          };
          RemoveModel(request).then((res) => {
            if (res.data.status == "SUCCESS") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getmodelList();
            } else {
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
    model_edit(id) {
      this.$router.push({
        path: "/model/model_list/edit",
        query: { id: id },
      });
    },
  },
};
</script>
  
<style lang="scss" scoped>
.model_title {
  padding: 10px 20px 0px 20px;
  margin-top: 50px;
  color: #5b6388;
  font-weight: bold;
}

.model_tab {
  // padding-left: 20px;

  .model_tab_list {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* 允许换行 */
  }
}

.model_list_title{
  height: 20%;
  display: flex;
  border-bottom: 1px solid #D8D8D8;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  .model_list_title_left{
    display: flex;
    line-height: 30px;
    img{
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  .model_list_title_right{
    display: flex;
    height: 30px;
    el-button{
      color: #5b6388;
    }
  } 
}

.model_list_content{
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 10px 5px;
  
    .model_list_content_item_left{
      width: 40%;
      height: 100%;
      margin-right: 10px;
    }
    .model_list_content_item_right{
      width: 55%;
      font-size: 16px;
      color: #606266;
    }
   
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
.model_content_foot{
      margin: 20px 20px;
      font-size: 18px;
    }
</style>>
