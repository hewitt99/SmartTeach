<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问题中心</el-breadcrumb-item>
      <el-breadcrumb-item>问题回复</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="问题回复">
          <el-input type="textarea" v-model="form.ansText"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')"
            >立即提交</el-button
          >
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ansText: "",
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this;
          axios
            .put("http://localhost:8282/question/update", this.form)
            .then(function (response) {
              if (response.data) {
                _this.$alert("回复成功！", "修改数据", {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    //跳转到/table
                    _this.$router.push("/question");
                  },
                });
              }
            });
        }
      });
    },
  },
  created() {
    let qsNum = this.$route.query.qsNum;
    let _this = this;
    axios
      .get("http://localhost:8282/question/find/" + qsNum)
      .then(function (response) {
        _this.form = response.data;
      });
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>