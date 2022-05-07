<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>题型管理</el-breadcrumb-item>
      <el-breadcrumb-item>题型查看</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" round @click="topicadd()">添加题型</el-button>
      <el-table
        :data="tableData.slice((currPage - 1) * pageSize, currPage * pageSize)"
        border
        style="width: 100%"
        height="430"
        stripe
      >
        <!-- 隐藏主键num,可以提取给后端 -->
        <el-table-column prop="id" label="id" v-if="false"> </el-table-column>

        <el-table-column prop="optionQuestion" label="单选题">
        </el-table-column>
        <el-table-column prop="mOption" label="多选题"> </el-table-column>
        <el-table-column prop="judgment" label="判断题"> </el-table-column>
        <el-table-column prop="completion" label="简答题"> </el-table-column>
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
                @click="topicupdate(scope.row)"
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
                @click="topicdelete(scope.row)"
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
    getInit() {
      axios.get("http://localhost:8181/test/typeList").then((res) => {
        this.tableData = res.data;
        this.total = this.tableData.length;
      });
    },
    topicadd() {
      console.log("topicadd");
      this.$router.push("/topicadd");
    },
    topicdelete(row) {
      console.log("delete");
      axios.delete("http://localhost:8181/deleteType/" + row.id).then((rew) => {
        location.reload();
      });
    },
    topicupdate(val) {
      console.log("update");
      console.log(val);
      this.$router.push({
        path: "/topicupdate",
        query: {
          id: val.id,
          optionQuestion: val.optionQuestion,
          mOption: val.mOption,
          completion: val.completion,
          judgment: val.judgment,
        },
      });
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
</style>