<template>
  <section
    id="built-by-desty"
    :class="['market-built', { 'login-built': isLogin }]"
    v-loading="$store.state.queryDestyLoading"
  >
    <div class="built">
      <div class="built-header">
        <p class="built-header-title">{{ $t("built.mainTitle") }}</p>
        <p class="built-header-des">
          {{ $t("built.desc") }}
        </p>
      </div>
      <div class="built-content-outer">
        <div class="built-content">
          <div
            v-for="item in $store.state.destyQueryList"
            :key="item.appId"
            class="built-content-item"
            @click="handleDetail(item.detailUrl, item.appName)"
          >
            <div class="flex f-fd-c f-ai-c built-content-item-image">
              <img
                v-lazy="`${item.icon}?x-oss-process=style/img-webp`"
                alt="desty market"
              />
            </div>
            <div class="built-content-item-text">
              <p class="built-content-item-title">{{ item.appName }}</p>
              <p
                class="built-content-item-des three-ellipsis"
                :title="descShortText(item.titleIndonesia, item.title)"
              >
                {{ descShortText(item.titleIndonesia, item.title) }}
              </p>
              <div class="tag">{{ item.categoryL1Name }}</div>
            </div>
          </div>
        </div>
        <img
          v-if="isLogin"
          v-lazy="
            'https://static.desty.app/desty-market/built_white.png?x-oss-process=style/img-webp'
          "
          alt="desty market"
          class="built-white"
        />
        <div class="built-blue">
          <img
            v-lazy="
              'https://static.desty.app/desty-market/built_blue.png?x-oss-process=style/img-webp'
            "
            alt="desty market"
            class="built-blue-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { linkURLAddQuery } from "@/views/utils/utils";
import { pushLog } from "@/sls/pushLog";

const { push } = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();
const route = useRoute();

const isLogin = computed(() => {
  return store.state.isLogin;
});

function descShortText(descShortIndonesia, descShortEn) {
  const { language } = store.state;
  return language === "id" ? descShortIndonesia : descShortEn;
}

// push detail
function handleDetail(detailUrl, appName) {
  let { pathname } = new URL(detailUrl);
  pathname = linkURLAddQuery(pathname, route)
  pathname && push(pathname);
  const { userId = null, phone = null } = store.state.userInfo || {};
  proxy.$dataReport('general: clicks market tool', {
    source: document.referrer,
    tools_name: appName,
    is_logged_in: isLogin.value,
    user_id: userId,
    phone_number: phone,
  });
  pushLog({
    key: 'handle_built_detail',
    token: store.state.currToken,
    userId,
    phone,
    detailUrl,
    appName,
  });
}
</script>

<style lang="less" scoped>
.market-built {
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  padding-top: 110px;
  padding-bottom: 124px;
  margin: 0 auto;
  background: var(--sapphire-sapphire-50, #eff2ff);
  font-family: "Plus Jakarta Sans";
}
.login-built {
  //background: linear-gradient(179.65deg, #fff 0.3%, rgba(159, 174, 255, 0.33) 84.91%);
}
.built {
  box-sizing: border-box;
  font-style: normal;
  color: #000;
  width: 1210px;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  gap: 53px;
  &-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 360px;
    &-title {
      color: var(--gray-gray-900, #31333a);
      font-size: 40px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 12px;
      text-align: left;
      width: 100%;
    }
    &-des {
      color: var(--gray-gray-900, #31333a);
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  &-content {
    width: 796px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    &-item {
      width: 388px;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      padding: 24px 20px;
      height: 190px;
      // width: 304px;
      border-radius: 12px;
      background: var(--white, #fff);
      gap: 16px;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .tag {
        width: 164px;
        height: 36px;
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.04);
        border-radius: 49px;
        text-align: center;
        line-height: 36px;
        color: var(--gray-gray-500, #6d737f);
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
      }
      img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
      }
      &-title {
        color: var(--gray-gray-900, #31333a);
        text-align: left;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.2px;
      }
      &-des {
        color: var(--gray-gray-700, #4f535d);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        letter-spacing: -0.16px;
        margin-bottom: 8px;
        height: 78px;
      }
    }
  }
  .built-white {
    position: absolute;
    width: 912px;
    height: 787.59px;
    left: -645px;
    top: 32px;
    z-index: -1;
  }
  .built-blue {
    position: absolute;
    width: 403px;
    height: 619px;
    // left: 1187px;
    right: 0;
    top: 363px;
    overflow: hidden;
    border-end-end-radius: 20px;
    z-index: -1;
    // z-index: 2;
    &-img {
      width: 784.77px;
      height: 757.57px;
    }
  }
}
@media screen and (max-width: 768px) {
  .market-built {
    width: 100%;
    overflow: unset;
    border-radius: 0;
    padding-bottom: 48px;
    //padding-top: 60px;
  }
  .built {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    gap: 0;
    height: auto;
    padding-bottom: 48px;
    &-header {
      margin-bottom: 24px;
      width: 100%;
      align-items: flex-start;
      &-title {
        color: #000;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-align: left;
        margin-bottom: 8px;
      }
      &-des {
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: left;
      }
    }
    &-content-outer {
      overflow-x: auto;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
      }
    }
    &-content {
      width: 100%;
      &-item {
        box-sizing: border-box;
        padding: 16px;
        width: 100%;
        height: 156px;
        img {
          width: 48px;
          height: 48px;
        }
        .tag {
          color: var(--gray-gray-500, #6d737f);
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px;
          width: 120px;
          height: 24px;
        }
        &-title {
          color: var(--primary-colors-black, #000);
          text-align: left;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.18px;
          margin-bottom: 8px;
        }
        &-des {
          color: var(--gray-gray-700, #4f535d);
          font-family: Plus Jakarta Sans;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 142.857% */
          letter-spacing: -0.14px;
          height: 64px;
        }
      }
    }
    .built-white {
      display: none;
    }
    .built-blue {
      width: 265px;
      height: 149px;
      right: 0px;
      top: 418px;
      &-img {
        width: 418px;
        height: 418px;
      }
    }
  }
}
</style>
