<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测评管理</el-breadcrumb-item>
      <el-breadcrumb-item>测评查看</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col :span="8">
          <!-- 搜索和添加区域 -->
          <el-input
            placeholder="请输入老师ID"
            v-model="queryinfo"
            clearable
            width="300"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="query"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="tableData.slice((currPage - 1) * pageSize, currPage * pageSize)"
        border
        style="width: 100%"
        height="430"
        stripe
      >
        <!-- 隐藏不需要显示的id,但是可以提取到给发送给后端操作 -->
        <el-table-column prop="id" label="测评id" v-if="false">
        </el-table-column>
        <el-table-column prop="stage" label="阶段"> </el-table-column>
        <el-table-column prop="state" label="测评状态"> </el-table-column>

        <el-table-column prop="courseId" label="课程ID"> </el-table-column>
        <el-table-column prop="courseName" label="课程名字"> </el-table-column>
        <el-table-column prop="q1" label="问题1"> </el-table-column>
        <el-table-column prop="q2" label="问题2"> </el-table-column>
        <el-table-column prop="q3" label="问题3"> </el-table-column>
        <el-table-column prop="q4" label="问题4"> </el-table-column>
        <el-table-column prop="q5" label="问题5"> </el-table-column>
        <el-table-column prop="q6" label="问题6"> </el-table-column>
        <el-table-column prop="q7" label="问题7"> </el-table-column>
        <el-table-column prop="q8" label="问题8"> </el-table-column>
        <el-table-column prop="q9" label="问题9"> </el-table-column>
        <el-table-column prop="q10" label="问题10"> </el-table-column>
        <el-table-column prop="tid" label="老师ID"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
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
                @click="cepingupdata(scope.row)"
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
                @click="cepingDelete(scope.row)"
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
      loading: false,
      total: 400, // 总数
      pageSize: 5, // 每页个数
      currPage: 1, // 当前页
      queryinfo: "",
    };
  },
  methods: {
    getInit() {
      axios.get("http://localhost:8181/evaluation/List").then((res) => {
        this.tableData = res.data;
        console.log(res.data);
        this.total = res.data.length;
      });
    },
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
    query() {
      const newtable = [];
      // console.log(this.queryinfo == 1);
      if (this.queryinfo == " ") {
        this.getInit();
      }
      for (const k of this.tableData) {
        if (this.queryinfo == k.tid) {
          newtable.push(k);
          console.log(k);
        }
      }
      if (newtable.length) {
        this.tableData = newtable;
      } else {
        alert("未找到");
        this.getInit();
      }
    },
    cepingDelete(val) {
      console.log(val.id);
      axios
        .delete("http://localhost:8181/evaluation/delete" + val.id)
        .then((res) => {
          location.reload();
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