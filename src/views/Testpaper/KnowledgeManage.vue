<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>试卷试题管理</el-breadcrumb-item>
      <el-breadcrumb-item>知识点管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" round @click="pointadd()">添加知识点</el-button>
      <el-table
        :data="tableData.slice((currPage - 1) * pageSize, currPage * pageSize)"
        border
        style="width: 100%"
        height="430"
        stripe
      >
        <!-- 隐藏主键num,可以提取给后端 -->
        <el-table-column prop="num" label="id" v-if="false"> </el-table-column>

        <el-table-column prop="courseId" label="课程编号"> </el-table-column>
        <el-table-column prop="courseName" label="课程名"> </el-table-column>
        <el-table-column prop="text" label="文本"> </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="pointupdate(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="pointdelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[3, 5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 400, // 总数
      pageSize: 5, // 每页个数
      currPage: 1, // 当前页
    };
  },
  created() {
    axios.get("http://localhost:8181/test/pointList").then((res) => {
      console.log(res.data);
      this.tableData = res.data;
      this.total = res.data.length;
    });
  },
  methods: {
    handleSizeChange(val) {
      // 改变每页个数
      this.pageSize = val;
      //重置当前页为第一页
      this.currPage = 1;
    },
    handleCurrentChange(val) {
      //点击改变当前页
      this.currPage = val;
    },
    pointupdate(val) {
      this.$router.push(
        "/pointupdate?courseId=" +
          val.courseId +
          "&courseName=" +
          val.courseName +
          "&text=" +
          val.text +
          "&num=" +
          val.num
      );
    },
    pointdelete(val) {
      console.log(val.num);
      axios
        .delete("http://localhost:8181/test/deletePoint/" + val.num)
        .then((res) => {
          location.reload;
        });
    },
    pointadd() {
      console.log("pointadd");
      this.$router.push("/pointadd");
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