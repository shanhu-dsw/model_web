<template>
  <div>
    <el-dialog
        title="新增模型类型"
        :visible="showDialog2"
        @close="showDialog2 = false"
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
          <el-button @click="showDialog2 = false">取消</el-button>
          <el-button type="primary" @click="AddsubmitForm">确认</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { AddmodelType } from "@/api/model";
export default {
data(){
    return{
        form:{
            name:"",
            order:"",
        },
        showDialog2:false,// 控制弹出框显示与隐藏
    }
},
methods:{
  AddsubmitForm(){
      console.log(this.form)
      AddmodelType(this.form).then((res)=>{
        console.log(res)
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.showDialog2 = false;
        this.$emit("refresh");
      })
}
}
}
</script>

<style>

</style>