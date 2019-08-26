<template>
  <div class="cart-remark">
    <div class="remark-bd">
      <TopHead :title="$store.state.curOrderShop.name">
        <div slot="r"></div>
      </TopHead>
      <textarea @input="changeRemark" v-model="remark" placeholder="请填写备注信息" class="txt-remark">
      </textarea>
      <span class="txt-len">字数({{getLen}}/20)</span>
    </div>
    <div @click="submitRemark" class="remark-bottom">
      确定
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartReamrk',
  created() {
    // let warehouseId = this.$route.params.id;
    // let curOrderShop = this.$store.state.curOrderShop;
    // let shopIndex = this.$store.state.Cart.findIndex(
    //   shop => shop.shopId == curOrderShop.id
    // );
    // let newShop = { ...this.$store.state.Cart[shopIndex] };
    // let warehouse = newShop.warehouse.find(w => w.warehouseId == warehouseId);
    // this.remark = warehouse.remark;å
    this.remark = this.$store.getters.getRemarkByWarhouseId(
      this.$route.params.id
    );
  },
  data() {
    return {
      remark: ''
    };
  },
  methods: {
    submitRemark() {
      this.$store.commit('addRemarkToWarehouse', {
        remark: this.remark,
        warehouseId: this.$route.params.id
      });
      this.$router.go(-1);
    },
    changeRemark(e) {
      let txt = e.target.value;
      // console.log(txt);
      if (txt.length > 20) {
        this.remark = txt.slice(0, 20);
      }
    }
  },
  computed: {
    getLen() {
      return this.remark.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-remark {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  font-size: px2rem(28);
  line-height: 1.5;
  .remark-bd,
  .remark-bottom {
    background-color: #fff;
  }
  .remark-bd {
    flex: 1;
    .txt-remark {
      width: 100%;
      box-sizing: border-box;
      border: none;
      line-height: 1.5;
      background-color: #fafafa;
      height: px2rem(380);
      font-size: px2rem(28);
      padding-left: px2rem(28);
      border-bottom: px2rem(1) solid #ccc;
    }
    .txt-len {
      float: right;
      margin-right: px2rem(28);
    }
  }
  .remark-bottom {
    flex: 0 0 px2rem(110);
    line-height: px2rem(110);
    font-size: px2rem(36);
    color: #10903d;
    text-align: center;
    border-top: px2rem(1) solid #ccc;
  }
}
</style>
