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
.like-container {
  display: inline-flex;
  flex-direction: row;
  padding: 0.2rem;
  .img {
    width: 0.64rem;
    height: 0.64rem;
  }
  .count {
    font-size: 0.48rem;
    color: #cccccc;
    position: relative;
    bottom: .2rem;
    left: 0.12rem;
  }
}
</style>
