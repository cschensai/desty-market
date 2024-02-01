import { createRouter, createWebHistory } from 'vue-router';

// 路由信息
const routes = [
    {

        path: "/",
        name: "Market",
        component: () => import(/* webpackChunkName: "Index" */ '@/views/index.vue'),
    },
    {
        path: "/:detailUrl",
        name: "MarketDetail",
        component: () => import('@/views/detailPage/index.vue'),
    },
    {   
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "NotFound" */ '@/components/404/index.vue'),
    },
];

const router = createRouter({
  // 设置baseUrl，为了适配nginx上的处理
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 在详情页点击后退按钮，回到market首页原来的位置
    if (to.name === 'Market' && from.name === 'MarketDetail') {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.afterEach(() => {
  // fixed: when push route, page not scroll
  document.querySelector('body').setAttribute('style', 'overflow: auto;');
});

export default router;
