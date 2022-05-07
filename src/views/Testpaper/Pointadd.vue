<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>试卷试题管理</el-breadcrumb-item>
      <el-breadcrumb-item>知识点管理</el-breadcrumb-item>
      <el-breadcrumb-item>知识点添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        ref="formLabelAlign"
      >
        <el-form-item label="科目名字">
          <el-input v-model="formLabelAlign.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程Id">
          <el-input v-model="formLabelAlign.courseId"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formLabelAlign.text"></el-input>
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
        courseName: "",
        courseId: "",
        text: "",
      },
    };
  },
  methods: {
    onSubmit(formname) {
      console.log(formname);
      console.log(this.formLabelAlign);
      axios
        .post("http://localhost:8181/test/addPoint", this.formLabelAlign)
        .then(this.$router.push("/knowledgeManage"));
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