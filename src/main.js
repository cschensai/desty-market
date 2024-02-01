import { createApp, provide } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLazyLoad from 'vue3-lazyload'
import App from '@/App.vue';
// 处理svg
import 'virtual:svg-icons-register';
// 国际化语言处理
import { install } from '@/common/languages/index';
// 全局less变量
import '@/common/less/font.less'
import '@/common/less/common.less'
import '@/common/less/element-Reset.less'
import 'animate.css';

// router
import router from '@/router';
// store
import store from '@/store';
import dataReport from '@/plugins/dataReport';
import { destyHandleCookie } from 'desty-design';
const { handleGetSSOCookie } = destyHandleCookie;
const token = handleGetSSOCookie()?.['OMNI'] || '';
// 判断是否已经登录
store.commit("setToken", token);
const app = createApp(App);
// 注册全局变量
app.use(VueLazyLoad);
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.use(install);
app.use(dataReport);

import { createMetaManager, defaultConfig, resolveOption } from 'vue-meta';

const decisionMaker5000000 = resolveOption((prevValue, context) => {
  const { uid = 0 } = context.vm || {}
  if (!prevValue || prevValue < uid) {
    return uid
  }
})
const metaManager = createMetaManager({
  ...defaultConfig,
  meta: { tag: 'meta', nameless: true }
})
provide('metaManager', metaManager);
app.use(metaManager);

app.mount('#app');
