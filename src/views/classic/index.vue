<template>
  <div class="classic-container">
    <v-header title='分类'></v-header>
    <div class="header">
      <v-spisode></v-spisode>
      <v-like :like='like' :likeCount='likeCount' @onLike='onLike'></v-like>
    </div>
    <div class="main-container">
      <v-movie v-if='classic.type===100' :data='classic'></v-movie>
      <v-music v-else-if='classic.type===200' :data='classic'></v-music>
      <v-essay v-else-if='classic.type===300' :data='classic'></v-essay>
    </div>
    <div class="navi-wrapper">
      <v-navi @next='onNext' @prev='onPrev' :title='classic.title' :first='first' :latest='latest'></v-navi>
    </div>
  </div>
</template>
<script>
import VLike from '@/components/like'
import VSpisode from '@/components/spisode'
import VHeader from '@/components/header'
import VMovie from '@/components/classic/movie'
import VMusic from '@/components/classic/music'
import VEssay from '@/components/classic/essay'
import VNavi from '@/components/navi'

import ClassicModel from '@/models/classic'
import LikeModel from '@/models/like'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()
export default {
  data () {
    return {
      like: false,
      likeCount: 12,
      classic: {},
      first: false,
      latest: true
    }
  },
  mounted () {
    this.loadClassicLatest()
  },
  methods: {
    onLike ({ like, likeCount }) {
      this.like = !like
      this.likeCount = like ? likeCount - 1 : likeCount + 1
      const behavior = !like ? 'like' : 'cancel'
      likeModel.like({
        behavior,
        id: this.classic.id,
        category: this.classic.type
      })
    },
    loadClassicLatest () {
      classicModel.getClassicLatest().then(res => {
        this.classic = res
        this.likeCount = res.fav_nums
        this.like = !!res.like_status
      })
    },
    onNext () {
      this._loadCurrentClassic('next')
    },
    onPrev () {
      this._loadCurrentClassic('prev')
    },
    _loadCurrentClassic (nextOrPrev) {
      classicModel.getCurrentClassic(this.classic.index, nextOrPrev)
        .then(res => {
          this.classic = res
          this.first = classicModel.isFirst(res.index)
          this.latest = classicModel.isLatest(res.index)
        })
    }

  },
  components: {
    VLike,
    VSpisode,
    VHeader,
    VMovie,
    VMusic,
    VEssay,
    VNavi
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.classic-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: px2rem(50);
    padding: px2rem(10);
    box-sizing: border-box;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
  .navi-wrapper {
    @include row();
    @include center();
    position: absolute;
    bottom: px2rem(40);
    width: 100%;
  }
}
</style>
