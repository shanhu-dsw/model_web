<template>
  <div>
    <el-card class="box-card" style="height: 300px">
      <div slot="header" class="clearfix">
        <span>数据库管理</span>
        <el-button
          type="primary"
          style="margin-left: 100px"
          @click="Link_postgres"
          >测试连接数据库</el-button
        >
        <el-button
          type="primary"
          @click="Backup_postgres"
          style="margin-left: 100px"
          >备份数据库</el-button
        >
      </div>
      <div id="backup_text"></div>
    </el-card>
    <el-card class="box-card" style="height: 300px">
      <div>系统缓存清理</div>
      <el-button type="primary" @click="clear_img" style="margin-top: 20px"
        >清理缓存目录</el-button
      >
    </el-card>
  </div>
</template>

<script>
import $ from "jquery"
import { Backup_postgres,CleanImage,Link_postgres} from "@/api/Call-service";
export default {
  data() {
    return {
      str: "",
    };
  },
  methods: {
    Backup_postgres() {
      var backup_html = document.getElementById("backup_text");
      backup_html.innerHTML = "正在备份数据库。。。";
      Backup_postgres(backup_html)
    },
    Link_postgres(){
      var link =  document.getElementById("backup_text");
      link.innerHTML = "正在进入postgresql环境"
      Link_postgres(link)
    },
    clear_img() {
        this.$confirm('此操作将永久3天前的图片数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: CleanImage(),
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
  },
};
</script>

<style>
.box-card {
  margin-top: 50px;
  margin-right: 40px;
  margin-left: 40px;
}
</style>