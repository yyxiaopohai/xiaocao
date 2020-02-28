<template>
  <div>

    <p><el-input v-model="message"/></p>

    <p>{{ fanzhuan }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  computed: {// 计算是按照属性
    fanzhuan() {
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

