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
@import '../../assets/style/mixin.scss';
.header-container {
  font-size: px2rem(20);
  height: px2rem(40);
  line-height: px2rem(40);
  width: 100%;
  text-align: center;
}
</style>
