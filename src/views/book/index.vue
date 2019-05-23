<template>
  <div class="book-container">
    <v-header></v-header>
    <div class="header">
      <div class="search-container">
        <img src="../../assets/images/icon/search.png" alt="">
        <div>书籍搜索</div>
      </div>
    </div>
    <div class="sub-container">
      <img class="sub-title" src="../../assets/images/book/quality.png" alt="">
      <div class="book-container">
        <v-book class="book-item" v-for="v in books" :key="v.id" :data='v'></v-book>
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/header'
import VBook from '@/components/book'
import BookModel from '../../models/book'
const bookModel = new BookModel()
export default {
  data () {
    return {
      books: []
    }
  },
  created () {
    this.loadHotList()
  },
  methods: {
    loadHotList () {
      bookModel.getHoList()
        .then(res => {
          this.books = res
        })
    }
  },
  components: {
    VBook,
    VHeader
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.book-container {
  padding-top: px2rem(60);
  .header {
    position: fixed;
    @include row();
    @include center();
    height: px2rem(50);
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    font-size: px2rem(16);
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    z-index: 9;
    .search-container {
      @include row();
      @include center();
      width: px2rem(350);
      height: px2rem(34);
      background-color: #f5f5f5;
      color: #999;
      > img {
        width: px2rem(14);
        height: px2rem(14);
        margin-right: px2rem(5)
      }
    }
  }
  .sub-container {
    @include column();
    @include center();
    .sub-title {
      width: px2rem(53);
      height: px2rem(17);
      margin-bottom: px2rem(15);
    }
    .book-container {
      @include row();
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 px2rem(45);
      box-sizing: border-box;
      .book-item {
        margin-bottom: px2rem(15);
      }
    }
  }
}
</style>
