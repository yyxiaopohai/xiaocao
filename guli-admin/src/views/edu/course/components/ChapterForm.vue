<template>
  <div>
    <!-- TODO 能不能动态展现title  添加章节和修改章节 -->
    <el-dialog :visible.sync="dialogVisible" title="添加章节" @close="close">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chapterApi from '@/api/edu/chapter'
export default {
// 父组件向子组件传值
  props: {
    courseId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false, // 隐藏
      chapter: {// 章节对象
        courseId: '',
        title: '',
        sort: 0
      }
    }
  },
  methods: {
    open(chapterId) {
      this.dialogVisible = true
      if (chapterId) {
        chapterApi.getById(chapterId).then(response => {
          this.chapter = response.data.item
        })
      }
    },
    close() {
      this.dialogVisible = false
      this.resetForm()// 关闭模态框之后重置表单
    },
    resetForm() {
      this.chapter = {
        id: null,
        title: '',
        sort: 0
      }
    },
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.save()
      } else {
        this.updated()
      }
    },
    save() {
      console.log(this.chapter)
      // 把父组件传过来的courseId赋值给chapter的id属性
      this.chapter.courseId = this.courseId
      chapterApi.save(this.chapter).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        // 关闭组件
        this.close()
        // 调用父组件监听函数
        // 在这里定义事件调用父组件的方法
        this.$emit('onSaveSuccess')
      })
    },
    updated() {
      chapterApi.updateById(this.chapter).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        // 关闭组件
        this.close()
        // 调用父组件监听函数
        this.$emit('onSaveSuccess')
      })
    }
  }
}
</script>
