<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-card>
          <i
            class="el-icon-user-solid"
            style="font-size: 50px; color: #333"
          ></i>
          <span>今日抓拍：</span>
          <span>{{ capture_number }}</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <i
            class="el-icon-user-solid"
            style="font-size: 50px; color: #333"
          ></i>
          <span>今日预警：</span>
          <span>{{ location_number }}</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <i
            class="el-icon-user-solid"
            style="font-size: 50px; color: #333"
          ></i>
          <span>在线监控：</span>
          <span>{{ camera_number }}</span>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <div id="main" style="height: 300px"></div>
    </el-card>
  </div>
</template>
<script>
import { getcamera_captures, getlocation, getcamera } from "@/api/user";
import * as echarts from "echarts";
export default {
  data() {
    return {
      capture_number: "",
      location_number: "",
      camera_number: "",
    };
  },
  methods: {
    async getcamera_captures(params) {
      let { data } = await getcamera_captures(params);
      this.capture_number = data.total;
    },
    async getlocation(params) {
      const { data } = await getlocation(params);
      this.location_number = data.total;
    },
    async getcamera() {
      const {
        data: { data },
      } = await getcamera();
      console.log(data[0].status);
      var same = 0;
      for (let i = 0; i <= data.length - 1; i++) {
        console.log(data[i].status);
        if (data[i].status == "normal") {
          same += 1;
        }
      }
      this.camera_number = same;
    },
  },
  created() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month > 9 ? month : "0" + month;
    day = day < 10 ? "0" + day : day;
    var today = year + "-" + month + "-" + day;
    console.log(today);
    let params = {
      // page_size: 100,
      query_from_date: today + " 00:00:00",
      query_to_date: today + " 23:59:59",
    };
    this.getcamera_captures(params);
    let params_location = {
      // page_size: 100,
      query_created_at_from: today + " 00:00:00",
      query_created_at_to: today + " 23:59:59",
    };
    this.getlocation(params_location);
    this.getcamera();
  },
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "axis",
      },
      title: {
        text: "抓拍量与报警量实时统计",
      },
      legend: {
        data: ["Email", "Union Ads"],
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
          name: "Email",
        },
        {
          data: [100, 200, 120, 101, 104, 102, 124],
          type: "line",
          smooth: true,
          name: "Union Ads",
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>