<template>
  <div class="m-tab">
    <div class="tab-head">
      <ul class="hd-list">
        <li class="hd-item" 
          @click="curIndex = index"
          :class="{active: index === curIndex}"
          v-for="(item,index) in hdTitles" 
          :key="index">{{ item }}
        </li>
      </ul>
    </div>
    <div class="tab-body">
      <div class="s1 bd-item" 
        :class="{active: curIndex === 0}"
      >
        <slot name="s1">s1</slot>
      </div>
      <div class="s2 bd-item"
        :class="{active: curIndex === 1}"
      >
        <slot name="s2">s2</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-tab',
  props: ['hd-titles'],
  data() {
    return {
      curIndex: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.m-tab {
  .tab-head {
    .hd-list {
      display: flex;
      background-color: #fff;
      .hd-item {
        line-height: px2rem(108);
        height: px2rem(108);
        font-size: px2rem(28);
        color: #000;
        text-align: center;
        flex: 1;
        box-sizing: border-box;
        border-right: px2rem(1) solid #ccc;
        border-bottom: px2rem(1) solid #ccc;
      }
      .hd-item.active {
        border-bottom: px2rem(6) solid #10903d;
        background-color: #fafafa;
      }
    }
  }
  .tab-body {
    .bd-item {
      display: none;
    }
    .bd-item.active {
      display: block;
    }
  }
}
</style>
