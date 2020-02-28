<template>
  <div>
    <!-- 添加章节按钮 -->
    <div>
      <el-button style="width:100%" @click="addChapter()">添加章节</el-button>
    </div>

    <!-- 章节列表 -->
    <!-- 使用ul--li表示树结构 -->
    <!-- class用来定义css样式, -->
    <ul class="chapterList">
      <li
        v-for="chapter in chapterNestedList"
        :key="chapter.id">
        <p>
          <!-- 课程章节名称 -->
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="addVideo(chapter.id)">添加课时</el-button>
            <el-button type="text" @click="editChapter(chapter.id)">编辑章节</el-button>
            <el-button type="text" @click="removeChapterById(chapter.id)">删除章节</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <!-- class用来定义css样式, -->
        <ul class="chapterList videoList">
          <!-- 使用v-for必须有唯一标志:key -->
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>
              <!-- 课程视频名称 -->
              {{ video.title }}
              <span class="acts">
                <!-- videoSourceId用来判断是否上传了视频 -->
                <el-tag v-if="video.videoSourceId === ''" size="mini" type="danger">
                  {{ '尚未上传视频' }}
                </el-tag>
                <!-- video.free用来判断视频是否免费 -->
                <el-tag v-if="video.free" size="mini" type="success">{{ '免费观看' }}</el-tag>
                <el-button type="text" @click="editVideo(chapter.id, video.id)" >编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 章节表单对话框 TODO -->
    <chapter-form
      ref="chapterForm"
      :course-id="courseId"
      @onSaveSuccess="init"/><!-- 和子组件绑定，子组件触发时间后调用init方法，刷新列表 -->

    <!-- 课时表单对话框 TODO -->
    <!-- ref属性用来调用子组件中的方法 -->
    <video-form
      ref="videoForm"
      :course-id="courseId"
      @onSaveSuccess="init" />

  </div>
</template>
<script>
import chapterApi from '@/api/edu/chapter'
import videoApi from '@/api/edu/video'
// 在父组件中注册子组件
import ChapterForm from '@/views/edu/course/components/ChapterForm'
import VideoForm from '@/views/edu/course/components/VideoForm'
export default {
  // 父组件向子组件传值
  components: {
    ChapterForm,
    VideoForm
  },
  props: {
    courseId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      chapterNestedList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    editVideo(chapterId, videoId) {
      this.$refs.videoForm.open(chapterId, videoId)
    },
    addVideo(chapterId) {
      this.$refs.videoForm.open(chapterId)
    },
    editChapter(chapterId) {
      this.$refs.chapterForm.open(chapterId)
    },
    addChapter() {
      this.$refs.chapterForm.open()
    },
    init() {
      chapterApi.getNestedTreeList(this.courseId).then(response => {
        this.chapterNestedList = response.data.items
      })
    },
    removeChapterById(chapterId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return chapterApi.removeById(chapterId)
      }).then(() => {
        // 刷新列表
        this.init()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    removeVideo(videoId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return videoApi.removeById(videoId)
      }).then(() => {
        this.init()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.chapterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dashed #DDD;
}
</style>
