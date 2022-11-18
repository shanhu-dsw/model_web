<template> 
 <div>
  <table border="1"  style=" border-collapse:separate;border-spacing: 0px;border-color: inherit;color: #606266;" width="100%" height="50px">
    <tr>
      <th>服务名称</th>
      <th>服务状态</th>
      <th>操作</th>
      <th>prots</th>
      <th>image</th>
    </tr>
    <tr>
      <th>WEB服务</th>
      <th id="startapp"></th>
      <th style="text-align:center">
      <el-button type="primary" id="startapp-btn" @click="Call_StartApp">启动</el-button>
      <el-button type="primary" id="stopapp-btn" @click="Call_StopApp">停止</el-button>
      </th>
      <th id="prots_app">0.0.0.0:80->80/tcp, 443/tcp</th>
      <th id="image_gadc">gadc</th>
    </tr>
    <tr>
      <th>Capture服务</th>
      <th id="Capture"></th>
      <th>
      <el-button id="startcap-btn" type="primary" @click="Call_StartCapture">启动</el-button>
      <el-button id="stopcap-btn" type="primary" @click="Call_StopCapture">停止</el-button>
      </th>
      <th id="prots_capture">0.0.0.0:8998->8998/tcp</th>
      <th id="image_capture">engine-capture</th>
    </tr>
    <tr>
      <th>Vision服务</th>
      <th id="Vision"></th>
      <th>
      <el-button id="startvis-btn" type="primary" @click="Call_StartVision">启动</el-button>
      <el-button id="stopvis-btn" type="primary" @click="Call_StopVision">停止</el-button>
      </th>
      <th>0.0.0.0:7998->8001/tcp</th>
      <th>engine-vision</th>
    </tr>
    <tr>
      <th>Postgres服务</th>
      <th id="postgres"></th>
      <th>
        <el-button id="startpostgres-btn" type="primary" @click="Call_Startpostgresql">启动</el-button>
        <el-button id="stoppostgres-btn" type="primary" @click="Call_Stoppostgresql">停止</el-button>
      </th>
      <th>0.0.0.0:5432->5432/tcp</th>
      <th>postgres:13.2 </th>
    </tr>
  </table>
 </div>
  
</template>
  
<script>
import { StartApp,StopApp,StartCapture,StopCapture,StartVision,StopVision,StartPostgresql,StopPostgresql} from "@/api/Call-service"
import $ from 'jquery'
export default {
  data() {
    return {
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  methods: {
  Call_StartApp(){
   StartApp()
   this.ServiceState()
  },
  Call_StopApp(){
   StopApp();
   this.ServiceState()
  },
  Call_StartCapture(){
    StartCapture()
   this.ServiceState()
  },
  Call_StopCapture(){
    StopCapture()
   this.ServiceState()
  },
  Call_StartVision(){
    StartVision()
    this.ServiceState()
  },
  Call_StopVision(){
    StopVision()
    this.ServiceState()
  },
  Call_Startpostgresql(){
    StartPostgresql()
    this.ServiceState()
  },
  Call_Stoppostgresql(){
    StopPostgresql()
    this.ServiceState()
  },
  ServiceState() {
     $.ajax({
        url: "http://192.168.10.225:8820?service-state",
        methods: "GET",
        success(res) {
          if(res.indexOf("gadc") != -1){
            document.getElementById("startapp").innerHTML = "runing"
            document.getElementById("stopapp-btn").style.display = "block"
            document.getElementById("startapp-btn").style.display = "none"
          }else{
            document.getElementById("startapp").innerHTML = "stop"
            document.getElementById("startapp-btn").style.display = "block"
            document.getElementById("stopapp-btn").style.display = "none"
          }
          if(res.indexOf("capture") !=-1){
            document.getElementById("Capture").innerHTML = "runing"
            document.getElementById("startcap-btn").style.display = "none"
            document.getElementById("stopcap-btn").style.display = "block"
          }else{
            document.getElementById("Capture").innerHTML = "stop"
            document.getElementById("startcap-btn").style.display = "blobk"
            document.getElementById("stopcap-btn").style.display = "none"
          }
          if(res.indexOf("postgres") !=-1){
            document.getElementById("postgres").innerHTML = "runing"
            document.getElementById("startpostgres-btn").style.display = "none"
            document.getElementById("stoppostgres-btn").style.display = "block"
          }else{
            document.getElementById("postgres").innerHTML = "stop"
            document.getElementById("startpostgres-btn").style.display = "block"
            document.getElementById("stoppostgres-btn").style.display = "none"
          }
        },
      });
      $.ajax({
        url: "http://192.168.10.150:8820?service-state",
        methods: "GET",
        success(res) {
          if(res.indexOf("vision") !=-1){
            document.getElementById("Vision").innerHTML = "runing"
            document.getElementById("startvis-btn").style.display = "none"
            document.getElementById("stopvis-btn").style.display = "block"
          }else{
            document.getElementById("Vision").innerHTML = "stop"
            document.getElementById("startvis-btn").style.display = "block"
            document.getElementById("stopvis-btn").style.display = "none"
          }
        },
      });
    },
  },
  created(){
    this.ServiceState()
  }
};
</script>

<style>
table
        {
            border-collapse: collapse;
            margin: 0 auto;
            text-align: center;
        }
        table td, table th
        {
            border: 1px solid #cad9ea;
            color: #666;
            height: 30px;
        }
        table thead th
        {
            background-color: #CCE8EB;
            width: 100px;
        }
        table tr:nth-child(odd)
        {
            background: #fff;
        }
        table tr:nth-child(even)
        {
            background: #F5FAFA;
        }
.el-button{
  display: none;
}
.el-button+.el-button {
    margin-left: 0px;
}
</style>