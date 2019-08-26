import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LoginUser: sessionStorage.getItem('LoginUser')
      ? JSON.parse(sessionStorage.getItem('LoginUser'))
      : null,
    NoticeList: [],
    Shops: [],
    Goods: [],
    curOrderShop: {},
    Warehouse: [],
    Cart: []

    /**
     * 购物车的结构：
     * [
     *  {
     *    shopId: 20,
     *    shopName: '李爽肤水超市！',
     *    warehouse: [{
     *      remark: '',
     *      warehouseId: 10002,
     *      warehouseName: 'ss',
     *      checked: true,
     *      goods: [{
     *        goodsInfo: { 商品对象 },
     *        count: 20,
     *        chcked: true
     *      }]
     *    }]
     *  }
     * ]
     */
  },
  mutations: {
    // 修改仓库的备注信息
    addRemarkToWarehouse(state, payload) {
      //payload: remark, warehouseId
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      warehouse.remark = payload.remark;
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    selectAllCart(state, value) {
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      newShopInfo.warehouse.forEach(w => {
        w.checked = value;
        w.goods.forEach(goods => {
          goods.chcked = value;
        });
      });
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    // 修改仓库的选中状态
    changeWarehouseChecked(state, payload) {
      // checked: true,  shopId, warehouseId
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      warehouse.checked = payload.checked;
      // 如果是false，把所有的商铺的checked也都改成false
      if (payload.checked == false) {
        warehouse.goods.forEach(goods => (goods.chcked = false));
      }
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    // 修改商品的选中状态
    changeGoodsChecked(state, payload) {
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      if (payload.checked) {
        warehouse.checked = true;
      }
      let goods = warehouse.goods.find(
        goods => goods.goodsInfo.id == payload.goodsId
      );
      // goods.count += payload.count;
      goods.chcked = payload.checked;
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    // 给购物商品添加数量
    addGoodsCount(state, payload) {
      // console.log(payload);
      // payload: goodsId, warehouseId, shopId(state.curOrderShop), count
      //第一步：拿到我们要修改的商铺的信息
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      let goods = warehouse.goods.find(
        goods => goods.goodsInfo.id == payload.goodsId
      );
      goods.count += payload.count;
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    clearCart(state) {
      state.Cart = [];
    },
    addToCarts(state, payload) {
      // console.log(payload);
      // 把商品的信息加入到购物车中去。
      // {
      //   shopId: this.$route.params.id,
      //   warehouseName: this.wearhouseName,
      //   count: this.count,
      //   goods: this.goods,
      //   warehouseId: this.goods.warehouseId
      // }
      // 第一步： 判断当前商铺是否已经在购物车中。
      let shopIndex = state.Cart.findIndex(
        item => item.shopId == payload.shopId
      );
      // 如果不在购物车中，直接添加一个新数据到cart中。
      if (shopIndex < 0) {
        console.log('追加一条新的商铺数据到购物车！');
        state.Cart.push({
          shopId: payload.shopId,
          shopName: state.curOrderShop.name,
          warehouse: [
            {
              remark: '',
              warehouseId: payload.warehouseId,
              warehouseName: payload.warehouseName,
              checked: true,
              goods: [
                {
                  goodsInfo: payload.goods,
                  count: payload.count,
                  chcked: true
                }
              ]
            }
          ]
        });
      } else {
        console.log('商铺已存在，+仓库和商品');
        let shop = state.Cart[shopIndex];
        // 判断当前要添加的商品所在的仓库是否已经在cart中存在。
        let warehouseIndex = shop.warehouse.findIndex(
          warehouse => warehouse.warehouseId == payload.warehouseId
        );
        // 当前商铺中如没有当前的仓库
        if (warehouseIndex < 0) {
          console.log('商铺已存在,没有仓库，添加一个新仓库');
          shop.warehouse.push({
            remark: '',
            warehouseId: payload.warehouseId,
            warehouseName: payload.warehouseName,
            checked: true,
            goods: [
              {
                goodsInfo: payload.goods,
                count: payload.count,
                chcked: true
              }
            ]
          });
        } else {
          // 当前商铺中有当前仓库。
          // 判断当前仓库中是否 已经添加了此商品。
          // console.log('商铺已存在,仓库也已经存在');
          let warehouse = shop.warehouse[warehouseIndex];
          // 如果当前仓库中没有当前商品
          let goodsIndex = warehouse.goods.findIndex(
            goods => goods.goodsInfo.id == payload.goods.id
          );
          if (goodsIndex < 0) {
            // console.log('商铺已存在,仓库也已经存在，在仓库中添加一个新商品');
            warehouse.goods.push({
              goodsInfo: payload.goods,
              count: payload.count,
              chcked: true
            });
          } else {
            // console.log('商铺已存在,仓库也已经存在，在仓库中的商品增加数量');
            // 当前仓库已经存在此商品，增加数量
            let newCount = warehouse.goods[goodsIndex].count + payload.count;
            Vue.set(warehouse.goods[goodsIndex], 'count', newCount);
          }
        }
        // 当前仓库中的shop信息重新写入到vuex的state里面去。
        Vue.set(state.Cart, shopIndex, shop);
      }
    },
    initWarehouse(state, payload) {
      state.Warehouse = payload;
    },
    initCurOrderShop(state, payload) {
      state.curOrderShop = payload;
    },
    initGoods(state, payload) {
      state.Goods = payload;
    },
    appendGoods(state, payload) {
      state.Goods = _.uniqBy([...state.Goods, ...payload], 'id');
    },
    initShops(state, payload) {
      state.Shops = payload;
    },
    appendShops(state, payload) {
      state.Shops = _.uniqBy([...state.Shops, ...payload], 'id');
    },
    initUser(state, payload) {
      state.LoginUser = payload;
    },
    initNoticeList(state, payload) {
      state.NoticeList = _.uniqBy(payload, 'id');
    },
    unshiftMoreNotice(state, payload) {
      state.NoticeList.unshift(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    pushMoreNotice(state, payload) {
      state.NoticeList.push(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    setNoticeReaded(state, payload) {
      let itemIndex = state.NoticeList.findIndex(item => item.id == payload);
      let k = state.NoticeList[itemIndex];
      k.isRead = true;
      state.NoticeList.splice(itemIndex, 1, k);
    }
  },
  actions: {},
  getters: {
    getLoginUser(state) {
      return state.LoginUser;
    },
    getRemarkByWarhouseId: state => id => {
      let curOrderShop = state.curOrderShop;
      let shop = state.Cart.find(shop => shop.shopId == curOrderShop.id);
      let warehouse = shop.warehouse.find(w => w.warehouseId == id);
      return warehouse.remark;
    },
    getCurCartShop(state) {
      let shop = state.Cart.find(shop => shop.shopId == state.curOrderShop.id);
      let newShop = _.cloneDeep(shop);
      console.log(newShop);
      newShop.warehouse.forEach(w => {
        w.goods = w.goods.filter(g => g.chcked);
      });
      newShop.warehouse = newShop.warehouse.filter(
        w => w.goods.length > 0 && w.checked
      );
      return newShop;
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
