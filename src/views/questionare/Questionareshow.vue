<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问卷中心</el-breadcrumb-item>
      <el-breadcrumb-item>问卷总览</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加问卷->转发路由 -->
      <el-button type="primary" plain @click="qustionareadd()"
        >添加问卷</el-button
      >
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item, i) in questData" :key="i">
          <el-card shadow="hover">
            <el-row :gutter="20">
              <el-col :span="16"
                ><span>{{ item.qsnName }}</span></el-col
              >
              <el-col :span="4"
                ><el-button
                  type="primary"
                  size="small"
                  @click="questionartupdate2(item.qsnNum)"
                  >查看</el-button
                >
              </el-col>
              <el-col :span="4"
                ><el-button
                  type="primary"
                  size="small"
                  @click="questionaredelete(item.qsnNum)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
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
      questData: [],
    };
  },
  methods: {
    getData() {
      axios.get("http://localhost:8282/questionare/list").then((res) => {
        console.log(res.data);
        this.questData = res.data;
      });
    },
    qustionareadd() {
      console.log("add");
      this.$router.push("/questionareadd");
    },
    questionartupdate2(qsNum) {
      console.log("update2");
      console.log(qsNum);
      this.$router.push("/questionareupdate2?qsnId=" + qsNum);
    },
    questionaredelete(qsnNum) {
      axios
        .delete("http://localhost:8282/questionare/delete/" + qsnNum)
        .then(console.log("delete"));
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>