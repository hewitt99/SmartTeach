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
        <el-form-item label="单选题">
          <el-input
            v-model="formLabelAlign.optionQuestion"
            props="optionQuestion"
          ></el-input>
        </el-form-item>
        <el-form-item label="多选题">
          <el-input v-model="formLabelAlign.mOption" props="mOption"></el-input>
        </el-form-item>
        <el-form-item label="判断题">
          <el-input
            v-model="formLabelAlign.judgment"
            props="judgment"
          ></el-input>
        </el-form-item>
        <el-form-item label="简答题">
          <el-input
            v-model="formLabelAlign.completion"
            props="completion"
          ></el-input>
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
        id: 1,
        optionQuestion: "",
        mOption: "默认",
        completion: "默认",
        judgment: "默认",
      },
    };
  },
  methods: {
    getInit() {
      // console.log(this.$route.query.courseId);
      // console.log(this.$route.params);
      this.formLabelAlign.id = this.$route.query.id;
      this.formLabelAlign.optionQuestion = this.$route.query.optionQuestion;
      this.formLabelAlign.mOption = this.$route.query.mOption;
      this.formLabelAlign.completion = this.$route.query.completion;
      this.formLabelAlign.judgment = this.$route.query.judgment;
    },
    onSubmit() {
      console.log(this.formLabelAlign);
      // 等一下要改
      axios
        .put("http://localhost:8181/test/updateType", this.formLabelAlign)
        .then(this.$router.push("/topicManage"));
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