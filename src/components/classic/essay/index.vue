<template>
  <div class="essay-container">
    <img class="img" :src="data.image" alt="">
    <img class="tags" src="./images/essay@tag.png" alt="">
    <div class="content">{{data.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common.scss';
</style>
