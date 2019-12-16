// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import Apis from "./api"
import Helper from "@/libs/tools-new.js"
import './libs/override.js'
import './libs/hook.js' //函数钩子环境
import './libs/inject.js' //函数注入环境
import echarts from 'echarts'
import rview from 'rview-c'
import 'rview-c/dist/static/styles/rview.css';
Vue.use(rview)

// 实际打包时应该不引入mock
/* eslint-disable */
require('@/mock')
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.prototype.$api = Apis;
Vue.prototype.$helper = Helper;
Vue.prototype.$echarts = echarts
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
