<template>
  <div class="goods-select">
    <div class="goods-select-bd">
      <TopHead title="产品选择">
        <div slot="r">
        </div>
      </TopHead>
      <div class="goodinfo">
        <GoodListItem :number-visible="false" :goods="goods"></GoodListItem>
      </div>
      <div class="des-row">
        <div class="fl">仓库：</div>
        <div class="fr">{{wearhouseName}}</div>
      </div>
      <div class="des-row">
        <div class="fl">库存：</div>
        <div class="fr">{{goods.number}}</div>
      </div>
      <div class="des-row">
        <div class="fl">数量：</div>
        <div class="fr">
          <a class="link-btn" @click="addCount(-1)" href="javascript:">-</a>
          <input class="count-txt" type="text" v-model.number="count">
          <a class="link-btn" @click="addCount(1)" href="javascript:">+</a>
        </div>
      </div>
    </div>
    <div class="goods-select-bottom">
      <div class="btn-wrap">
        <div class="btn act" @click="$router.go(-1)">取消</div>
        <div @click="addToCart" class="btn">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodListItem from '../components/GoodListItem';
import service from '../service';
export default {
  name: 'GoodsSelect',
  created() {
    this.goods = this.$store.state.Goods.find(
      item => item.id == this.$route.params.id
    );
    // console.log(this.goods);
    // 仓库的id： this.goods.warehouseId
    if (this.$store.state.Warehouse.length <= 0) {
      service.loadWarehouse().then(res => {
        this.$store.commit('initWarehouse', res.data);
        // console.log(res.data);
        let warehouse = this.$store.state.Warehouse.find(
          item => item.id == this.goods.warehouseId
        );
        this.wearhouseName = warehouse.reponame;
      });
    } else {
      let warehouse = this.$store.state.Warehouse.find(
        item => item.id == this.goods.warehouseId
      );
      this.wearhouseName = warehouse.reponame;
    }
  },
  data() {
    return {
      goods: {},
      count: 1,
      wearhouseName: ''
    };
  },
  methods: {
    addToCart() {
      // 把购物相关需要的数据放到 vuex中去。
      this.$store.commit('addToCarts', {
        shopId: this.$store.state.curOrderShop.id,
        warehouseName: this.wearhouseName,
        count: this.count,
        goods: this.goods,
        warehouseId: this.goods.warehouseId
      });
      // 跳转到新页面
      this.$router.push(`/cart/${this.$route.params.id}`);
    },
    addCount(num) {
      let newCount = parseInt(this.count) + num;
      if (newCount < 1 || newCount > this.goods.number) {
        return;
      }
      this.count = newCount;
    }
  },
  components: {
    GoodListItem
  }
};
</script>

<style lang="scss" scoped>
.goods-select {
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  .goods-select-bottom {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    .btn-wrap {
      display: flex;
      border-top: px2rem(1) solid #ccc;
      height: px2rem(108);
      line-height: px2rem(108);
      .btn {
        flex: 1;
        color: #10903d;
        font-size: px2rem(36);
        text-align: center;
      }
      .btn:first-child {
        border-right: px2rem(1) solid #ccc;
      }
      .act {
        color: #f00;
      }
    }
  }
  .goodinfo {
    padding: 0 px2rem(28);
    border-bottom: px2rem(1) solid #ccc;
  }
  .des-row {
    margin: 0 px2rem(28);
    font-size: px2rem(30);
    color: #000;
    border-bottom: px2rem(1) solid #ccc;
    // overflow: hidden;
    height: px2rem(110);
    line-height: px2rem(110);
  }
  .link-btn,
  .count-txt {
    font-size: px2rem(30);
    float: left;
    height: px2rem(44);
    line-height: px2rem(44);
    border: px2rem(1) solid #ccc;
    border-radius: 5%;
    margin-top: px2rem(35);
    text-align: center;
    margin-left: px2rem(14);
  }
  .count-txt {
    // display: inline-block;
    width: px2rem(90);
  }
  .link-btn {
    width: px2rem(46);
  }
}
</style>
