<template>
  <router-view></router-view>
  <DestyTranslate
    ref="destyTranslateRef"
    :isProduction="isProduction"
  />
</template>
<script setup>
import { DestyTranslate } from 'desty-design';
import { onBeforeMount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import flexible from './utils/flexible';

const store = useStore();
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
const destyTranslateRef = ref(null);


// 获取当前产线的token
async function handleGetTokenAndSetLanguage() {
  try {
    const storageEnabled = await destyTranslateRef.value?.isStorageEnabled();
    let lang = 'id';
    if (storageEnabled) {
      lang = await destyTranslateRef.value?.getCommonTranslateBySingleKey("lang");
    };
    store.commit('setLanguage', lang);
    if (store.state.currToken) {
      // 设置本地和脚本token、source信息 storageEnabled: 如果chrome未阻止storage的存储
      store.dispatch('getUserInfoAction');
    } else {
      store.commit('setCleaToken');
    }
  } catch (error) {
    console.log('handleGetToken error', error);
  }
}

onBeforeMount(() => {
  if (document.body.clientWidth < 768) {
    store.commit("setIsMobileMode", true);
  }
  window.onresize = () => {
    if (document.body.clientWidth < 768) {
      store.commit("setIsMobileMode", true);
    } else {
      store.commit("setIsMobileMode", false);
    }
  };
});

onMounted(() => {
  // this.transRef具体用法，可见DestyTranslate相关API
  store.commit('setTransRefStore', () => destyTranslateRef.value);
  handleGetTokenAndSetLanguage();
  // 设备自适配
  flexible(window, document);
});
</script>


<style lang="less">
@import 'desty-design/lib/style.css';
body {
  #app {}
}
</style>
