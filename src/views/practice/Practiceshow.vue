<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实训管理</el-breadcrumb-item>
      <el-breadcrumb-item>实训总览</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加实训->转发路由 -->
      <el-button type="primary" plain @click="practiceadd()"
        >添加实训</el-button
      >
      <!-- 栅栏布局+卡片 -->
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, i) in pracData" :key="i"
          ><el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>实训信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="pracDelete(item.pracId)"
              >
                删除
              </el-button>
              <el-button
                style="float: right; padding: 3px 0; margin-right: 6px"
                type="text"
                @click="goToupdate(item.pracId)"
              >
                编辑查看
              </el-button>
            </div>
            <div class="text item">教师: {{ item.teacherName }}</div>
            <div class="text item">阶段1: {{ item.quest1 }}</div>
            <div class="text item">阶段2: {{ item.quest2 }}</div>
            <div class="text item">更多详情请点击查看...</div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {},
  methods: {
    getPracData() {
      let _this = this;
      axios.get("http://localhost:8282/practice/list").then((res) => {
        _this.pracData = res.data;
        // console.log("实训个数:" + _this.pracData.length);
      });
    },
    goToupdate(val) {
      // console.log(val);
      this.$router.push("/practiceupdate?pracId=" + val);
    },
    practiceadd() {
      this.$router.push("/practiceadd");
    },
    pracDelete(pracId) {
      console.log("点击删除", pracId);
      let _this = this;
      axios
        .delete("http://localhost:8282/practice/delete/" + pracId)
        .then((response) => {
          if (response.data) {
            _this.$alert("删除成功！", "删除数据", {
              confirmButtonText: "确定",
              callback: (action) => {
                // 跳转到/实训总览
                // _this.$router.push("/practiceshow");
                location.reload();
              },
            });
          }
        });
    },
  },
  data() {
    return {
      pracData: [],
    };
  },
  activated() {
    this.getPracData();
    console.log("activated");
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