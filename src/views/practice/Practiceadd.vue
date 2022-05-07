<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问题中心</el-breadcrumb-item>
      <el-breadcrumb-item>问题查看</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 表单 -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <!-- 通过题组id,将流程分到同一个实训里面,主键questId自增 -->
        <el-form-item label="教师名字" prop="teacherName">
          <el-input v-model="formLabelAlign.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="课程编号" prop="courseId">
          <el-input v-model="formLabelAlign.courseId" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formLabelAlign')"
            >立即添加
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readonly: true,
      labelPosition: "top",
      formLabelAlign: {
        teacherName: "",
        courseId: 9,
      },
      rules: {
        teacherName: [
          { required: true, message: "请输入教师名字", trigger: "blur" },
        ],
        courseId: [
          { required: true, message: "请输入课程编号", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    getPracData() {
      let _this = this;
      axios.get("http://localhost:8282/practice/list").then((res) => {
        console.log(res.data[0].courseId);
        // 为了获取课程id，来自增设置
        // 拿到最后的k
        let k = [];
        for (k of res.data) {
          console.log("遍历DATA获取最后的K");
        }
        // 赋值，前端自增1
        k.courseId = k.courseId + 1;
        console.log("自增后：" + k.courseId);
        _this.formLabelAlign.courseId = k.courseId;
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this;
          axios
            .post("http://localhost:8282/practice/add", this.formLabelAlign)
            .then(function (response) {
              // console.log(response);
              if (response.data) {
                _this.$alert(
                  _this.formLabelAlign.teacherName + "添加成功！",
                  "添加数据",
                  {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      // 跳转到/实训总览
                      _this.$router.push("/practiceshow");
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
    this.getPracData();
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>