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
.episode-container {
  display: inline-flex;
  flex-direction: row;
  height: .12rem;
  .index-container{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    .plain {
      font-size: .64rem;
    }
    .index {
      font-size: 1.2rem;
      line-height: 1.2rem;
      font-weight: bold;
    }
    .line {
      height: .90rem;
      border: 1px solid #000;
      margin-left: .28rem;
      margin-right: .28rem
    }
  }
  .date-container{
    display: flex;
    flex-direction: column;
    .month {
      font-size: .48rem;
      line-height: .48rem;
      margin-right: .08rem;
      margin-bottom: .06rem;
      padding-top: 0.1rem;
    }
    .year {
      font-size: .4rem;
      line-height: .4rem;
    }
  }
}
</style>
