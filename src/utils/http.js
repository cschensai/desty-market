import { ElMessage } from 'element-plus';
import axios from "axios";
import store from "../store";
import router from '../router/index';
import { pushLog } from '@/sls/pushLog';
const http = axios.create({
  timeout: 20000,
  baseURL: import.meta.env.VITE_PLATFORM_API_URL,
});

http.interceptors.request.use(
  (config) => {
    config.headers.app = 'OMNI';
    const token = store.state.currToken;
    if (token) {
      config.headers.token = token;
      config.headers.Authentication = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response?.status === 401) ||
      error.response?.status === 403
    ) {
      error.response?.statusText && ElMessage({
        grouping: true,
        showClose: true,
        message: error.response?.statusText,
        type: 'warning',
      });
      pushLog({
        key: 'market_logout',
        token: store.state.currToken,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      store.commit('setToken', '');
      store.commit('setCleaToken');
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default http;


