<template>
  <div class="search-wrapper">
    <div class="header">
      <div class="search-bar">
        <img class="icon" :src="require('./search.png')" alt="">
        <input v-model="q" @keyup.enter="onConfirm" class="bar" type="text" placeholder="书籍名">
        <img class="icon" :src="require('./cancel.png')" alt="">
      </div>
      <div @click="cancel" class="cancel">取消</div>
    </div>

    <div v-show='!done'>
      <div class="history">
        <div class="title">历史搜索</div>
        <div class="tags">
          <template v-for="v in his">
            <v-tag @onTapping='onConfirm' class="tag" :data="v" :key="v"></v-tag>
          </template>
        </div>
      </div>

      <div class="history">
        <div class="title">热门搜索</div>
        <div class="tags">
          <template v-for="v in hot">
            <v-tag @onTapping='onConfirm' class="tag" :data="v" :key="v"></v-tag>
          </template>
        </div>
      </div>
    </div>

    <div v-show='done' class="book-con">
      <template v-for="v in data">
        <v-book class="book" :data="v" :key='v.id'></v-book>
      </template>
    </div>
  </div>
</template>

<script>
import VTag from '@/components/tag'
import VBook from '@/components/book'

import { paginationMixin } from '@/utils/mixin'
import KeywordModel from '@/models/keyword'
import BookModel from '@/models/book'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
export default {
  data () {
    return {
      his: [],
      hot: [],
      q: ''
    }
  },
  mounted () {
    this.loadKeyword()
  },
  mixins: [paginationMixin],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    loadKeyword () {
      keywordModel.getHot().then(res => {
        this.hot = res.hot
      })
      this.his = keywordModel.getHis()
    },
    onConfirm ({ value }) {
      const q = value || this.q
      keywordModel.setHis(q)
      bookModel.getBookSearch({
        q,
        start: this.getCurrentStart(),
        summary: 1
      }).then(res => {
        this.setTotal(res.total)
        this.setData(res.books)
      })
    }
  },
  components: {
    VTag,
    VBook
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.search-wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9;
  padding-top: px2rem(50);

  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(50);
    @include row();
    @include center();
    z-index: 10;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    .search-bar {
      @include row();
      @include center();
      background-color: #f5f5f5;
      border-radius: px2rem(14);
      .icon {
        width: px2rem(14);
        height: px2rem(14);
        margin: 0 px2rem(7.5);
      }
      .bar {
        border: none;
        outline: none;
        background-color: #f5f5f5;
        width: px2rem(250);
        height: px2rem(26);
        font-size: px2rem(14);
        display: inline-flex;
      }
    }
    .cancel {
      width: px2rem(50);
      font-size: px2rem(15);
      text-align: center;
    }
  }
  .history {
    width: px2rem(345);
    margin: px2rem(7.5) auto;
    font-size: px2rem(14);
    .title {
      border-left: px2rem(4) solid #333;
      text-indent: px2rem(4);
      margin-bottom: px2rem(7);
    }
    .tags {
      @include row();
      flex-wrap: wrap;
      .tag {
        margin-left: px2rem(7.5);
        margin-bottom: px2rem(7.5);
      }
    }
  }
  .book-con {
    position: relative;
    width: 100%;
    @include row();
    justify-content: space-between;
    flex-wrap: wrap;
    padding: px2rem(15) px2rem(45) 0;
    box-sizing: border-box;
    .book {
      margin-bottom: px2rem(15);
    }
  }
}
</style>
