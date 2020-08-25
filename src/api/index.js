import axios from 'axios'
import router from '../router/index.js'
import { Indicator } from 'mint-ui';

const baseURL = `${location.origin}/mobile/`;
// 创建axios实例，可以自定义配置
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  config => {
    Indicator.open({
      spinnerType: 'fading-circle'
    });
    return config
  },error => {
    return Promise.reject(error)
  })

instance.interceptors.response.use(response => {
  Indicator.close();
  switch (response.data.code) {
    case 104:
    sessionStorage.clear();
    router.replace("/login");
  }
  return response;
},error => {
  Indicator.close();
  if (error.response) {
    switch (error.response.status) {
      case 404:
      window.alert('参数错误');
      break;
      case 500:
      window.alert('服务器故障');
      break;
      case 504:
      window.alert('没有网络');
      break;
    }
  }
});

export default instance;