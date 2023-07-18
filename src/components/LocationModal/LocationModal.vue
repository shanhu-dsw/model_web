<template>
  <div>
    <el-dialog
        title="模型绑定"
        :visible="showDialog"
        @close="showDialog = false"
        center
        width="70%"
      >
      <div class="model_tab_list">
          <div
            style="
              margin-right: 20px;
              width: 30%;
              height: 300px;
              background: #f5f7fa;
              margin-bottom: 20px;
            "
            v-for="item in pagedDivList"
            :key="item.id"
          >
          
          <div class="model_list_title">
          <div class="model_list_title_left">
  <el-checkbox-group v-model="selectedItems" style="margin: auto 15px auto 0">
            <el-checkbox  :label.sync="item.id" :key="item.id"> {{ '' }}</el-checkbox>
  </el-checkbox-group>
            <img src="@/assets/images/Group.png" alt="" style="margin:auto 0"/>
            <span style="margin:auto 10px;font-weight: bold;">{{item.name}}</span>
          </div>
          <!-- <div class="model_list_title_right">
            <el-button type="text">查看详情</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </div> -->
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
              <div>{{ item.model_type }}</div>
            </div>
            <div style="display:flex;justify-content:space-between;padding: 7px 0;">
              <div>
                状态:
              </div>
              <div>{{ item.model_status }}</div>
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
            {{ item.model_introduce }}
          </div>
        </div>
        </div>
        </div>
        <el-pagination
          align="center"
          @current-change="handleCurrentChange"
          v-model="currentPage"
          :page-sizes="[9]"
          :page-size="pageSize"
          :total="divList.length"
        >
        </el-pagination>
        <div style="text-align:right;padding:10px 10% 0 0">
          <!-- <el-button type="primary" @click="next_compile">下一步</el-button> -->
          <el-button type="primary" @click="submitForm">绑定模型</el-button>
        </div>
      </el-dialog>
      <ModelParameter ref="ModelParameter" :selectedItems="selectedItems"></ModelParameter>
  </div>
</template>

<script>
import ModelParameter from "@/components/LocationModal/mode_parameter.vue"
export default {
  data(){
    return{
      showDialog: false, // 控制弹出框显示与隐藏
      currentPage: 1,
      pageSize: 9,
      divList:[{
        id:"1",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"2",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"3",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"4",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"5",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"6",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"7",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"8",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"9",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"10",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"11",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"12",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"13",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },{
        id:"14",
        name:"服务岗位脱空岗",
        model_type:"执法办案",
        model_status:"启用",
        model_introduce:"执勤区域内民警不在岗，且超过指定的时间后进行预警....",
      },],
      selectedItems: [] // 选中的项目列表
    }
  },
  components:{
    ModelParameter
  },
  computed: {
    pagedDivList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.divList.slice(start, end);
    },
  },
  methods:{
    submitForm(){
      // 提交表单
      console.log(this.selectedItems)
      // const selectedIds = Object.keys(this.selectedItems).filter(id => this.selectedItems[id]);
      const selectedItems = this.divList.filter(item => this.selectedItems.includes(item.id));
    this.$emit('selection-changed', selectedItems);
    this.showDialog = false;
    },
    showModal() {
      this.showDialog = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    next_compile(){
      this.showDialog = false;
      this.$refs.ModelParameter.showModal2(); // 调用子组件的方法显示弹出框
    }
  }
}
</script>

<style lang="scss" scoped>

.model_title {
  padding: 10px 20px 0px 20px;
  margin-top: 50px;
  color: #5b6388;
  font-weight: bold;
}

  .model_tab_list {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* 允许换行 */
  }

.model_list_title{
  height: 20%;
  display: flex;
  border-bottom: 1px solid #D8D8D8;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  .model_list_title_left{
    display: flex;
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
  padding: 10px 20px 10px 20px;
  
    .model_list_content_item_left{
      width: 50%;
      height: 100%;
      margin-right: 10px;
    }
    .model_list_content_item_right{
      width: 45%;
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
  margin-right: 45%;
}
.model_content_foot{
      margin: 20px auto;
    }

</style>