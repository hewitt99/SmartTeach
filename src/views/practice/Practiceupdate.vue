<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实训管理</el-breadcrumb-item>
      <el-breadcrumb-item>实训修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain @click="practiceadd()"
        >添加流程</el-button
      >
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, i) in quests" :key="i"
          ><el-card shadow="hover" id="childCard">
            <div slot="header" class="clearfix">
              <span>流程信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="progressDelete(item.questId)"
              >
                删除
              </el-button>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="update2(item.courseId, item.questId)"
              >
                点击修改
              </el-button>
            </div>
            <div class="text item">教师: {{ pracData.teacherName }}</div>
            <div class="text item">阶段名称: {{ item.questName }}</div>
            <div class="text item">参与学生: {{ item.student }}</div>
            <div class="text item">阶段要求: {{ item.content }}</div>
          </el-card></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pracData: {},
      quests: [],
      courseId: 999,
    };
  },
  // created() {
  //   this.getParams();
  // },
  activated() {
    this.getParams();
    console.log("activated");
  },
  methods: {
    getParams() {
      let pracId = this.$route.query.pracId;
      let _this = this;
      axios
        .get("http://localhost:8282/practice/ViewT/" + pracId)
        .then((res) => {
          // console.log(res.data.practice);
          // 这里之前course从quests拿出来，错误！！
          // console.log(res.data.practice.courseId);
          // 把本体组的courseid拿出来
          console.log("updateVUe", res.data.practice.courseId);
          _this.courseId = res.data.practice.courseId;
          // console.log(_this.courseId);
          _this.pracData = res.data.practice;
          // _this.quests = res.data.quests;
          for (const k of res.data.quests) {
            if (k) {
              console.log(k);
              _this.quests.push(k);
            }
          }
        });
    },
    update2(res1, res2) {
      console.log(res1, res2);
      this.$router.push(
        "/practiceupdate2?courseId=" +
          res1 +
          "&questId=" +
          res2 +
          "&pracId=" +
          this.$route.query.pracId
      );
    },
    practiceadd() {
      // console.log("add");
      this.$router.push(
        "/practiceadd2?courseId=" +
          this.courseId +
          "&pracId=" +
          this.$route.query.pracId
      );
    },
    progressDelete(questId) {
      console.log(questId);
      let _this = this;
      console.log("1");
      axios
        .delete("http://localhost:8282/quest/delete/" + questId)
        .then((response) => {
          if (response.data) {
            _this.$alert("删除成功！", "删除数据", {
              confirmButtonText: "确定",
              callback: (action) => {
                // 删除questId，通过pracId查询到value相同，然后置空
                let index = 0;
                for (const k in _this.pracData) {
                  // console.log(index);
                  index++;
                  if (index > 2) {
                    if (_this.pracData[k] == questId) {
                      console.log(index);
                      console.log(questId);
                      console.log(_this.pracData[k]);
                      _this.pracData[k] = null;
                      axios
                        .put(
                          "http://localhost:8282/practice/update",
                          _this.pracData
                        )
                        .then((res) => {
                          console.log(_this.pracData);
                        });
                      break;
                    }
                  }
                }
                // 跳转到/实训总览
                // _this.$router.push(
                //   "/practiceupdate?pracId=" + _this.$route.query.pracId
                // );
                // location.reload();
              },
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

/* 清除浮动 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
/* 修改card头 */
.el-card /deep/ .el-card__header {
  height: 65px;
  padding: 10px;
}
#childCard {
  height: 300px;
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