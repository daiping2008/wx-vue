<template>
  <div class="music-container">
    <img class="img" :src="data.image" alt="">
    <img class="player-img" :src="playing?playSrc:pauseSrc" alt="">
    <img class="tags" src="./images/music@tag.png" alt="">
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
  },
  data () {
    return {
      playing: false,
      pauseSrc: require('./images/player@waitting.png'),
      playSrc: require('./images/player@playing.png')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common.scss';
.music-container {
  .img {
    width: px2rem(211);
    height: px2rem(211);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    top: px2rem(39);
  }
  .player-img {
    position: absolute;
    width: px2rem(60);
    height: px2rem(60);
    top: px2rem(114.5);
  }
}
</style>
