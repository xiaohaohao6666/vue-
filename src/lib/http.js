import Vue from 'vue';
import axios from 'axios';

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

// 设置 拦截器 (回调函数)

// Add a request interceptor  在请求拦截添加设置token
axios.interceptors.request.use(function (config) {
    // // Do something before request is sent
    // console.log(config)
    if(config.url.indexOf('/login')==-1){
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log(response);
    Vue.prototype.$message(response.data.meta.msg);
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


export default {
    install(Vue) {
        Vue.prototype.$http = axios;
    }
}