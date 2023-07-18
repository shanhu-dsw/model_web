<template>
  <div>
    <div class="model_title">
      <a style="color: #6e789a; padding-left: 20px" @click="back_list">返回</a>
      <div
        style="
          font-size: 20px;
          font-weight: bold;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        模型详情
      </div>
    </div>
    <div class="model_message">
      <div class="message_title">模型信息</div>
      <div class="message_body">
        <div style="display: flex; padding: 20px 40px; width: 100%">
          <span style="line-height: 40px; height: 40px; width: 120px"
            >名称</span
          >
          <div class="model_data">{{ model_show[0].name }}</div>
          <span style="line-height: 40px; height: 40px; width: 120px"
            >模型类型</span
          >
          <div class="model_data">{{ model_show[0].type_name }}</div>
        </div>
        <div style="display: flex; padding: 20px 40px; width: 100%">
          <span style="line-height: 40px; height: 40px; width: 120px"
            >是否启用</span
          >
          <div class="model_data">{{ model_show[0].status == "ENABLE" ? "启用" : "禁用" }}</div>
          <span style="line-height: 40px; height: 40px; width: 120px"
            >容忍时间(秒)</span
          >
          <div class="model_data">{{ model_show[0].tolerance_time }}</div>
        </div>
        <div style="display: flex; padding: 20px 40px; width: 100%">
          <span style="line-height: 40px; height: 40px; width: 120px"
            >合并时间(秒)</span
          >
          <div class="model_data">{{ model_show[0].merge_time }}</div>
          <span style="line-height: 40px; height: 40px; width: 120px"
            >阈值</span
          >
          <div class="model_data">{{ model_show[0].threshold }}</div>
        </div>
        <div style="display: flex; padding: 20px 40px; width: 100%">
          <span style="line-height: 40px; height: 40px; width: 120px"
            >置信度</span
          >
          <div class="model_data">{{ model_show[0].confidence }}</div>
          <span style="line-height: 40px; height: 40px; width: 120px"
            >应用房间数量</span
          >
          <div class="model_data">{{  }}</div>
        </div>
        <div style="display: flex; padding: 20px 40px; width: 100%">
          <span style="line-height: 40px; height: 40px; width: 120px"
            >应用监控数量</span
          >
          <div class="model_data">{{  }}</div>
        </div>
      </div>
    </div>
    <div class="model_introduce">
      <div class="introduce_title">模型信息</div>
      <div class="introduce_body">
        {{ model_show[0].description }}
      </div>
    </div>
    <div class="model_img">
      <div class="img_title">图片示例</div>
      <div class="img_body">
        <img src="" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { GetmodelList } from "@/api/model";
export default {
  data() {
    return {
      uuid: "",
      model_show: {},
    };
  },
  created() {
  },
  mounted() {
    this.uuid = this.$route.query.id;
    this.Getmodelshow();
  },
  methods: {
    back_list() {
      this.$router.push({ path: "/model/model_list/index" });
    },
    Getmodelshow() {
      const request = { uuid_array: this.uuid }
      GetmodelList(request).then((res) => {
        if (res.data.status == "SUCCESS") {
          this.model_show = res.data.content.array;
        } else {
          this.$message.error("获取模型信息失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.model_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  width: 80%;
  background: #fff;
  margin: 60px auto 20px auto;
  /* border-bottom: 1px solid #e9ebf6; */
}
.model_message {
  width: 80%;
  background: #fff;
  margin: 0 auto;
  border-bottom: 1px solid #e9ebf6;

  .message_title {
    height: 35px;
    line-height: 35px;
    padding-left: 20px;
    border-bottom: 1px solid #d8d8d8;
  }

  .model_data {
    width: 30%;
    height: 40px;
    line-height: 40px;
    background: #fafbfc;
    border-radius: 4px;
    padding: 0 10px;
    margin: 0 auto 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #d8d8d8;
  }
}
.message_body {
  color: #6e789a;
}
.model_introduce {
  width: 80%;
  background: #fff;
  margin: 30px auto;
  border-bottom: 1px solid #e9ebf6;

  .introduce_title {
    height: 35px;
    line-height: 35px;
    padding-left: 20px;
    border-bottom: 1px solid #d8d8d8;
  }

  .introduce_body {
    padding: 20px 40px;
    color: #3d3d3d;
  }
}

.model_img {
  width: 80%;
  background: #fff;
  margin: 30px auto;
  border-bottom: 1px solid #e9ebf6;

  .img_title {
    height: 35px;
    line-height: 35px;
    padding-left: 20px;
    border-bottom: 1px solid #d8d8d8;
  }

  .img_body {
    padding: 20px 40px;
    color: #3d3d3d;
  }
}
</style>
