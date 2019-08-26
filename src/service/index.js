import axios from 'axios';

// 登录完成后的所有的请求必须在 请求的headers中添加token
// Add a request interceptor
let axiosIns = axios.interceptors.request.use(
  function(config) {
    let loginToken = sessionStorage.getItem('LoginToken');
    if (loginToken) {
      config.headers.Authorization = 'Bearer ' + loginToken;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  login(data) {
    return axios.post('/api/login', data);
  },
  logout() {
    // 当我退出登录,取消全局注册的钩子
    axios.interceptors.request.eject(axiosIns);
  },
  getUserProgress() {
    return axios.get('/api/getUserProgress');
  },
  setNoticeReaded(id) {
    return axios.post(`/api/auth/notice/${id}`);
  },
  getNotices(date, limit, isloadelater) {
    if (date) {
      date = date.getTime();
    }
    return axios.get('/api/message', {
      params: {
        date,
        limit,
        isloadelater
      }
    });
  },
  getShops(data) {
    return axios.get('/api/auth/shop?_limit=10&_order=asc&_sort=distance', {
      params: data
    });
  },
  getShopInfo(id) {
    return axios.get('/api/auth/shopSales/' + id);
  },
  uploadImg(formData) {
    return axios({
      url: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });
  },
  submitSigin(data) {
    return axios.post('/api/auth/SignIn', data);
  },
  loadGoods(data) {
    return axios.get('/api/auth/goods', { params: data });
  },
  loadWarehouse() {
    return axios.get('/api/auth/warehouse');
  },
  subOrder(data) {
    return axios.post('/api/auth/order', data);
  }
};
