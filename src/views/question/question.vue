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
      <el-table
        :data="tableData.slice((currPage - 1) * pageSize, currPage * pageSize)"
        border
        style="width: 100%"
        height="430"
        v-loading="loading"
        stripe
      >
        <!-- 隐藏id,可以提取给后端 -->
        <el-table-column prop="qsNum" label="问题id" v-if="false">
        </el-table-column>

        <el-table-column prop="courseName" label="课程分类" width="100px">
        </el-table-column>
        <el-table-column prop="classId" label="学生班级" width="60px">
        </el-table-column>
        <el-table-column prop="qsType" label="问题类型" width="120px">
        </el-table-column>
        <el-table-column prop="qsText" label="问题描述"> </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="回答"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="questionupdata(scope.row)"
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
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      total: 400, // 总数
      pageSize: 5, // 每页个数
      currPage: 1, // 当前页
    };
  },
  created() {
    this.getQuestiondata();
  },
  methods: {
    getQuestiondata() {
      let that = this;
      axios.get("http://localhost:8282/question/list").then((res) => {
        // that.formLabelAlign = res.data;
        console.log(res.data);
        that.tableData = res.data;
        that.total = that.tableData.length;
      });
    },
    // 按钮修改
    questionupdata(row) {
      // console.log(row.qsNum);
      this.$router.push("/questionupdate?qsNum=" + row.qsNum);
    },
    // 分页操作
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
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>