<template>
  <div class="book-detail-container">
    <div class="header">
      <img :src="book.image" alt="">
      <div class="title">{{book.title}}</div>
      <div class="author">{{book.author}}</div>
    </div>

    <div class="sub-container">
      <div class="sub-title">短评</div>
      <div class="tag-container">
        <v-tag class="tag" v-for="v in comments" :key='v.content' :data='v.content'>
          <span slot="extra">+{{v.nums}}</span>
        </v-tag>
      </div>
    </div>

    <div class="sub-container">
      <div class="sub-title">内容简介</div>
      <div class="summary" v-format='book.summary'></div>
    </div>

    <div class="sub-container">
      <div class="sub-title">书本信息</div>
      <div class="detail-container">
        <div class="detail-item">
          <div class="name">出版社：</div>
          <div>{{book.publisher}}</div>
        </div>
        <div class="detail-item">
          <div class="name">出版年：</div>
          <div>{{book.pubdate}}</div>
        </div>
        <div class="detail-item">
          <div class="name">页数：</div>
          <div>{{book.pages}}</div>
        </div>
        <div class="detail-item">
          <div class="name">定价：</div>
          <div>{{book.price}}</div>
        </div>
        <div class="detail-item">
          <div class="name">装订：</div>
          <div>{{book.binding}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/utils/directive'
import VTag from '@/components/tag'
import BookModel from '@/models/book'
const bookModel = new BookModel()
export default {
  props: {
    bid: {
      type: [String, Number]
    }
  },
  data () {
    return {
      book: {},
      comments: [],
      like: false,
      likeCount: 0
    }
  },
  mounted () {
    this.loadBookDetail()
    this.loadBookComment()
    this.loadBookFavor()
  },
  methods: {
    loadBookDetail () {
      bookModel.getBookDetail(this.bid)
        .then(res => { this.book = res })
    },
    loadBookComment () {
      bookModel.getBookComment(this.bid)
        .then(res => { this.comments = res.comments })
    },
    loadBookFavor () {
      bookModel.getBookFavor(this.bid)
        .then(res => {
          this.like = !!res.like_status
          this.likeCount = res.fav_nums
        })
    }
  },
  components: {
    VTag
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.book-detail-container {
  @include column();
  background-color: #f5f5f5;
  .header {
    @include column();
    @include center();
    background-color: #fff;
    width: 100%;
    padding-top: px2rem(20);
    padding-bottom: px2rem(20);
    > img {
      width: px2rem(100);
      height: px2rem(150);
    }
    .title {
      color: #2f2f2f;
      font-size: px2rem(19);
      margin-top: px2rem(10);
      margin-bottom: px2rem(10);
      font-weight: bold;
    }
    .author {
      color: #999;
      font-size: px2rem(14);
    }
  }
  .sub-container {
    width: 100%;
    @include column();
    margin-top: px2rem(15);
    padding: px2rem(15);
    box-sizing: border-box;
    background-color: #fff;
    .sub-title{
      font-size: px2rem(15);
      font-weight: bold;
      color: #2f2f2f;
      margin-bottom: px2rem(10);
      text-align: center;
    }
    .tag-container {
      @include row();
      justify-content: flex-start;
      flex-wrap: wrap;
      .tag {
        margin-right: px2rem(7.5);
        margin-bottom: px2rem(5);
        border-radius: px2rem(2);
        &:nth-child(1) {
          background-color: #fffbdd;
        }
        &:nth-child(2) {
          background-color: #eefbff;
        }
      }
    }
    .summary {
      font-size: px2rem(13);
      color: #999;
      text-indent: px2rem(26);
      line-height: px2rem(16);
    }
    .detail-container {
      @include column();
      font-size: px2rem(14);
      color: #999;
      margin-bottom: px2rem(10);
      .detail-item {
        @include row();
        @include left();
        .name {
          width: px2rem(75);
          text-align: right;
        }
      }
    }
  }
}
</style>
