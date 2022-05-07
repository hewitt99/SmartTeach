<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作业管理</el-breadcrumb-item>
      <el-breadcrumb-item>作业添加</el-breadcrumb-item>
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
        <el-form-item label="作业状态">
          <el-input v-model="formLabelAlign.state"></el-input>
        </el-form-item>
        <el-form-item label="问题1">
          <el-input v-model="formLabelAlign.q1"></el-input>
        </el-form-item>
        <el-form-item label="问题2">
          <el-input v-model="formLabelAlign.q2"></el-input>
        </el-form-item>
        <el-form-item label="问题3">
          <el-input v-model="formLabelAlign.q3"></el-input>
        </el-form-item>
        <el-form-item label="问题4">
          <el-input v-model="formLabelAlign.q4"></el-input>
        </el-form-item>
        <el-form-item label="问题5">
          <el-input v-model="formLabelAlign.q5"></el-input>
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
        state: "",
        q1: 1,
        q2: 1,
        q3: 1,
        q4: 1,
        q5: 1,
      },
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("http://localhost:8181/homeWork/addHomeWork", this.formLabelAlign)
        .then((res) => {
          this.$router.push("/homeworkshow");
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
</style>