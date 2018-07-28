import axios from 'axios'
import '../../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'
const API = {
  ROOT: process.env.NODE_ENV === 'development' ? '/' : 'http://118.25.8.238:4000'
}
axios.defaults.baseURL = API.ROOT
let token = sessionStorage.getItem("token");
if(token!=null){

 axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(token).access_token;
}
axios.interceptors.request.use(function (config) {
  NProgress.start()
  return config
})

axios.interceptors.response.use(function (config) {
  NProgress.done()
  return config
})