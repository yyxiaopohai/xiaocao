<template>
  <div>
    <el-input v-model="filterText" placeholder="请输入内容"/>
    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode" />
  </div>
</template>
<script>
import subjectApi from '@/api/edu/subject'
export default {
  data() {
    return {
      filterText: '',
      subjectList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val)
    }
  },
  created() {
    this.fetchNodeList()
  },
  methods: {
    fetchNodeList() {
      subjectApi.getNestedList().then(response => {
        console.log(response)
        this.subjectList = response.data.items
      })
    },
    filterNode(value, data) {
      console.log('value', value)
      console.log('data', data)
      // 如果输入框中没有数据的时候全部展示
      if (!value) return true
      // 如果返回数据的下表不等于-1时说明有数据，
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
