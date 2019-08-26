<template>
  <div @click="handlerClick" class="check-box">
    <div v-show="value" class="inner"></div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: ['value'],
  data() {
    return {};
  },
  methods: {
    handlerClick() {
      this.$emit('input', !this.value);
      this.$emit('change', !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.check-box {
  border-radius: 50%;
  height: px2rem(28);
  width: px2rem(28);
  border: px2rem(1) solid #333;
  position: relative;
  display: inline-block;
  .inner {
    border-radius: 50%;
    height: px2rem(18);
    width: px2rem(18);
    background-color: #00a2eb;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
