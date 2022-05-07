<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩查看</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加栅格 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <!-- 搜索和添加区域 -->
          <el-input placeholder="请输入内容" v-model="queryinfo" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="query()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="orderByClass()"
            >按班排序</el-button
          >
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="orderByCourse()"
            >按科排序</el-button
          >
        </el-col>
      </el-row>

      <!-- 成绩展示表 -->
      <!-- 添加v-loading属性,并且在回调函数axios中直到到data获取后结束等待动画 -->
      <!-- table添加height让表头固定 -->
      <el-table
        :data="tableData.slice((currPage - 1) * pageSize, currPage * pageSize)"
        border
        style="width: 100%"
        stripe
        height="430"
      >
        <el-table-column prop="id" label="成绩id" v-if="false">
        </el-table-column>
        <el-table-column prop="sid" label="学号"> </el-table-column>
        <el-table-column prop="sname" label="姓名"> </el-table-column>
        <el-table-column prop="classId" label="班级"></el-table-column>
        <el-table-column prop="major" label="专业"> </el-table-column>
        <el-table-column prop="cid" label="课程码"> </el-table-column>
        <el-table-column prop="cname" label="课程名"> </el-table-column>
        <el-table-column prop="score" label="成绩"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="scoreEdit(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="scoreDelete(scope.row)"
                v-if="false"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- page-sizes自己规定了每页个数 -->
      <!-- total动态获取 -->
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
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      loading: true,
      total: 400, // 总数
      pageSize: 5, // 每页个数
      currPage: 1, // 当前页
      queryinfo: "",
    };
  },
  created() {
    this.getTabledata();
  },
  methods: {
    // 获取数据
    getTabledata() {
      let that = this;
      axios.get("http://localhost:8181/grade/list").then((res) => {
        // console.log(res.data);
        that.tableData = res.data;
        that.total = that.tableData.length;
        this.loading = !this.loading;
      });
    },
    // 删除
    scoreDelete(row) {
      axios.delete(
        "https://www.fastmock.site/mock/9181265b6effb5b25c280c93ed528781/test/scodel" +
          row.id
      );
      console.log("已发送删除");
    },
    // 编辑按钮
    scoreEdit(row) {
      console.log("获取id：", row.id);
      this.$router.push("/scoreupdate?id=" + row.id);
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
    // 查询
    query() {
      const newtable = [];
      for (const k of this.tableData) {
        if (
          this.queryinfo == k.cid ||
          this.queryinfo == k.classId ||
          this.queryinfo == k.cname ||
          this.queryinfo == k.major ||
          this.queryinfo == k.major ||
          this.queryinfo == k.sid ||
          this.queryinfo == k.sname
        ) {
          newtable.push(k);
          console.log(k);
        }
      }
      if (newtable.length) {
        this.tableData = newtable;
        console.log(newtable.length);
      } else {
        // 为空返回所有列表
        this.getTabledata();
      }
    },
    refresh() {
      this.reload;
    },
    orderByClass() {
      axios.get("http://localhost:8181/grade/orderByClass").then((res) => {
        this.tableData = res.data;
      });
    },
    orderByCourse() {
      axios.get("http://localhost:8181/grade/orderByCourse").then((res) => {
        this.tableData = res.data;
      });
    },
  },
};
</script>

<style scoped>
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>