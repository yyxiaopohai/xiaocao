<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="讲师名字">
        <!-- <el-input v-model="searchObj.name" placeholder="讲师名字"/> -->
        <el-autocomplete
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          v-model="searchObj.name"
          placeholder="讲师名字"
          class="inline-input"
          value-key="name"/>
      </el-form-item>
      <el-form-item label="讲师等级">
        <el-select v-model="searchObj.level" placeholder="请选择">
          <el-option label="高级讲师" value="1"/>
          <el-option label="首席讲师" value="2"/>
        </el-select>
        <el-form-item label="入住时间">
          <el-date-picker
            v-model="searchObj.joinDateBegin"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始时间"/>
        </el-form-item>
        <el-form-item>
          至
          <el-date-picker
            v-model="searchObj.joinDateEnd"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="结束时间"/>
        </el-form-item>

      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="defualt" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 批量删除按钮 -->
    <div style="margin-bottom:10px;">
      <el-button type="danger" size="mini" @click="batchRemove">批量删除</el-button>
    </div>

    <!-- 表格组件 -->
    <el-table
      :data="list"
      stripe
      border
      style="width: 100%"
      @selection-change="handleSecletionChange">
      <!-- 多选列 -->
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.level === 1">
            <el-tag type="success" size="mini">高级讲师</el-tag>
          </span>
          <span v-if="scope.row.level === 2">
            <el-tag size="mini">首席讲师</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />

      <el-table-column label="入驻时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.joinDate }}
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-size="limit"
      :page-sizes="[5,10,20]"
      layout="sizes, prev, pager, next, jumper, ->, total"
      @size-change="changeSize"
      @current-change="changeCurrent"/>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'

export default {
  data() {
    return {
      list: null,
      total: 0,
      page: 1,
      limit: 5,
      searchObj: {

      },
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    querySearch(queryString, cb) {
      console.log('queryString', queryString)
      console.log('cb', cb)
      teacherApi.selectNameListByKey(queryString).then(response => {
        const results = response.data.nameList
        console.log(results)
        cb(results)
      })
      // var restaurants = this.restaurants;
      // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // // 调用 callback 返回建议列表的数据
    },
    handleSecletionChange(selection) {
      console.log('selection', selection)
      this.multipleSelection = selection
    },
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据',
          duration: 3000,
          showClose: true
        })
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        return teacherApi.batchRemove(idList)
      }).then(response => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: response.message
        })
      }).catch(error => {
        console.log(error)
        if (error === 'cancel') {
          this.$message({
            type: 'info',
            message: '取消删除',
            duration: 3000,
            showClose: true
          })
        }
      })
    },
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    changeSize(size) {
      console.log('页面个数改变', size)
      this.limit = size
      this.fetchData()
    },
    changeCurrent(page) {
      console.log('当前页码数', page)
      this.page = page
      this.fetchData()
    },
    fetchData() {
      teacherApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.raws
        this.total = response.data.total
        console.log(response)
      })
    },
    removeById(teacherId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return teacherApi.removeById(teacherId)
      }).then(response => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: response.message
        })
      }).catch(error => {
        console.log(error)
        if (error === 'cancel') {
          this.$message({
            type: 'info',
            message: '取消删除',
            duration: 3000,
            showClose: true
          })
        }
      })
    }
  }
}
</script>
