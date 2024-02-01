<template>
  <!-- seo -->
  <metainfo>
    <link rel="canonical" href="https://market.desty.app" />
    <link rel="alternate" :href="`https://market.desty.app/${params.detailUrl}`" :hreflang="$t('seo.alternateLocale')" />
    <meta property="og:type" content="website" />
    <meta property="og:url" :content="`https://market.desty.app/${params.detailUrl}`" />
    <meta property="og:site_name" content="Desty Market" />
    <meta property="og:locale" :content="$t('seo.ogLocale')" />
    <meta property="og:image" content="https://www.desty.app/favicon.ico?v=2" />
    <meta property="og:image:secure_url" content="https://www.desty.app/favicon.ico?v=2" />
    <meta property="og:image:height" content="600" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="`https://market.desty.app/${params.detailUrl}`" />
    <meta property="twitter:image" content="https://www.desty.app/favicon.ico?v=2" />
    <meta name="twitter:domain" content="Desty App" />
  </metainfo>
  <div class="detail-page" v-loading="$store.state.detailLoading || $store.state.detailAddLoading">
    <Header>
      <div class="flex lang-box">
        <span :class="['lang-item', { 'lang-item-active': item.key === $store.state.language }]" v-for="item in LANGS" :key="item.key" @click="handleLang(item.key)">
          {{ item.label }}
        </span>
      </div>
    </Header>
    <Detail />
    <AddList />
    <DestyFooter
      :lang="$store.state.language"
      @handleNav="handleNavAction"
      @handleLang="handleLang"
    />
  </div>
</template>

<script setup>
import { DestyFooter } from 'desty-design';
import { watch, getCurrentInstance, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Header from "@/views/components/Header/index.vue";
import Detail from "@/views/detailPage/components/Detail/index.vue";
import AddList from "@/views/detailPage/components/AddList/index.vue";
import { LANGS } from '@/views/utils/constant';
import { handleNav } from '@/views/utils/utils';

const { proxy } = getCurrentInstance();
const store = useStore();
const route = useRoute();
const { params } = route;

async function handleLang(key) {
  store.commit("setLanguage", key);
  const storageEnabled = await store.state?.transRefStore?.()?.isStorageEnabled();
  if (storageEnabled) {
    store.state?.transRefStore?.()?.setCommonTranslate({
      dataKey: "lang",
      dataValue: key,
    });
  }
};

function handleNavAction(key) {
  handleNav(key, import.meta.env, route);
};

watch(() => store.state.userInfo, newValue => {
  if (typeof newValue === 'object') {
    const { userId = null, phone = null } = newValue || {};
    proxy.$dataReport('general: visit market detail page', {
      source: document.referrer,
      tools_name: params.detailUrl,
      is_logged_in: store.state.isLogin,
      user_id: userId,
      phone_number: phone,
    }, true);
  }
}, { immediate: true });

onMounted(async () => {
  try {
    const path = `${import.meta.env.VITE_API_URL}/${params.detailUrl}`;
    const res = await store.dispatch('getToolsDetailAction', { uniqueUrl: path });
    // get add query list
    const { categoryL2, appId } = res || {};
    store.dispatch('getAddQueryAtion', { appId, categoryL2 });
  } catch (error) {
    console.log('detail error', error);
  }
})

</script>

<style lang="less" scoped>
.detail-page {
  font-family: 'Plus Jakarta Sans';
  .lang-box {
    gap: 14px;
    .lang-item {
      font-weight: 400;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
    .lang-item-active {
      color: #000;
      font-weight: 700;
    }
  }
}
</style>