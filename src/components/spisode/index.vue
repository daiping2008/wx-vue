<template>
  <div class="episode-container">
    <div class="index-container">
      <div class="plain">No.</div>
      <div class="index">1</div>
      <div class="line"></div>
    </div>
    <div class="date-container">
      <div class="month">{{month}}</div>
      <div class="year">{{year}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      year: 0,
      month: 0
    }
  },
  mounted () {
    const date = new Date()
    this.year = date.getFullYear()
    this.month = this.months[date.getMonth()]
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.episode-container {
  display: inline-flex;
  flex-direction: row;
  height: px2rem(30);
  .index-container{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    .plain {
      font-size: px2rem(16);
    }
    .index {
      font-size: px2rem(30);
      line-height: px2rem(30);
      font-weight: bold;
    }
    .line {
      height: px2rem(23);
      border: 1px solid #000;
      margin-left: px2rem(7);
      margin-right: px2rem(7);
    }
  }
  .date-container{
    display: flex;
    flex-direction: column;
    .month {
      font-size: px2rem(12);
      line-height: px2rem(12);
      margin-right: px2rem(2);
      margin-bottom: px2rem(3);
      padding-top: px2rem(2.5);
    }
    .year {
      font-size: px2rem(10);
      line-height: px2rem(10);
    }
  }
}
</style>
