<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="省级">
              <el-select v-model="form.options1" placeholder="全部">
                <el-option
                  :key="options1.id"
                  :label="options1.name"
                  :value="options1.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="市级">
              <el-select v-model="form.options2" placeholder="全部">
                <el-option
                  :key="options2.id"
                  :label="options2.name"
                  :value="options2.id"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="区县">
              <el-select v-model="form.options3" placeholder="全部">
                <el-option
                  :key="options3.id"
                  :label="options3.name"
                  :value="options3.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位">
              <el-select v-model="form.options4" placeholder="全部">
                <el-option
                  :key="options4.id"
                  :label="options4.name"
                  :value="options4.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房间">
              <el-select v-model="form.options5" placeholder="全部">
                <el-option
                  :key="options5.id"
                  :label="options5.name"
                  :value="options5.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-date-picker
              v-model="form.created_at"
              type="datetime"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="'00:00:00'"
            >
            </el-date-picker>
            <el-date-picker
              v-model="form.updated_at"
              type="datetime"
              placeholder="选择结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="'23:59:59'"
            ></el-date-picker>
          </el-col>
          <el-col :span="9">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button type="primary" @click="writeFile"
                >导出成txt文件</el-button
              >
              <el-button type="primary" @click="Getimages">下载图片</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table
          class="table"
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="location.path[0].name"
            label="省级"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="location.path[1].name"
            label="地级市"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="location.path[2].name"
            label="区县"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="location.path[3].name"
            label="单位"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="location.path[4].name"
            label="房间"
            width="140"
          >
          </el-table-column>
          <el-table-column prop="created_at" label="开始时间" width="320">
          </el-table-column>
          <!-- <el-table-column prop="img_url" label="抓拍图片" width="520" v-model="mes">
          </el-table-column> -->
          <el-table-column
            label="抓拍图片"
            prop="master_camera_capture.img_data.src"
          >
            <template slot-scope="{ row }">
              <img
                slot="reference"
                :src="row.master_camera_capture.img_data.src"
                style="height: 200px"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="changePage"
            :current-page.sync="page.page"
            :page-size="page.size"
            layout="prev, pager, next, jumper"
            :total="total"
          />
            </el-row>
    </div>
  </div>
</template>

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
<script>
import { mapGetters } from "vuex";
import { getcamera_captures, getlocation } from "@/api/user";
import { saveAs } from "file-saver";
import $ from "jquery";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      list: [],
      location_list: [],
      page: {
        page: 1,
        size: 100,
      },
      total: 0,
      form: {
        options1: "",
        options2: "",
        options3: "",
        options4: "",
        options5: "",
        created_at: "",
        updated_at: "",
        engine_id: "",
        location_id: "",
      },
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
    };
  },
  methods: {
    search() {
      let params = {
        query_created_at_from: this.form.created_at,
        query_created_at_to: this.form.updated_at,
        page_size: 100,
        query_location_id_0: this.form.options1,
        query_location_id_1: this.form.options2,
        query_location_id_2: this.form.options3,
        query_location_id_3: this.form.options4,
        query_location_id_4: this.form.options5,
      };
      this.getlocation(params);
    },
    handleSizeChange(val) {
      this.page.size = val

      this.getlocation()
    },
    changePage(val){
      this.page.page = val

      this.getlocation()
    },
    // async getercamera_captures(params) {
    //   const {
    //     data: { data },
    //     data: { total },
    //   } = await getcamera_captures(params);
    //   console.log(params);
    //   this.page.total = total;
    //   // this.list = data;
    //   console.log(data);
    // },
    async getlocation(params) {
      try {
        let {
          data: { data },total
        } = await getlocation(params);
        console.log(params);
        for (let i = 0; i < data.length; i++) {
          this.options1 = data[i].location.path[0];
          this.options2 = data[i].location.path[1];
          this.options3 = data[i].location.path[2];
          this.options4 = data[i].location.path[3];
          this.options5 = data[i].location.path[4];
        }
        this.list = data;
        this.location_list = data;
        this.total=total
      } catch (err) {
        console.log(err);
      }
    },
    writeFile() {
      let urllist = "";
      for (let i = 0; i < this.list.length; i++) {
        urllist +=
          0 +
          "\t" +
          this.list[i].camera_id +
          "\t" +
          this.list[i].img_url +
          "\n";
      }
      console.log(urllist);
      let str = new Blob([urllist], { type: "text/plain;charset=utf-8" });
      // 注意这里要手动写上文件的后缀名
      saveAs(str, `test.txt`);
    },
    Getimages() {
      $.ajax({
        url: "http://127.0.0.1:8820/?get-imgfile",
        methods: "GET",
        success(res) {
          alert(res);
        },
      });
    },
  },
  created() {
    let params = {
      page_size: 100,
    };
    // this.getercamera_captures();
    this.getlocation(params);
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
