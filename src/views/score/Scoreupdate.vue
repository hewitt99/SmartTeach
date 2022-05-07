<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩修改</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="60">
          <el-col :span="8"
            ><el-form-item label="学生学号">
              <el-input v-model="form.sid" disabled></el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="学生姓名">
              <el-input v-model="form.sname" disabled></el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="学生专业">
              <el-input v-model="form.major" disabled></el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="学生班级">
              <el-input
                v-model="form.classId"
                disabled
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="考试科目">
              <el-input v-model="form.cname" disabled></el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="考试成绩">
              <el-input v-model="form.score"></el-input> </el-form-item
          ></el-col>
        </el-row>
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
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      form: {},
      readonly: true,
    };
  },
  created() {
    // 拿到传递的参数,请求数据后展示
    let sid = this.$route.query.id;
    // console.log("updata:", id);
    let taht = this;
    axios.get("http://localhost:8181/grade/student/" + sid).then((response) => {
      console.log(response.data);
      taht.form = response.data[0];
    });
  },
  methods: {
    onSubmit() {
      axios.put("http://localhost:8181/grade/update", this.form).then((res) => {
        console.log("update");
        this.$router.push("/scoreshow");
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