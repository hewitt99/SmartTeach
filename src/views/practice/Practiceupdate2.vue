<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实训管理</el-breadcrumb-item>
      <el-breadcrumb-item>实训修改</el-breadcrumb-item>
      <el-breadcrumb-item>流程修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 表单 -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <el-form-item label="阶段名称" prop="questName">
          <el-input v-model="formLabelAlign.questName"></el-input>
        </el-form-item>
        <el-form-item label="参与学生" prop="student">
          <el-input v-model="formLabelAlign.student"></el-input>
        </el-form-item>
        <el-form-item label="阶段要求" prop="content">
          <el-input v-model="formLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formLabelAlign')"
            >立即修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "top",
      formLabelAlign: {
        questName: "",
        student: "",
        content: "",
      },
      rules: {
        questName: [
          { required: true, message: "请输入阶段名称", trigger: "blur" },
        ],
        student: [
          { required: true, message: "请输入参与学生", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入阶段要求", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let courseId = this.$route.query.courseId;
      let questId = this.$route.query.questId;
      let _this = this;

      axios
        .get("http://localhost:8282/quest/findCID/" + courseId)
        .then((res) => {
          // console.log(res.data);
          for (const k of res.data) {
            if (k.questId == questId) {
              console.log(k);
              _this.formLabelAlign = k;
              // console.log(k);
            }
          }
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this;
          axios
            .put("http://localhost:8282/quest/update", this.formLabelAlign)
            .then(function (response) {
              if (response.data) {
                _this.$alert(
                  _this.formLabelAlign.questName + "添加成功！",
                  "修改数据",
                  {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      // 跳转到/courseshow
                      _this.$router.push(
                        "/practiceupdate?pracId=" + _this.$route.query.pracId
                      );
                    },
                  }
                );
              }
            });
        }
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