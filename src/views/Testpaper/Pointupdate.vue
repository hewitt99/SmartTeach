<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>试卷试题管理</el-breadcrumb-item>
      <el-breadcrumb-item>知识点管理</el-breadcrumb-item>
      <el-breadcrumb-item>知识点修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        ref="formLabelAlign"
      >
        <el-form-item label="科目名字">
          <el-input
            v-model="formLabelAlign.courseName"
            props="courseName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="课程Id">
          <el-input
            v-model="formLabelAlign.courseId"
            props="courseId"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formLabelAlign.text" props="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formLabelAlign')"
            >立即修改</el-button
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
        num: 1,
        courseName: "",
        courseId: "默认",
        text: "默认",
      },
    };
  },
  methods: {
    getInit() {
      // console.log(this.$route.query.courseId);
      this.formLabelAlign.num = this.$route.query.num;
      this.formLabelAlign.courseId = this.$route.query.courseId;
      this.formLabelAlign.courseName = this.$route.query.courseName;
      this.formLabelAlign.text = this.$route.query.text;
    },
    onSubmit() {
      console.log(this.formLabelAlign);
      // 等一下要改
      axios
        .put("http://localhost:8181/test/updatePoint", this.formLabelAlign)
        .then(this.$router.push("/knowledgeManage"));
    },
  },
  created() {
    this.getInit();
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>