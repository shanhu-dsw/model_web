import $, { ajax } from 'jquery'
import * as echarts from "echarts";
export function StartApp(){
  $.ajax({
    url:"http://192.168.10.225:8820?start-app",
    method:"GET",
    success(res){
      alert(res)
    },
  }) 
}

export function StopApp(){
  $.ajax({
    url:"http://192.168.10.225:8820?stop-app",
    method:"GET",
    success(res){
      alert(res)
    }
  })
}
export function StartCapture(){
  $.ajax({
    url:"http://192.168.10.225:8820?start-capture",
    method:"GET",
    success(res){
      console.log(res.length);
      if(res.length == 65){
        alert("启动capture成功")
      }else if(res.indexOf("Error response from daemon") !==-1){
        alert("重复启动capture")
      }else{
        alert(res)
      }
    }
  })
}
export function StopCapture(){
  $.ajax({
    url:"http://192.168.10.225:8820?stop-capture",
    method:"GET",
    success(res){
      if(res.length == 13){
        alert("停止capture成功")
      }else if(res.indexOf("Stop one or more running containers")!==-1){
        alert("重复停止caputure")
      }else{
        alert(res)
      }
    }
  })
}
export function StartVision(){
  $.ajax({
    url:"http://192.168.10.150:8820?start-vision",
    method:"GET",
    success(res){
      console.log(res.length);
      if(res.length == 65){
        alert("启动vision成功")
      }else if(res.indexOf("port is already allocated")!==-1){
        alert("重复启动vision")
      }else{
        alert(res)
      }
    }
  })
}
export function StopVision(){
  $.ajax({
    url:"http://192.168.10.150:8820?stop-vision",
    method:"url",
    success(res){
      console.log(res.length);
      if(res.length == 13){
        alert("停止vision成功")
      }else{
        alert(res) 
      }
    }
  })
}
export function StartPostgresql(){
  $.ajax({
    url:"http://192.168.10.225:8820?start-postgresql",
    method:"GET",
    success(res){
      alert(res)
    }
  })
}
export function StopPostgresql(){
  $.ajax({
    url:"http://192.168.10.225:8820?stop-postgresql",
    method:"GET",
    success(res){
      alert(res)
    }
  })
}
export function LookSpace225(chartDom){
  $.ajax({
    url: "http://192.168.10.225:8820?look-space",
    methods: "GET",
    success(res) {
      const res_space = res.split(/\s+/);
      var myChart = echarts.init(chartDom);
      var option = {
        title: {
          text: "系统磁盘空间情况",
          subtext:"挂载点："+res_space[3] +"\n"+res_space[6],
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        tooltip:{
          trigger:"item",
          formatter:"{a} <br/> {b} :{c}G({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: res_space[9].substring(0,res_space[9].length -1), name: "已用" },
              { value: res_space[6].substring(0,res_space[6].length -1)-res_space[9].substring(0,res_space[9].length -1), name: "剩余" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                  show: true,
                  formatter: '{b}:{c}G \n{d}%' //自定义显示格式(b:name, c:value, d:百分比)
              }
          }
          },
        ],
        
      };
      option && myChart.setOption(option);
    },
  });
}
export function LookSpace150(chartDom){
  $.ajax({
    url: "http://192.168.10.150:8820?look-space",
    methods: "GET",
    success(res) {
      const res_space2 = res.split(/\s+/)
      // console.log(res_space2);
      var myChart = echarts.init(chartDom);
      var option = {
        title: {
          text: "系统磁盘空间情况",
          subtext:"挂载点："+res_space2[3] +"\n"+res_space2[6],
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        tooltip:{
          trigger:"item",
          formatter:"{a} <br/> {b} :{c}G({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: res_space2[9].substring(0,res_space2[9].length -1), name: "已用" },
              { value: res_space2[6].substring(0,res_space2[6].length -1)-res_space2[9].substring(0,res_space2[9].length -1), name: "剩余" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                  show: true,
                  formatter: '{b}:{c}G \n{d}%' //自定义显示格式(b:name, c:value, d:百分比)
              }
          }
          },
        ],
      };
      option && myChart.setOption(option);
    },
  })
}
export function Lookstorage225(charset){
  $.ajax({
    url: "http://192.168.10.225:8820?internal-storage",
    methods: "GET",
    success(res) {
      const res_storage = res.split(/\s+/)
      var myChartes = echarts.init(charset);
      var options2;
      options2 = {
        title: {
          text: "系统内存使用情况",
          subtext:"共："+ res_storage[3] ,
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        tooltip:{
          trigger:"item",
          formatter:"{a} <br/> {b} : {c}G<br/>{d}%"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: res_storage[6].substring(0,res_storage[6].length -1), name: "已用" },
              { value: res_storage[9].substring(0,res_storage[9].length -1), name: "剩余" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                  show: true,
                  formatter: '{b}:{c}G \n{d}%' //自定义显示格式(b:name, c:value, d:百分比)
              }
          }
          },
        ],
      };
      options2 && myChartes.setOption(options2);
    },
  });
}
export function Lookstorage150(charset2){
  $.ajax({
    url: "http://192.168.10.150:8820?internal-storage",
    methods: "GET",
    success(res) {
      const res_storage2 = res.split(/\s+/)
      // console.log(res_storage2);
      var myChartes = echarts.init(charset2);
      var options2;
      options2 = {
        title: {
          text: "系统内存使用情况",
          subtext: "共："+ res_storage2[3],
          left: "center",
        },
        tooltip:{
          trigger:"item",
          formatter:"{a} <br/> {b} : {c}G<br/>{d}%"
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: res_storage2[6].substring(0,res_storage2[6].length -1), name: "已用" },
              { value: res_storage2[9].substring(0,res_storage2[9].length -1), name: "剩余" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                  show: true,
                  formatter: '{b}:{c}G \n{d}%' //自定义显示格式(b:name, c:value, d:百分比)
              }
          }
          },
        ],
      };
      options2 && myChartes.setOption(options2);
    },
  });
}
export function LookCpu(charset_cpu){
  $.ajax({
    url:"http://192.168.10.225:8820?read-cpu",
    methods:"GET",
    success(res){
      // console.log(res.split(/\s+/));
      const res_gpu = res.split(/\s+/)
      var myChartes = echarts.init(charset_cpu);
      var options2;
      options2 = {
        title: {
          text: "Cpu使用情况",
          subtext: "cpu状态：" +res_gpu[3] ,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        tooltip:{
          trigger:"item",
          formatter:"{a} <br/> {b} :{c}%"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: res_gpu[1].substring(6,10), name: "已用" },
              { value: 100-res_gpu[1].substring(6,10), name: "剩余" },
  
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                  show: true,
                  formatter: '{b}: \n{d}%' //自定义显示格式(b:name, c:value, d:百分比)
              }
          }
          },
        ],
      };
      options2 && myChartes.setOption(options2);
    }
  })
}
export function LookGpu(charset_gpu){
  $.ajax({
    url:"http://192.168.10.150:8820?read-gpu",
    methods:"GET",
    success(res){
      // console.log(res.split(/\s+/));
      const res_gpu = res.split(/\s+/)
      var myChartes = echarts.init(charset_gpu);
      var options2;
      options2 = {
        title: {
          text: "Gpu使用情况",
          subtext: "总显存：" + res_gpu[68],
          left: "center",
        },
        tooltip:{
          trigger:"item",
          formatter:"{a} <br/> {b} :{c}Mib({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
        },

        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: res_gpu[107].replace("MiB",""), name: "已用" },
              { value: res_gpu[68].replace("MiB","")-res_gpu[107].replace("MiB",""), name: "剩余" },
  
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                  show: true,
                  formatter: '{b}: \n{c}Mib \n{d}%' //自定义显示格式(b:name, c:value, d:百分比)
              }
          }
          },
        ],
      };
      options2 && myChartes.setOption(options2);
    }
  })
}
export function LookIP_one(addIp){
  $.ajax({
    url:"http://192.168.10.225:8820?look-ip",
    method:"GET",
    success(res){
      addIp.innerHTML ="服务器："+res.split(/\s+/)[2]
    }
  })
}
export function LookIP_two(addIp){
  $.ajax({
    url:"http://192.168.10.150:8820?look-ip",
    method:"GET",
    success(res){
      addIp.innerHTML ="服务器："+res.split(/\s+/)[2]
    }
  })
}
export function Looklog50(logtext){
  $.ajax({
    url: "http://192.168.10.225:8820?read-log",
    methods: "GET",
    success(res) {
     logtext.value = res
    },
  });
}
export function Looklog100(logtext){
  $.ajax({
    url: "http://192.168.10.225:8820?read-log:100",
    methods: "GET",
    success(res) {
     logtext.value = res
    },
  });
}
export function Looklog200(logtext){
  $.ajax({
    url: "http://192.168.10.225:8820?read-log:200",
    methods: "GET",
    success(res) {
     logtext.value = res
    },
  });
}
export function Looklog500(logtext){
  $.ajax({
    url: "http://192.168.10.225:8820?read-log:500",
    methods: "GET",
    success(res) {
     logtext.value = res
    },
  });
} 
export function Link_postgres(link){
  $.ajax({
    url:"http://192.168.10.225:8820?link-postgres",
    method:"GET",
    success(res){
      console.log(res.split(/\s+/));
      link.innerHTML=res.split(/\s+/)[7]
    }
  })
}
export function Backup_postgres(backup_html){
  $.ajax({
    url:"http://192.168.10.225:8820?backup",
    method:"GET",
    success(res){
      console.log(res);
      if(res.indexOf("生成文件 gadc.bak")!=-1){
        backup_html.innerHTML="备份成功   文件位置：/home/gadc.back"
      }
    }
  })
}
export function CleanImage(){
  $.ajax({
    url:"http://192.168.10.225:8820?clean-image",
    method:"GET",
    success(res){
      alert(res)
    }
  })
}