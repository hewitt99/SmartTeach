<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问卷中心</el-breadcrumb-item>
      <el-breadcrumb-item>问卷总览</el-breadcrumb-item>
      <el-breadcrumb-item>问卷添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
        v-if="tableShow"
      >
        <el-form-item label="老师名" prop="teacherName">
          <el-input v-model="formLabelAlign.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="问卷名字" prop="qsnName">
          <el-input v-model="formLabelAlign.qsnName"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('formLabelAlign')"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 问题填写
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formquestion"
        :rules="rules"
        ref="formquestion"
        v-if="!tableShow"
      >
        <el-form-item label="问卷号" prop="qsnId">
          <el-input v-model="formquestion.qsnId"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" prop="qstType">
          <el-input v-model="formquestion.qstType"></el-input>
        </el-form-item>
         <el-form-item label="问卷题目" prop="qstType">
          <el-input v-model="formquestion.qstType"></el-input>
        </el-form-item>
         <el-form-item label="问卷题1" prop="qstType">
          <el-input v-model="formquestion.qstType"></el-input>
        </el-form-item>
         <el-form-item label="问卷题2" prop="qstType">
          <el-input v-model="formquestion.qstType"></el-input>
        </el-form-item>
         <el-form-item label="问卷题3" prop="qstType">
          <el-input v-model="formquestion.qstType"></el-input>
        </el-form-item>
         <el-form-item label="问卷题4" prop="qstType">
          <el-input v-model="formquestion.qstType"></el-input>
        </el-form-item>
         <el-form-item label="问卷题5" prop="qstType">
          <el-input v-model="formquestion.qstType"></el-input>
        </el-form-item> -->

      <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit('formquestion')"
            >下一步</el-button
          >
        </el-form-item>
      </el-form> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      tableShow: true,
      formLabelAlign: {
        teacherName: "",
        qsnName: "",
      },
      formquestion: {
        qsnId: "",
        qstType: "", //题型
        qst: "", //题目
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        opt5: "",
      },
      rules: {
        teacherName: [
          { required: true, message: "请输入老师名字", trigger: "blur" },
        ],
        qsnName: [
          { required: true, message: "请输入问卷名字", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 确认修改
    onSubmit(formName) {
      this.tableShow = !this.tableShow;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this;
          axios
            .post("http://localhost:8282/questionare/add", _this.formLabelAlign)
            .then(function (response) {
              if (response.data) {
                _this.$alert(
                  _this.formLabelAlign.qsnName + "创建成功！",
                  "创建问卷",
                  {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      //跳转到/courseshow
                      _this.$router.push("/questionareshow");
                    },
                  }
                );
              }
            });
        }
      });
    },
    getqsnareData() {
      axios.get("http://localhost:8282/questionare/list").then((res) => {
        // res.length就是子表的某id
        console.log(res.data[res.data.length - 1]);
      });
    },
  },
  created() {
    this.getqsnareData();
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>