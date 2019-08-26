<template>
  <div class="cart">
    <div class="cart-bd">
      <TopHead :title="shopName">
        <div @click="$store.commit('clearCart')" slot="r" class="edit-btn">编辑</div>
      </TopHead>
      <Warehouse :warehouse="warehouse" v-for="warehouse in curShopCart.warehouse" :key="warehouse.warehouseId"></Warehouse>
    </div>
    <div class="cart-bottom">
      <div class="checkbox-wrap fl">
        <CheckBox @change="handlerCheckAll" v-model="checkAll"></CheckBox>
        <span class="label">全选</span>
        <span>合计：</span>
        <span class="number">{{getTotal}}</span>
      </div>
      <div class="ok-btn-wrap fr">
        <router-link to="/subcart" class="btn" href="javascript:">确定</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Warehouse from '../components/Warehouse';
import { mapState } from 'vuex';
import CheckBox from '../components/CheckBox';
export default {
  name: 'Cart',
  created() {
    // this.$store.state.shop this.$route.params.id
    this.shopName = this.$store.state.curOrderShop.name;
    this.curShopCart = this.Cart.find(
      item => item.shopId == this.curOrderShop.id
    );
    // console.log(this.curShopCart);
  },
  methods: {
    handlerCheckAll(value) {
      // 修改整个vuex中的当前商铺里面的所有商品和仓库都为选中状态
      this.$store.commit('selectAllCart', value);
    }
  },
  computed: {
    ...mapState(['Cart', 'curOrderShop']),
    getTotal() {
      let total = 0;
      this.curShopCart.warehouse.forEach(w => {
        if (!w.checked) {
          return;
        }
        w.goods.forEach(goods => {
          if (!goods.chcked) return;
          total += goods.count * goods.goodsInfo.monery;
        });
      });
      return total;
    }
  },
  data() {
    return {
      shopName: '',
      curShopCart: null,
      checkAll: true
    };
  },
  components: {
    Warehouse,
    CheckBox
  }
};
</script>

<style lang="scss" scoped>
.cart {
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  .edit-btn {
    color: #fff;
    font-size: px2rem(28);
  }
  .cart-bd {
    flex: 1;
  }
  .cart-bottom {
    flex: 0 0 px2rem(112);
    background-color: #fafafa;
    line-height: px2rem(112);
    font-size: px2rem(28);
    padding: 0 px2rem(28);
    .number {
      color: #f00;
    }
    .label {
      margin: 0 px2rem(66) 0 px2rem(16);
    }
    .btn {
      display: block;
      background-color: #10903d;
      width: px2rem(168);
      height: px2rem(70);
      line-height: px2rem(70);
      text-align: center;
      border-radius: 5%;
      color: #fff;
      margin-top: px2rem(20);
    }
  }
}
</style>
