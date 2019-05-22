<template>
  <div class="like-container">
    <img @click="onClick" class="img" :src="img" alt="">
    <span class="count">{{likeCount}}</span>
  </div>
</template>

<script>
export default {
  props: {
    like: {
      type: Boolean,
      default: false
    },
    likeCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      likeSrc: require('./images/like.png'),
      unLikeSrc: require('./images/like@dis.png')
    }
  },
  computed: {
    img () {
      return this.like ? this.likeSrc : this.unLikeSrc
    }
  },
  methods: {
    onClick () {
      this.$emit('onLike', {
        like: this.like,
        likeCount: this.likeCount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.like-container {
  display: inline-flex;
  flex-direction: row;
  padding: pa2rem(5) 0;
  .img {
    width: px2rem(16);
    height: px2rem(16);
  }
  .count {
    font-size: px2rem(12);
    color: #cccccc;
    position: relative;
    bottom: px2rem(5);
    left: px2rem(3);
  }
}
</style>
