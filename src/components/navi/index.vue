<template>
  <div class="navi-container">
    <img @click="onLeft" class="icon" :src="latest?disLeftSrc:leftSrc" alt="">
    <div class="title">{{title}}</div>
    <img @click="onRight" class="icon" :src="first?disRightSrc:rightSrc" alt="">
  </div>
</template>

<script>

export default {
  props: {
    first: {
      type: Boolean,
      default: false
    },
    latest: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      leftSrc: require('./images/triangle@left.png'),
      disLeftSrc: require('./images/triangle.dis@left.png'),
      rightSrc: require('./images/triangle@right.png'),
      disRightSrc: require('./images/triangle.dis@right.png')
    }
  },
  methods: {
    onLeft () {
      if (this.latest) return
      this.$emit('next')
    },
    onRight () {
      if (!this.first) {
        this.$emit('prev')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.navi-container {
  width: px2rem(300);
  height: px2rem(40);
  @include row();
  @include center();
  background-color: #f7f7f7;
  border-radius: px2rem(2);
  .icon {
    flex: 0 0 px2rem(40);
    width: px2rem(40);
    height: px2rem(40);
  }
  .title {
    flex: 1;
    font-size: px2rem(14);
    text-align: center;
  }
}
</style>
