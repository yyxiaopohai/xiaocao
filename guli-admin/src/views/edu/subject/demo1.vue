<template>
  <div>
    <el-input v-model="message"/>

    <p>{{ fanzhuan() }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    fanzhuan() { // 这里是方法的调用，不是方法的引用（出现方法未定义）。
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

