<template>
  <div class="header-container">{{title}}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '黑兔纸'
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  font-size: .8rem;
  height: 1.6rem;
  line-height: 1.6rem;
  width: 100%;
  text-align: center;
}
</style>
