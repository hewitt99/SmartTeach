<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作业管理</el-breadcrumb-item>
      <el-breadcrumb-item>作业查看</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 添加实训->转发路由 -->
      <el-button type="primary" plain @click="homeadd()">添加作业</el-button>
      <!-- 栅栏布局+卡片 -->
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, i) in homeData" :key="i"
          ><el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>作业信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="homeDelete(item.id)"
              >
                删除
              </el-button>
              <el-button
                style="float: right; padding: 3px 0; margin-right: 6px"
                type="text"
                @click="goToupdate(item)"
              >
                编辑查看
              </el-button>
            </div>
            <div class="text item">课程名: {{ item.courseName }}</div>
            <div class="text item">题目1: {{ item.q1 }}</div>
            <div class="text item">题目2: {{ item.q2 }}</div>
            <div class="text item">题目3: {{ item.q3 }}</div>
            <div class="text item">状态: {{ item.state }}</div>
            <div class="text item">更多详情请点击查看...</div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeData: [],
    };
  },
  methods: {
    getInit() {
      axios.get("http://localhost:8181/homeWork/List").then((res) => {
        this.homeData = res.data;
      });
    },
    homeadd() {
      console.log("添加作业");
      this.$router.push("/homeworkadd");
    },
    homeDelete(val) {
      console.log("删除作业", val);
      axios
        .delete("http://localhost:8181/homeWork/delete/" + val)
        .then((res) => {
          location.reload();
        });
    },
    goToupdate(val) {
      console.log(val);
      this.$router.push(
        "/homeworkupdate?courseId=" +
          val.courseId +
          "&courseName=" +
          val.courseName +
          "&q1=" +
          val.q1 +
          "&q2=" +
          val.q2 +
          "&q3=" +
          val.q3 +
          "&q4=" +
          val.q4 +
          "&q5=" +
          val.q5 +
          "&state=" +
          val.state
      );
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
/* 清除浮动 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
/* 内容格式 */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 8px;
  height: 40px;
  line-height: 40px;
}
</style>