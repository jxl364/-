import Vue from 'vue'
import App from './App.vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(Pagination.name, Pagination)
import store from './store'

import '@/mock/mockServe'
import 'swiper/css/swiper.css'

import '../public/iconfont/iconfont.js'
import '../public/iconfont/iconfont.css'

import * as API from '@/api'

import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
// 使用插件
Vue.use(VueRouter)

import VueLazyload from 'vue-lazyload'
import Genshin from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading: Genshin,
})

import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
  name:'upper'
})

import '@/plugins/validate'

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
