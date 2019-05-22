<template>
  <div class="classic-container">
    <v-header></v-header>
    <div class="header">
      <v-spisode></v-spisode>
      <v-like :like='like' :likeCount='likeCount' @onLike='onLike'></v-like>
    </div>
    <div class="main-content">
      <v-movie></v-movie>
    </div>
  </div>
</template>
<script>
import VLike from '@/components/like'
import VSpisode from '@/components/spisode'
import VHeader from '@/components/header'
import VMovie from '@/components/classic/movie'

import ClassicModel from '@/models/classic'
import LikeModel from '@/models/like'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()
export default {
  data () {
    return {
      like: false,
      likeCount: 12,
      classic: {}
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
        this.like = res.like_status
      })
    }
  },
  components: {
    VLike,
    VSpisode,
    VHeader,
    VMovie
  }
}
</script>

<style lang="scss" scoped>
.classic-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 2.0rem;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
