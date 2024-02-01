import { createStore } from "vuex";
import { destyHandleCookie } from 'desty-design';
import { i18n } from "@/common/languages";
import { getToolsDetail, getAddQuery, addApp, reachUs, getDestyAppQueryList, getOtherAppQueryList, getCategoryList, getUserInfo } from "@/service";

const { handleClearSSOCookie } = destyHandleCookie;

const store = createStore({
  state: {
    isMobile: false,
    language: "id",
    currToken: undefined,
    isLogin: undefined,
    toolsDetail: {},
    destyQueryList: [],
    otherQueryList: [],
    otherQuerySliceList: [],
    categoryList: [],
    detailQueryList: [],
    queryOtherLoading: false,
    queryDestyLoading: false,
    detailAddLoading: false,
    detailLoading: false,
    userInfo: undefined,
    endIndex: 9, // 展示切换的数量
    transRefStore: null,
  },
  mutations: {
    setIsMobileMode(state, isMobileMode) {
      state.isMobile = isMobileMode;
    },
    setLanguage(state, lang) {
      state.language = lang;
      i18n.global.locale.value = lang;
    },
    setToken(state, token) {
      state.isLogin = !!token;
      state.currToken = token;
    },
    setToolsDetail(state, info) {
      state.toolsDetail = info || {};
    },
    setDetailQueryList(state, list) {
      state.detailQueryList = list || [];
    },
    setDestyQueryList(state, list) {
      state.destyQueryList = list;
    },
    setOtherQueryList(state, list) {
      state.otherQueryList = list;
      state.otherQuerySliceList = list.slice(0, state.endIndex);
    },
    setOtherQuerySliceList(state) {
      state.endIndex += 9;
      const sliceList = state.otherQueryList.slice(0, state.endIndex);
      state.otherQuerySliceList = sliceList;
    },
    setCategoryList(state, list) {
      if (list.length) {
        list.unshift({ id: 0,code: "", name: 'extension.allCategory' })
      }
      state.categoryList = list;
    },
    setQueryOtherLoading(state, loading) {
      state.queryOtherLoading = loading;
    },
    setQueryDestyLoading(state, loading) {
      state.queryDestyLoading = loading;
    },
    setDetailAddLoading(state, loading) {
      state.detailAddLoading = loading;
    },
    setDetailLoading(state, loading) {
      state.detailLoading = loading;
    },
    setUserInfo(state, info) {
      state.userInfo = info || null;
    },
    setTransRefStore(state, transRefFn) {
      state.transRefStore = transRefFn;
    },
    setCleaToken(state) {
      // 清除token信息
      handleClearSSOCookie();
      state.userInfo = null;
    },
  },
  actions: {
    async getToolsDetailAction({ commit }, payload) {
      try {
        commit('setDetailLoading', true);
        const res = await getToolsDetail(payload);
        const { code, data: resData } = res?.data || {};
        if (code === 200) {
          commit('setToolsDetail', resData || {});
          return { categoryL2: resData?.categoryL2, appId: resData?.appId };
        }
      } catch (error) {
        console.log('getToolsDetailAction error', error);
      } finally {
        commit('setDetailLoading', false);
      }
    },
    async getAddQueryAtion({ commit }, payload) {
      try {
        commit('setDetailAddLoading', true);
        const res = await getAddQuery(payload);
        const { code, data: resData } = res?.data || {};
        if (code === 200) {
          commit('setDetailQueryList', resData);
        }
      } catch (error) {
        console.log('getAddQueryAtion error', error);
      } finally {
        commit('setDetailAddLoading', false);
      }
    },
    async addAppAction(_, payload) {
      try {
        const res = await addApp(payload);
        const { code } = res?.data || {};
        return code === 200;
      } catch (error) {
        console.log('addAppAction error', error);
      }
    },
    async reachUsAction(_, payload) {
      try {
        const res = await reachUs(payload);
        const { code } = res?.data || {};
        return Number(code) === 200;
      } catch (error) {
        console.log('reachUsAction error', error);
      }
    },
    async getDestyAppQueryListAction({ commit }, payload) {
      try {
        commit('setQueryDestyLoading', true);
        const res = await getDestyAppQueryList(payload);
        const { code, data: resData } = res?.data || {};
        if (code === 200) {
          commit('setDestyQueryList', resData || []);
        }
      } catch (error) {
        console.log('getDestyAppQueryListAction error', error);
      } finally {
        commit('setQueryDestyLoading', false);
      }
    },
    async getOtherAppQueryListAction({ commit }, payload) {
      try {
        commit('setQueryOtherLoading', true);
        const res = await getOtherAppQueryList(payload);
        const { code, data: resData } = res?.data || {};
        if (code === 200) {
          commit('setOtherQueryList', resData || []);
        }
      } catch (error) {
        console.log('getOtherAppQueryListAction', error);
      } finally {
        commit('setQueryOtherLoading', false);
      }
    },
    async getCategoryListAction({ commit }, payload) {
      try {
        const res = await getCategoryList(payload);
        const { code, data: resData } = res?.data || {};
        if (code === 200) {
          commit('setCategoryList', resData || []);
        }
      } catch (error) {
        console.log('getCategoryListAction error', error);
      }
    },
    async getUserInfoAction({ commit }, payload) {
      try {
        const res = await getUserInfo(payload);
        const { code, data: resData } = res?.data || {};
        if (code === 200) {
          commit('setUserInfo', resData);
        }
      } catch (error) {
        console.log('getUserInfoAction error', error);
      }
    },
  },
  modules: {},
});
export default store;
