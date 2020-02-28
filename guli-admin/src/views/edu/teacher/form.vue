<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="teacher.joinDate"
          type="date"
          placeholder="选择入驻时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">

        <!-- 图片预览 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 上传按钮 -->
        <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">上传图片
        </el-button>
        <!-- 上传组件 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :field="file"
          url="http://localhost:8120/admin/oss/file/upload?module=avator"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
// 导入模块组件
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      saveBtnDisabled: false, // 默认按钮是可以使用的
      teacher: {
      },
      imagecropperShow: false,
      imagecropperKey: 0, // 防止组件重用
      file: 'file'
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch执行')
      console.log('to', to)
      console.log('from', from)
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    close() {
      this.imagecropperShow = false
      this.imagecropperKey++// 避免组件重用
    },
    cropSuccess(resData) {
      console.log('resData', resData)
      this.teacher.avatar = resData.url
      this.imagecropperShow = false
      this.imagecropperKey++
    },
    init() {
      if (this.$route.params.id) {
        this.fetchDataById(this.$route.params.id)
      } else {
        this.teacher = {
          sort: 0,
          level: 1,
          avatar: process.env.OSS_PATH + '/head-portrait/u%3D2844401865%2C2654823704%26fm%3D26%26gp%3D0.jpg'
          // avatar: 'https://guli190805.oss-cn-beijing.aliyuncs.com/head-portrait/u%3D2844401865%2C2654823704%26fm%3D26%26gp%3D0.jpg'
        }
      }
    },
    saveOrUpdate() {
      console.log('saveOrUpdate')
      this.saveBtnDisabled = true// 按钮使用之后，将按钮禁用
      if (this.$route.params.id) {
        this.updateData()
      } else {
        this.saveData()
      }
    },
    fetchDataById(id) {
      teacherApi.getById(this.$route.params.id).then(response => {
        this.teacher = response.data.item
      })
    },

    saveData() {
      teacherApi.save(this.teacher).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/edu/teacher' })
      })
    },

    updateData() {
      teacherApi.updateById(this.teacher).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/edu/teacher' })
      })
    }
  }
}
</script>
