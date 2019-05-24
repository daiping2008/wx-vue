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

    <!--评论-->
    <div v-show='!posting' class="post-container">
      <div @click="onFakePost" class="post-fake">
        <div>输入短评</div>
      </div>
      <div class="right-side">
        <v-like @onLike='onLike' :like='like' :likeCount='likeCount'></v-like>
      </div>
    </div>
    <div v-show="posting" class="posting-container">
      <div class="posting-header">
        <div>仅可点击标签+1</div>
        <div @click="cancel" class="cancel">取消</div>
      </div>
      <div class="comment-container">
        <v-tag @onTapping='onPost' class="tag" v-for="v in filterComments" :key='v.content' :data='v.content'>
          <span slot='extra'>+{{v.nums}}</span>
        </v-tag>
      </div>
      <input @keyup.enter="onPost" v-model="q" class="post" maxlength="12" placeholder="短评最多12个字" type="text">
    </div>
    <v-mask v-show="posting"></v-mask>
    <!--评论-->
  </div>
</template>

<script>
import '@/utils/directive'
import VLike from '@/components/like'
import VTag from '@/components/tag'
import VMask from '@/components/mask'

import BookModel from '@/models/book'
import LikeModel from '@/models/like'
const bookModel = new BookModel()
const likeModel = new LikeModel()
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
      likeCount: 0,
      posting: false,
      q: ''
    }
  },
  computed: {
    filterComments () {
      return this.comments.slice(0, 3)
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
    },
    onLike ({ like, likeCount }) {
      const behavior = !like ? 'like' : 'cancel'
      likeModel.like({
        behavior,
        id: this.book.id,
        category: 400
      }).then(res => {
        this.like = !like
        this.likeCount = like ? likeCount - 1 : likeCount + 1
      })
    },
    onFakePost () {
      this.posting = true
    },
    cancel () {
      this.posting = false
    },
    onPost ({ value }) {
      const comment = value || this.q
      if (!comment) return

      if (comment.length > 12) return

      bookModel.addShortComment({
        id: this.book.id,
        content: comment
      }).then(res => {
        this.comments.unshift({
          nums: 1,
          content: comment
        })
        this.hidePosting()
      }).catch(er => {
        this.hidePosting()
      })
    },
    hidePosting () {
      this.q = ''
      this.posting = false
    }
  },
  components: {
    VTag,
    VLike,
    VMask
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.book-detail-container {
  @include column();
  padding-bottom: px2rem(60);
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
  .post-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    height: px2rem(50);
    @include row();
    @include center();
    justify-content: space-between;
    padding: 0 px2rem(15);
    box-shadow: 1px -1px 1px #e3e3e3;
    z-index: 3;
    .post-fake {
      font-size: px2rem(14);
      color: #999;
      width: px2rem(230);
      height: px2rem(30);
      line-height: px2rem(30);
      text-align: center;
      border: 1px solid #999;
      border-radius: px2rem(7.5);
    }
    .right-side {
      display: flex;
      align-items: center;
    }
  }
  .posting-container {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 1px -1px 1px #e3e3e3;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    z-index: 10;
    .posting-header {
      width: 100%;
      @include row();
      justify-content: space-between;
      font-size: px2rem(16);
      padding: px2rem(8);
      box-sizing: border-box;
      .cancel {
        color: #999;
      }
    }
    .comment-container{
      @include row();
      flex-wrap: wrap;
      .tag {
        margin-right: px2rem(7.5);
        margin-bottom: px2rem(5);
        border-radius: px2rem(2);
      }
    }
    .post {
      border: none;
      outline: none;
      width: px2rem(345);
      margin: px2rem(7.5) auto;
      height: px2rem(28);
      line-height: px2rem(28);
      text-align: center;
      background-color: #f5f5f5;
      border-radius: px2rem(15);
      margin-left: px2rem(7.5)
    }
  }
}
</style>
