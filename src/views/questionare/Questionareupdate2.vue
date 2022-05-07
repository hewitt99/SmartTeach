<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问卷中心</el-breadcrumb-item>
      <el-breadcrumb-item>问卷总览</el-breadcrumb-item>
      <el-breadcrumb-item>问卷结果详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="qst" label="问题"> </el-table-column>
        <el-table-column prop="opt1" label="选项1"> </el-table-column>
        <el-table-column prop="ans1" label="回答1"> </el-table-column>
        <el-table-column prop="opt2" label="选项2"> </el-table-column>
        <el-table-column prop="ans2" label="回答2"> </el-table-column>

        <el-table-column prop="opt3" label="选项3"> </el-table-column>
        <el-table-column prop="ans3" label="回答3"> </el-table-column>
        <el-table-column prop="opt4" label="选项4"> </el-table-column>
        <el-table-column prop="ans4" label="回答4"> </el-table-column>
        <el-table-column prop="opt5" label="选项5"> </el-table-column>
        <el-table-column prop="ans5" label="回答5"> </el-table-column>
        <el-table-column prop="ansTotal" label="回答人数"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableNum: 1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let _this = this;
      axios
        .get(
          "http://localhost:8282/questionareQst/findID/" +
            _this.$route.query.qsnId
        )
        .then((res) => {
          console.log(res.data);
          _this.tableNum = res.data.length;
          _this.tableData = res.data;
        });
    },
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>