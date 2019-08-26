<template>
  <div class="order">
    <TopHead title="下单">
      <div slot="r"><i class="icon iconfont icon-cart"></i></div>
    </TopHead>
    <!-- 搜索区域 -->
    <div class="search-wrap">
      <SearchBtn @search="searchGoods" v-model="q"></SearchBtn>
    </div>

    <!-- 中间导航区域 -->
    <div class="hot-wrap">
      <ul class="classify-list">
        <li :class="{act: isOnSales}" @click="isOnSalesClick">促销</li>
        <li :class="{act: isAll }" @click="selectAll">全部</li>
        <li>SKU-L</li>
        <li>SKU-L</li>
        <li>SKU-L</li>
      </ul>
    </div>

    <!--  商品列表区域 -->
    <div class="goods-list-wrap">
      <div class="goods-hd">
        <div class="fl count-wrap">
          {{cur}} / {{total}}
        </div>
        <div class="fr">
          <ul class="type-list-wrap">
            <li>{{ getFilterGoodsType }}</li>
            <li><i class="icon iconfont icon-filter" @click="showSelectGoodsType=true"></i></li>
          </ul>
        </div>
      </div>
      <div class="goods-bd"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <router-link class="goods-item-link" :to="`/goodselect/${item.id}`" v-for="item in Goods" :key="item.id">
          <GoodsListItem :number-visible="true" :goods="item" ></GoodsListItem>
        </router-link>
      </div>
    </div>
    <Popup 
      v-model="showSelectGoodsType"
      pop-transition="popup-fade"
    >
      <div class="popup-select">
        <Checklist
          v-model="filterGoodsType"
          :options="['食品', '日化', '宝洁']"
          title="请选择商品类型"
        >
        </Checklist>
        <Button type="default" @click="showSelectGoodsType=false" class="btn-select-type">
        确定
        </Button>
      </div>
    </Popup>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchBtn from '../components/SearchBtn';
import GoodsListItem from '../components/GoodListItem';
import { Popup, Checklist, Button, Toast, InfiniteScroll } from 'mint-ui';
import service from '../service';
import { mapMutations, mapState } from 'vuex';
Vue.use(InfiniteScroll);

export default {
  name: 'Order',
  data() {
    return {
      showSelectGoodsType: false,
      q: '',
      isOnSales: false,
      isAll: true,
      total: 0,
      cur: 0,
      goods: [],
      filterGoodsType: ['食品', '日化', '宝洁'],
      curPage: 1,
      loading: false
    };
  },
  created() {
    this.loadGoodsData();
  },
  components: {
    SearchBtn,
    GoodsListItem,
    Popup,
    Checklist,
    Button
  },
  computed: {
    ...mapState(['Goods']),
    getFilterGoodsType() {
      return this.filterGoodsType.join('/');
    }
  },
  methods: {
    ...mapMutations(['initGoods', 'appendGoods']),
    isOnSalesClick() {
      this.isOnSales = true;
      this.isAll = false;
      // this.goods = [];
      this.initGoods([]);
      this.loadGoodsData();
    },
    selectAll() {
      this.isOnSales = false;
      this.isAll = true;
      // this.goods = [];
      this.initGoods([]);
      this.loadGoodsData();
    },
    searchGoods() {
      // console.log('要搜索：', this.q);
      this.curPage = 1;
      this.initGoods([]);
      this.loadGoodsData();
    },
    loadMore() {
      this.loading = true;
      this.curPage++;
      this.loadGoodsData().finally(() => {
        this.loading = false;
      });
    },
    loadGoodsData() {
      let params = {
        _limit: 20,
        _page: this.curPage,
        q: this.q
      };
      if (!this.isAll) {
        params.onsales = this.isOnSales;
      }
      console.log(params);
      return service
        .loadGoods(params)
        .then(res => {
          // this.goods = [...this.goods, ...res.data];
          this.appendGoods(res.data);
          this.total = res.headers['x-total-count'];
          this.cur = this.total;
        })
        .catch(() => {
          // console.log('error load goods!');
          Toast('加载数据失败！');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  background-color: #fff;
  .hot-wrap {
    background-color: #fafafa;
    padding: px2rem(14) px2rem(28);
    font-size: px2rem(28);
    border: px2rem(1) solid #ccc;
    border-left: none;
    border-right: none;
    .classify-list {
      display: flex;
      align-items: center;
      height: px2rem(58);
      line-height: px2rem(58);
      text-align: center;
      li {
        height: px2rem(58);
        flex: 0 0 px2rem(132);
        border-right: px2rem(1) solid #ccc;
        line-height: px2rem(58);
      }
      li:last-child {
        border-right: none;
      }
      .act {
        color: #04afeb;
      }
    }
  }
  .goods-list-wrap {
    padding: 0 px2rem(28);
    .goods-item-link {
      display: block;
    }
    .goods-hd {
      overflow: hidden;
      .count-wrap,
      .type-list-wrap {
        height: px2rem(84);
        font-size: px2rem(28);
        line-height: px2rem(84);
      }
      .type-list-wrap {
        display: flex;
        li {
          flex: 0 0 px2rem(58px);
          i {
            font-size: px2rem(28);
          }
        }
      }
    }
  }
  .popup-select {
    height: px2rem(300);
    padding: px2rem(50);
  }
}
.search-wrap {
  padding: px2rem(20) px2rem(28);
}
</style>
