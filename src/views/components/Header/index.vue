<template>
  <div class="desty-header">
    <DestyHeaderV2
      class="home-page-header-v2"
      :lang="$store.state.language"
      :navs="navList"
      navKey="market"
      :showSubHeader="true"
      @handleNav="handleNavAction"
      @handleLang="handleLang"
    >
      <template v-slot:sub-menu-products-content>
        <!-- <div class="content-box">
          <div class="menu-title">{{ $t('header.subMenuTitle') }}</div>
          <div class="sub-menu-box">
            <div
              class="sub-menu-box-item"
              v-for="item in SUB_MENU_LIST"
              :key="item.key"
              @click="handleNavAction(item.key)"
            >
              <img
                class="icon-img-logo"
                v-lazy="`https://static.desty.app/desty-homepage/v2/${item.icon}.svg`"
                alt="desty market"
              />
              {{ $t(item.text) }}
            </div>
          </div>
        </div> -->
        <div class="sub-menu-box">
          <div class="omni-box" @click="handleNavAction(omni.key)">
            <img
              class="icon-img-logo"
              :src="`https://static.desty.app/desty-homepage/v2/${omni.icon}.svg`"
              alt="Desty App, Desty Omni, Desty Page, Desty Store, Desty Menu"
            />
            {{ omni.text }}
          </div>
          <div class="divide"></div>
          <div class="sub-title">{{ $t('header.subMenuTitle') }}</div>
          <div class="sub-menu-box-outer">
            <div
              class="sub-menu-box-item"
              v-for="item in subList"
              :key="item.key"
              @click="handleNavAction(item.key)"
            >
              <img
                class="icon-img-logo"
                :src="`https://static.desty.app/desty-homepage/v2/${item.icon}.svg`"
                alt="Desty App, Desty Omni, Desty Page, Desty Store, Desty Menu"
              />
              {{ item.text }}
            </div>
          </div>
        </div>
      </template>
      <template v-slot:mobile-sub-menu-products-content>
        <!-- <div
          class="mobile-sub-menu-box-item"
          v-for="item in SUB_MENU_LIST"
          :key="item.key"
          @click="handleNavAction(item.key)"
        >
          <img
            class="icon-img-logo"
            v-lazy="`https://static.desty.app/desty-homepage/v2/${item.icon}.svg`"
            alt="desty market"
          />
          {{ $t(item.text) }}
        </div> -->
        <div class="mobile-sub-menu-box">
          <div class="omni-box" @click="handleNavAction(omni.key)">
            <img
              class="icon-img-logo"
              :src="`https://static.desty.app/desty-homepage/v2/${omni.icon}.svg`"
              alt="Desty App, Desty Omni, Desty Page, Desty Store, Desty Menu"
            />
            {{ omni.text }}
          </div>
          <div class="divide"></div>
          <div class="sub-title">{{ $t('header.subMenuTitle') }}</div>
          <div
            class="mobile-sub-menu-box-item"
            v-for="item in subList"
            :key="item.key"
            @click="handleNavAction(item.key)"
          >
            <img
              class="icon-img-logo"
              :src="`https://static.desty.app/desty-homepage/v2/${item.icon}.svg`"
              alt="Desty App, Desty Omni, Desty Page, Desty Store, Desty Menu"
            />
            {{ item.text }}
          </div>
        </div>
      </template>
      <template v-slot:extra-content>
        <slot />
      </template>
      <!-- mobile dialog footer slot -->
       <template v-slot:menu-dialog-footer-extra-content>
          <div v-if="isNotLogin" class="flex f-jc-c f-ai-c start-now" @click="handleNavAction('startnow')">{{ $t('header.startNow') }}</div>
      </template>
    </DestyHeaderV2>
  </div>
</template>

<script setup>
import { DestyHeaderV2 } from 'desty-design';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { SUB_MENU_LIST } from "@/views/utils/constant";
import { handleNav } from "@/views/utils/utils";
import { useStore } from "vuex";

const [omni, ...subList] = SUB_MENU_LIST;
const store = useStore();
const { t } = useI18n();
const { push } = useRouter();
const route = useRoute();

// 更改语言
async function handleLang(key) {
  store.commit("setLanguage", key);
  const storageEnabled = await store.state?.transRefStore?.()?.isStorageEnabled();
  if (storageEnabled) {
    store.state?.transRefStore?.()?.setCommonTranslate({
      dataKey: "lang",
      dataValue: key,
    });
  }
}

// 导航
function handleNavAction(key) {
  handleNav(key, import.meta.env, route, push);
}

const navList = computed(() => {
  return [
    {
      label: t('header.home'),
      key: 'home',
    }, {
      label: t('header.products'),
      key: 'products',
      hasSubMenu: true,
    }, {
      label: t('header.market'),
      key: 'market',
    }, {
      label: t('header.blog'),
      key: 'blog',
    }, {
      label: t('header.helpcenter'),
      key: 'helpcenter',
    }
  ]
});

// 未登录
const isNotLogin = computed(() => {
  return !store.state.isLogin;
});


</script>

<style lang="less" scoped>
.desty-header {
  height: 112px;
}
.home-page-header-v2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 9;
  background-color: transparent;
  &::after {
    border-radius: 0px 0px 40px 40px;
    backdrop-filter: blur(10px);
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(243, 244, 245, 0.8);
    backdrop-filter: blur(10px);
    z-index: -1;
  }
  // .menu-title {
  //   font-weight: 800;
  //   font-size: 18px;
  //   color: #a6a6a6;
  // }
  // .sub-menu-box {
  //   display: flex;
  //   flex-wrap: wrap;
  //   width: 300px;
  //   .sub-menu-box-item {
  //     display: flex;
  //     align-items: center;
  //     width: 50%;
  //     font-size: 18px;
  //     color: rgba(0, 0, 0, 0.5);
  //     margin-top: 26px;
  //     .icon-img-logo {
  //       margin-right: 13px;
  //       width: 24px;
  //       height: 24px;
  //     }
  //     &:nth-child(2n) {
  //       justify-content: flex-end;
  //     }
  //   }
  // }
  // .mobile-sub-menu-box-item {
  //   display: flex;
  //   align-items: center;
  //   margin-bottom: 16px;
  //   font-size: 18px;
  //   .icon-img-logo {
  //     margin-right: 8px;
  //     width: 20px;
  //     height: 20px;
  //   }
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  .icon-img-logo {
    margin-right: 13px;
    width: 24px;
    height: 24px;
  }
  .divide {
    border-top: 1px solid #d9d9d9;
  }
  .sub-title {
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    font-weight: 500;
    line-height: 18px;
  }
  .omni-box {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
  }
  .sub-menu-box {
    width: 264px;

    .divide {
      margin: 20px 0;
    }
    .sub-menu-box-outer {
      display: flex;
      flex-wrap: wrap;
      .sub-menu-box-item {
        display: flex;
        align-items: center;
        width: 50%;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.5);
        margin-top: 20px;
      }
    }
  }
  .mobile-sub-menu-box {
    width: 232px;
    .divide {
      margin: 16px 0;
    }
    .mobile-sub-menu-box-item {
      display: flex;
      align-items: center;
      margin-top: 16px;
      font-size: 18px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .desty-header {
    height: 67px;
  }
  .home-page-header-v2 {
    .start-now {
      width: 100%;
      height: 48px;
      background: #0C1BB8;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.01em;
      color: #fff;
      margin-bottom: 34px;
    }
    :deep(.footer) {
      margin-bottom: 28px;
    }
  }
}
</style>
