<template>
  <div>
    <el-dialog
      title="模型绑定"
      :visible="showDialog2"
      @close="showDialog2 = false"
      center
      width="70%"
    >
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="column in tableColumns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
          >
            <template slot-scope="scope">
              <template v-if="column.editable">
                <el-input
                  v-model="scope.row[column.prop]"
                  size="small"
                ></el-input>
              </template>
              <template v-else>
                {{ scope.row[column.prop] }}
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // selectedItems: {
    //   type: Array,
    //   default: false,
    // },
  },
  data() {
    return {
      showDialog2: false,
      tableColumns: [
        { label: "模型", prop: "name", editable: false },
        { label: "容忍时间", prop: "tolerance_time", editable: true },
        { label: "合并时间", prop: "merge_time", editable: true },
        { label: "阈值", prop: "threshold", editable: true },
        { label: "置信度", prop: "confidence", editable: true },
      
    ],
      tableData: [
      ],
    };
  },
  created() {
    
  },
  methods: {
    back_list() {
      this.showDialog2 = false;
    },
    showModal2(model_form) {
      this.showDialog2 = true;
      this.tableData = model_form
    },
  },
};
</script>

<style>
.parameter_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e9ebf6;
}
</style>
