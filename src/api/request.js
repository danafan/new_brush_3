import axios from './index'
import md5 from 'js-md5';

//中间处理
export function middleWare(params,type) { 
  var now = new Date();         //当前日期  
  var nowDay = now.getDate();     //当前日 
  var nowMonth = now.getMonth();    //当前月 
  var nowYear = now.getYear();    //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0;
  let new_secret_key = `${nowYear}-${nowMonth+1 < 10?'0'+(nowMonth+1):nowMonth+1}-${nowDay < 10?'0'+nowDay:nowDay}`

  var target = {
    secret_key:!localStorage.getItem("secret_key")?md5(new_secret_key):localStorage.getItem("secret_key"),
    timestamp:((new Date()).getTime()/1000).toString().split('.')[0]
  };
  // 生成签名
  var create_sign = {...params,...target};
  var keys = [];        // 所有键名
  var sort_obj = {};    // 排好序的参数对象
  
  // 键名数组
  for(let key of Object.keys(create_sign)){ 
    keys.push(key);
  }
  // 键名排序
  var sort_keys = keys.sort(); 
  sort_keys.map(item => {
    let val = create_sign[item];
    sort_obj[item] = val;
  })
  var sign_arr = [];
  for(let key in sort_obj){
    if(key != 'file'){
      sign_arr.push(`${key}=${sort_obj[key]}`);
    }
  }
  
  //sign
  var sign = md5(sign_arr.join('&'));
  //组织参数
  var req = {...params,...{sign:sign,timestamp:((new Date()).getTime()/1000).toString().split('.')[0]}};
  var get_arr = [];
  //post请求参数
  var form = new FormData();
  for(let key in req){
    form.append(key, req[key]);
    get_arr.push(`${key}=${req[key]}`);
  }
  //get请求参数
  var get_str = get_arr.join('&');
  return type == 'get'?get_str:form;
}

export default {
  post(path, params={}){
    var form = middleWare(params,'post');
    return axios.post(`${path}`, form);
  },
  get(path, params={}){
    var str = middleWare(params,'get');
    return axios.get(`${path}?${str}`);
  }
}

