import { destyTracker } from 'desty-tracker';

export default {
  install(app) {
    destyTracker.init({
      env: import.meta.env.VITE_NODE_ENV, // 环境标识
      businessName: "DestyMarket", // 业务产线
      sessionIntercept: true, // 是否拦截session存活时间的自动上报
    });
    // app全局属性挂载
    app.config.globalProperties.$dataReport = (key, params = {}, isPv = false) => {
      // setUserId
      window.gtag('set', 'user_id', params?.user_id);
      destyTracker.setUserId(params?.user_id);
      window.gtag('event', key, params);
      if (isPv) {
        destyTracker.pvLogEvent(key, params);
      }
    };
  },
};