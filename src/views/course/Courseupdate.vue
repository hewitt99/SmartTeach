<template>
  <!-- 课程资源修改 -->
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 表单区域 -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <el-form-item label="课程名" prop="courseName">
          <el-input v-model="formLabelAlign.courseName"></el-input>
        </el-form-item>
        <el-form-item label="科任老师" prop="teacherName">
          <el-input v-model="formLabelAlign.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="开课时间" prop="courseDate">
          <!-- <el-input v-model="formLabelAlign.courseDate"></el-input> -->
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formLabelAlign.courseDate"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开课地点" prop="courseAdd">
          <el-input v-model="formLabelAlign.courseAdd"></el-input>
        </el-form-item>

        <el-form-item label="当前报名人数" prop="coursePop">
          <el-input v-model="formLabelAlign.coursePop"></el-input>
        </el-form-item>
        <el-form-item label="课程人数上限" prop="courseMax">
          <el-input v-model="formLabelAlign.courseMax"></el-input>
        </el-form-item>
        <el-form-item label="课程状态" prop="bool">
          <el-select v-model="formLabelAlign.bool" placeholder="请设置课程状态">
            <el-option label="可选" value="1"></el-option>
            <el-option label="不可选" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程信息" prop="courseInf">
          <el-input
            v-model="formLabelAlign.courseInf"
            type="textarea"
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
        courseName: "",
        teacherName: "",
        courseDate: "",
        courseAdd: "",
        courseInf: "",
        coursePop: "",
        courseMax: "",
        bool: "",
      },
      rules: {
        courseName: [
          { required: true, message: "请输入课程名", trigger: "blur" },
        ],
        teacherName: [
          { required: true, message: "请输入老师名字", trigger: "blur" },
        ],
        courseDate: [
          { required: true, message: "请输入课程日期", trigger: "blur" },
        ],
        courseAdd: [
          { required: true, message: "请输入上课地点", trigger: "blur" },
        ],
        courseInf: [
          { required: true, message: "请输入课程信息", trigger: "blur" },
        ],
        coursePop: [
          { required: true, message: "请输入已选择人数", trigger: "blur" },
        ],
        courseMax: [
          { required: true, message: "请输入人数上线", trigger: "blur" },
        ],
        bool: [{ required: true, message: "请选择课程状态", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 确认修改
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this;
          axios
            .put("http://localhost:8282/course/update", this.formLabelAlign)
            .then(function (response) {
              if (response.data) {
                _this.$alert(
                  _this.formLabelAlign.courseName + "修改成功！",
                  "修改数据",
                  {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      //跳转到/courseshow
                      _this.$router.push("/courseshow");
                    },
                  }
                );
              }
            });
        }
      });
    },
  },
  created() {
    let cnum = this.$route.query.cnum;
    let _this = this;
    axios
      .get("http://localhost:8282/course/find/" + cnum)
      .then(function (response) {
        _this.formLabelAlign = response.data;
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