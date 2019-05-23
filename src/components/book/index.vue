<template>
  <router-link tag='div' :to='{name: "book-detail", params: { bid: data.id }}' class="book-wrapper">
    <img :src="data.image" alt="">
    <div class="desc">
      <div class="title">{{data.title}}</div>
      <div class="author">{{data.author}}</div>
      <div class="footer">{{data.fav_nums}} - {{data.id}} 喜欢</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    onClick () {
      // this.$router.push({ name: `book-detail`, params: { bid: this.data.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.book-wrapper {
  @include column();
  width: px2rem(120);
  height: px2mre(130);
  box-shadow: 2px 2px 2px #e3e3e3;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
  .desc {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: px2rem(2.5) px2rem(7.5) px2rem(4);
    box-sizing: border-box;
    @include column();
    font-size: px2rem(10);
    color: #999;
    .title {
      font-size: px2rem(16);
      margin-top: px2rem(4);
      margin-bottom: px2rem(5);
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .author {
      margin-bottom: px2rem(5);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .footer {
      text-align: right;
    }
  }
}
</style>
