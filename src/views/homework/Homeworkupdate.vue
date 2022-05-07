<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作业管理</el-breadcrumb-item>
      <el-breadcrumb-item>作业更新</el-breadcrumb-item>
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
          <el-input
            v-model="formLabelAlign.state"
            props="state"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="Q1">
          <el-input v-model="formLabelAlign.q1" props="q1"></el-input>
        </el-form-item>
        <el-form-item label="Q2">
          <el-input v-model="formLabelAlign.q2" props="q2"></el-input>
        </el-form-item>
        <el-form-item label="Q3">
          <el-input v-model="formLabelAlign.q3" props="q3"></el-input>
        </el-form-item>
        <el-form-item label="Q4">
          <el-input v-model="formLabelAlign.q4" props="q4"></el-input>
        </el-form-item>
        <el-form-item label="Q5">
          <el-input v-model="formLabelAlign.q5" props="q5"></el-input>
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
        courseName: "",
        courseId: "",
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        state: "",
      },
    };
  },
  methods: {
    getInit() {
      this.formLabelAlign.courseName = this.$route.query.courseName;
      this.formLabelAlign.courseId = this.$route.query.courseId;
      this.formLabelAlign.q1 = this.$route.query.q1;
      this.formLabelAlign.q2 = this.$route.query.q2;
      this.formLabelAlign.q3 = this.$route.query.q3;
      this.formLabelAlign.q4 = this.$route.query.q4;
      this.formLabelAlign.q5 = this.$route.query.q5;
      this.formLabelAlign.state = this.$route.query.state;
    },
    onSubmit() {
      axios
        .put("http://localhost:8181/homeWork/update", this.formLabelAlign)
        .then(this.$router.push("/homeworkshow"));
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