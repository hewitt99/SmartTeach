<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程资源</el-breadcrumb-item>
      <el-breadcrumb-item>课程资源总览</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- =================文件上传============================== -->
      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :before-upload="handleBeforeUpload"
        :on-error="handleUploadError"
        :before-remove="beforeRemove"
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="fileList"
        width="15"
      >
        <el-tooltip class="item" effect="dark" content="上传" placement="top">
          <el-button type="primary" icon="el-icon-upload"></el-button>
        </el-tooltip>
      </el-upload>
      <!-- =============================================== -->
      <el-table
        :data="tableData.slice((currPage - 1) * pageSize, currPage * pageSize)"
        border
        style="width: 100%"
        height="430"
        stripe
      >
        <!-- 隐藏不需要显示的id,但是可以提取到给发送给后端操作 -->
        <el-table-column prop="csRscNum" label="真id" v-if="false">
        </el-table-column>
        <el-table-column prop="csRscId" label="课程资源id"> </el-table-column>
        <el-table-column prop="csRscName" label="资源名"> </el-table-column>
        <el-table-column prop="csRscType" label="资源类型"> </el-table-column>
        <el-table-column prop="teacherName" label="老师名"></el-table-column>
        <el-table-column prop="courseName" label="课程名字"> </el-table-column>

        <!-- 操作栏 -->
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="下载"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-download"
                @click="resourcedownload(scope.row)"
              >
                <a :href="herfT">下载附件</a>
              </el-button>
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
                @click="resourceDelete(scope.row)"
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
      uploadUrl: "http://localhost:8282/courseResource/upload", // 上传路径
      fileList: [], // 上传数组
      postData: {
        csRscName: "",
      },
      herfT: "www.baidu.com",
    };
  },
  methods: {
    resourceDelete(row) {
      // console.log(row.csRscName);
      console.log(row.csRscNum);
      axios
        .delete("http://localhost:8282/courseResource/delete/" + row.csRscNum)
        .then(console.log("delete"));
      location.reload();
    },
    resourcedownload(row) {
      console.log(row);
      this.herfT =
        "http://localhost:8282/courseResource/download?fileName=" +
        row.csRscName;
      console.log(herfT);
    },
    getData() {
      let that = this;
      axios.get("http://localhost:8282/courseResource/list").then((res) => {
        // 打印获取数据
        that.tableData = res.data;
        console.log("axios获取数据： ", res.data);
        that.total = that.tableData.length;
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
    // =====================================
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleUploadError(error, file) {
      console.log("文件上传出错：" + error);
      // this.$notify.error({
      //          title: 'error',
      //          message: '上传出错:' +  error,
      //          type: 'error',
      //          position: 'bottom-right'
      //        })
    },
    //测试上传文件(注意web的上下文)
    handleBeforeUpload(file) {
      this.uploadUrl = "http://localhost:8282/courseResource/upload";
      console.log("开始上传，上传的文件为：" + file);
      let formData = new FormData();
      let that = this;
      formData.append("multipartFiles", file);
      axios({
        method: "post",
        url: "http://localhost:8282/courseResource/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log("文件上传返回：" + res);
          that.postData.csRscName = file.name;
          axios
            .post("http://localhost:8282/courseResource/add", that.postData)
            .then((res) => {
              console.log("post");
              location.reload();
            });
        })
        .catch((error) => {
          console.log("文件上传异常:" + error);
        });

      // this.uploadUrl ='http://192.168.43.152:8089/file/upload'
    },
  },
  // ================================================
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