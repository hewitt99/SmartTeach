<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>试卷试题管理</el-breadcrumb-item>
      <el-breadcrumb-item>题型管理</el-breadcrumb-item>
      <el-breadcrumb-item>题型添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        ref="formLabelAlign"
      >
        <el-form-item label="单选题">
          <el-input v-model="formLabelAlign.optionQuestion"></el-input>
        </el-form-item>
        <el-form-item label="多选题">
          <el-input v-model="formLabelAlign.mOption"></el-input>
        </el-form-item>
        <el-form-item label="判断题">
          <el-input v-model="formLabelAlign.judgment"></el-input>
        </el-form-item>
        <el-form-item label="简答题">
          <el-input v-model="formLabelAlign.completion"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formLabelAlign')"
            >立即添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        optionQuestion: "",
        mOption: "",
        completion: "",
        judgment: "",
      },
    };
  },
  methods: {
    onSubmit(formname) {
      console.log(formname);
      console.log(this.formLabelAlign);
      axios
        .post("http://localhost:8181/test/addType", this.formLabelAlign)
        .then(this.$router.push("/topicManage"));
    },
  },
};
</script>



<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>