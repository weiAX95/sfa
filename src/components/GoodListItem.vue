<template>
  <div class="goods-item">
    <div class="img-box">
      <img :src="goods.img" :alt="goods.title">
    </div>
    <div class="desc-wrap">
      <h3 class="goods-title">{{goods.title}}</h3>
      <div class="aside-info-wrap">
        <span>编码：{{goods.serial}}</span>
        <span>规格：{{goods.packageDimensions}}</span>
      </div>
      <div class="price-wrap">
        <div class="fl">价格：<span class="money">{{ goods.monery }}</span></div>
        <div v-if="numberVisible" class="fr">库存<span class="sp-number">{{ goods.number }}箱</span> <i class="icon iconfont icon-icon-refresh"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: ['goods', 'number-visible'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.goods-item {
  display: flex;
  border-top: px2rem(1) solid #ccc;
  padding: px2rem(20) 0;
  i {
    font-size: px2rem(28);
    color: #000;
  }
  .img-box {
    flex: 0 0 px2rem(124);
    height: px2rem(124);
    vertical-align: middle;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .desc-wrap {
    text-align: left;
    flex: 1;
    padding-left: px2rem(28);
    font-size: px2rem(20);
    line-height: px2rem(20);
    color: #666;
    .goods-title {
      font-size: px2rem(26);
      color: #000;
      margin-bottom: px2rem(12);
      line-height: px2rem(26);
      height: px2rem(26);
    }
    .aside-info-wrap {
      height: px2rem(20);
      margin-bottom: px2rem(34);
      span:first-child {
        margin-right: px2rem(60);
      }
    }
    .price-wrap {
      overflow: hidden;
      height: px2rem(30);
      line-height: px2rem(30);
      .money {
        color: #f00;
        font-size: px2rem(30);
      }
    }
  }
  .sp-number {
    padding-right: px2rem(28);
  }
}
</style>
