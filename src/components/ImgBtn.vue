<template>
  <div class="img-btn" @click="$emit('click')">
    <i class="icon iconfont" :class="iconclass" :style="{color: isred ? '#ff5656' : '#000'}"></i>
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  name: 'ImgBtn',
  props: ['iconclass', 'val', 'isred'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.img-btn {
  box-sizing: border-box;
  border: px2rem(1) solid #ccc;
  width: px2rem(220);
  height: px2rem(220);
  color: #000;
  padding-top: px2rem(72);
  text-align: center;
  i {
    font-size: px2rem(60);
  }
  p {
    font-size: px2rem(24);
    line-height: px2rem(24+44);
  }
}
</style>
