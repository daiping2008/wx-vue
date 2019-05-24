<template>
  <div @click="onTapping" class="tag-wrapper">
    <span>{{data}}</span>
    <slot name='extra'></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String
    }
  },
  methods: {
    onTapping () {
      this.$emit('onTapping', { value: this.data })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin.scss';
.tag-wrapper {
  display: inline-flex;
  padding: px2rem(4) px2rem(6);
  background-color: #f5f5f5;
  color: #666;
  font-size: px2rem(14);
  border-radius: 2px;
  justify-content: center;
  align-items: center;
}
</style>
