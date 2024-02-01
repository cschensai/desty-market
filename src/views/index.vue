<template>
  <div class="template-box">
    <!-- seo -->
    <metainfo>
      <link rel="canonical" href="https://market.desty.app">
      <link rel="alternate" href="https://market.desty.app" :hreflang="$t('seo.alternateLocale')" />
      <title>desty market | {{ $t('seo.title') }}</title>
      <meta name="Page title" :content="`desty market | ${ $t('seo.title') }`" />
      <meta name="description" :content="$t('seo.metaDesc')" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://market.desty.app" />
      <meta property="og:site_name" content="Desty Market" />
      <meta property="og:locale" :content="$t('seo.ogLocale')" />
      <meta property="og:title" :content="`desty market | ${ $t('seo.title') }`" />
      <meta property="og:description" :content="$t('seo.metaDesc')" />
      <meta property="og:image" content="https://www.desty.app/favicon.ico?v=2" />
      <meta property="og:image:secure_url" content="https://www.desty.app/favicon.ico?v=2" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://market.desty.app" />
      <meta property="twitter:title" :content="`desty market | ${ $t('seo.title') }`" />
      <meta property="twitter:description" :content="$t('seo.metaDesc')" />
      <meta property="twitter:image" content="https://www.desty.app/favicon.ico?v=2" />
      <meta name="twitter:domain" content="Desty App">
      <component is="script" type="application/ld+json">{{ ldJson }}</component>
    </metainfo>
    <Header>
      <MagneticButton v-if="isBoolean && !isLogin" class="header-btn" @handleClick="handleNavAction('startnow')">
        {{ $t('header.startNow') }}
      </MagneticButton>
      <div v-else>{{ null }}</div>
    </Header>
    <div :class="['line-top', { 'line-top-login': isLogin }]" />
    <Business />
    <Ecosystem />
    <Extension v-if="isLogin" />
    <Built />
    <Extension v-if="!isLogin" />
    <Experience />
    <DestyFooter
      :class="['desty-footer', { 'desty-footer-login': isLogin }]"
      :lang="$store.state.language"
      @handleNav="handleNavAction"
      @handleLang="handleLang"
    />
  </div>
</template>

<script setup>
import { DestyFooter } from 'desty-design';
import { computed, watch, getCurrentInstance, onMounted } from 'vue';
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import Header from "@/views/components/Header/index.vue";
import MagneticButton from '@/components/MagneticButton/index.vue';
import Business from "@/views/components/Business/index.vue";
import Ecosystem from "@/views/components/Ecosystem/index.vue";
import Built from "@/views/components/Built/index.vue";
import Extension from "@/views/components/Extension/index.vue";
import Experience from "@/views/components/Experience/index.vue";
import { handleNav } from "@/views/utils/utils";

const route = useRoute();
const store = useStore();
const { proxy } = getCurrentInstance();
const { t } = useI18n();

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

const isBoolean = computed(() => {
  return typeof (store.state.isLogin) === 'boolean';
});

const isLogin = computed(() => {
  return store.state.isLogin;
});

const metaTitle = computed(() => {
  return store.state.isLogin ? t('seo.loginTitle') : t('seo.title');
});

// seo ld+json
const ldJson = computed(() => {
  return {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": `desty market | ${t('seo.title')}`,
    "url": "https://market.desty.app",
    "description": t('seo.metaDesc'),
    "image": "https://www.desty.app/favicon.ico?v=2",
    "identifier": "desty market",
    "alternateName": "Desty Market",
    "significantLink": "https://market.desty.app",
    "dateCreated": "2023-01-10T10:00:00TZD",
    "hasPart": "https://desty.app",
    "thumbnailUrl": "https://www.desty.app/favicon.ico?v=2"
  };
});

watch(() => store.state.userInfo, newValue => {
  if (typeof newValue === 'object') {
    const { userId = null, phone = null } = newValue || {};
    proxy.$dataReport('general: visit market page', {
      source: document.referrer,
      is_logged_in: store.state.isLogin,
      user_id: userId,
      phone_number: phone,
    }, true);
  }
}, { immediate: true });


onMounted(() => {
 // 查询desty list和一级分类列表
  store.dispatch('getDestyAppQueryListAction');
  store.dispatch('getCategoryListAction');
  // 0 代表全部，查询extension列表
  store.dispatch('getOtherAppQueryListAction', { categoryId: "" });
})

</script>

<style lang="less" scoped>
.template-box {
  .avatar-box {
    display: flex;
    align-items: center;
    gap: 10px;
    .avatar-img {
      width: 31px;
      height: 31px;
      border: 2px solid #fff;
      background-color: #fff;
      border-radius: 100%;
    }
  }
  .line-top {
    width: 1210px;
    border-top: 1px solid #000;
    margin: 0 auto;
    margin-top: -4px;
    &-login {
      margin-top: -6px;
    }
  }
  .desty-footer {
    width: 100%;
    position: absolute;
    z-index: 2;
    margin-top: 0;
    &-login {
      margin-top: -80px;
    }
  }
  .header-btn {
    cursor: pointer;
    width: unset;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    gap: 12px;
    width: 142px;
    height: 48px;
    border-radius: 12px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #fff;
  }
}
@media screen and (max-width: 768px) {
  .template-box {
    overflow-x: hidden;
    .line-top {
      display: none;
    }
    .desty-footer {
      margin-top: -30px;
      position: relative;
      &-login {
        margin-top: -60px;
      }
    }
  }
}
</style>
