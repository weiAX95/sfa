<template>
  <div class="search-btn">
    <i class="icon iconfont icon-sousuo" @click="$emit('search')"></i>
    <input 
      @input="$emit('input', $event.target.value)" 
      :value="value" 
      placeholder="请输入搜索内容" 
      @keydown.enter="$emit('search')"
      type="text">
  </div>
</template>

<script>
export default {
  name: 'SearchBtn',
  props: ['value'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.search-btn {
  display: flex;
  height: px2rem(64);
  line-height: px2rem(64);
  background: #fff;
  i,
  input {
    font-size: px2rem(28);
  }
  i {
    flex: 0 0 px2rem(40);
  }
  input {
    flex: 1;
    border: none;
  }
}
</style>
