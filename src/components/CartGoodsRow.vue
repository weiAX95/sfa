<template>
  <div class="cart-goods-row">
    <div class="ck-wrap">
      <CheckBox @change="goodsCeckedChange" :value="goods.chcked"></CheckBox>
    </div>
    <div class="goods-info">
      <div class="img-box">
        <img :src="goods.goodsInfo.img" width="100%" height="100%" :alt="goods.goodsInfo.title">
      </div>
      <div class="des-wrap">
        <h3 class="goods-title">{{goods.goodsInfo.title}}</h3>
        <p class="warehouse-info">{{warehouse.warehouseName}}</p>
        <div class="price-wrap">
          <div class="price fl">
          价格: <span class="number">{{getPrice}}</span>
          </div>
          <div class="count-wrap fr">
            <a @click="addGoodsCount(-1)" href="javascript:">-</a>
            <input v-model="goods.count">
            <a @click="addGoodsCount(1)" href="javascript:">+</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from './CheckBox';
export default {
  name: 'CartGoodsRow',
  props: ['goods', 'warehouse'],
  data() {
    return {};
  },
  components: {
    CheckBox
  },
  methods: {
    addGoodsCount(num) {
      this.$store.commit('addGoodsCount', {
        goodsId: this.goods.goodsInfo.id,
        count: parseInt(num),
        warehouseId: this.warehouse.warehouseId
      });
    },
    goodsCeckedChange(value) {
      // console.log(value);
      this.$store.commit('changeGoodsChecked', {
        goodsId: this.goods.goodsInfo.id,
        checked: value,
        warehouseId: this.warehouse.warehouseId
      });
    }
  },
  computed: {
    getPrice() {
      return this.goods.count * this.goods.goodsInfo.monery;
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-goods-row {
  height: px2rem(180);
  padding: px2rem(28);
  box-sizing: border-box;
  .ck-wrap {
    padding-top: px2rem(48);
    float: left;
  }
  .goods-info {
    margin-left: px2rem(50);
    .img-box {
      float: left;
      height: px2rem(124);
      width: px2rem(124);
      // margin-right: px2rem(28);
    }
    .des-wrap {
      margin-left: px2rem(152);
      font-size: px2rem(24);
      color: #000;
      .goods-title {
        height: px2rem(24);
        line-height: px2rem(24);
      }
      .warehouse-info {
        height: px2rem(58);
        line-height: px2rem(58);
        color: #ccc;
      }
    }
    .price-wrap {
      .price {
        height: px2rem(24);
        line-height: px2rem(24);
        margin-top: px2rem(17);
        .number {
          color: #ff0000;
        }
      }
      .count-wrap {
        line-height: px2rem(46);
        text-align: center;
        overflow: hidden;
        a,
        input {
          height: px2rem(46);
          border: px2rem(1) solid #ccc;
          border-radius: 5%;
          display: inline-block;
          font-size: px2rem(24);
        }
        a {
          width: px2rem(46);
        }
        input {
          width: px2rem(88);
          text-align: center;
          margin: 0 px2rem(16);
        }
      }
    }
  }
}
</style>
