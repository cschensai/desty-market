<template>
  <div class="business" v-loading="!isInited">
    <template v-if="isInited">
      <!-- has login -->
      <div class="business-main" v-if="!isMobile">
        <div class="business-describe">
          <div class="business-describe-tilte">
            <p class="mark-text">{{ $t('notLogin.find') }}</p>
            <div class="swiper">
              <div class="swiper-wrapper">
                <div v-for="item in TEXT_ADS" class="swiper-slide mark-text" v-html="getTextObj(item).textHtml"></div>
              </div>
            </div>

            <br>
            <p class="mark-text">{{ $t('notLogin.serviceYouNeed') }}</p><br>
            <p class="mark-text">{{ $t('notLogin.toImprove') }}</p>
            <div class="swiper">
              <div class="swiper-wrapper">
                <div v-for="item in TEXT_ADS" class="swiper-slide mark-text" v-html="getTextObj(item).adsHtml"></div>
              </div>
            </div>

          </div>
          <div class="business-describe-bg"></div>
          <ScrollBar class="business-scroll"/>
        </div>
        <img class="business-bg"
             v-lazy="'https://static.desty.app/desty-market/business_bg.png?x-oss-process=style/img-webp'"
             alt="desty market"/>
      </div>
      <div class="business-main is-mobile" v-if="isMobile">
        <div class="business-describe">
          <div class="business-describe-tilte" :class="lang === 'en'?'':'column-flex'">
            <p class="mark-text">{{ $t('notLogin.find') }}</p>
            <div class="swiper" :style="{top:lang === 'en'?'6px':'0px'}">
              <div class="swiper-wrapper">
                <div v-for="item in TEXT_ADS" class="swiper-slide mark-text" v-html="getTextObj(item).textHtml"></div>
              </div>
            </div>
            <p class="mark-text">{{ $t('notLogin.serviceYouNeed') }}</p>
            <p class="mark-text">{{ $t('notLogin.toImprove') }}</p>
            <div class="swiper" style="top: 0;">
              <div class="swiper-wrapper">
                <div v-for="item in TEXT_ADS" class="swiper-slide mark-text" v-html="getTextObj(item).adsHtml"></div>
              </div>
            </div>
          </div>
          <div class="business-describe-bg"></div>
          <ScrollBar class="business-scroll"/>
        </div>
        <img class="business-bg"
             v-lazy="'https://static.desty.app/desty-market/business_bg_mobile.png?x-oss-process=style/img-webp'"
             alt="desty market"/>
      </div>
    </template>
  </div>
</template>
<script setup>
import {computed, reactive, onMounted, onUnmounted} from 'vue';
import {useStore} from 'vuex';
import ScrollBar from "../ScrollBar/index.vue";
import Swiper from 'swiper';
import "swiper/css"
import SwiperCore, {Autoplay} from 'swiper/core';

SwiperCore.use([Autoplay]);

const store = useStore();
// id 语言类型
const lang = computed(() => {
  return store.state.language || 'id';
});
const isInited = computed(() => {
  return typeof (store.state.isLogin) === 'boolean';
})

const isLogin = computed(() => {
  return store.state.isLogin;
});

const isMobile = computed(() => {
  return store.state.isMobile;
});
const TEXT_ADS = reactive([
  {
    id: 1,
    text: "Fulfillment",
    enAds: "Efficiency",
    idAds: "Efisiensi",
    color: "#0ddddd",
  },
  {
    id: 2,
    text: "Financial",
    enAds: "Cash Flow",
    idAds: "Cash Flow",
    color: "#13d27d",
  },
  {
    id: 3,
    text: "Merchant Tools",
    enAds: "Effectiveness",
    idAds: "Efektivitas",
    color: "#0088ff",
  },
  {
    id: 4,
    text: "Software",
    enAds: "Operations",
    idAds: "Operasional",
    color: "#ff8800",
  },
  {
    id: 5,
    text: "Sales Channel",
    enAds: "Revenue",
    idAds: "Pendapatan",
    color: "#7c3aed",
  }, {
    id: 6,
    text: "Marketing",
    enAds: "Exposure",
    idAds: "Exposure",
    color: "#db0022"
  }
])

function getTextObj(obj) {
  obj.ads = lang.value === "en" ? obj.enAds : obj.idAds;
  const currObj = {
    textHtml: `<p style="color:${obj.color};font-weight:800">${obj.text}</p>`,
    adsHtml: `<p style="color:${obj.color};font-weight:800">${obj.ads}</p>`,
  }
  return currObj;
}

// 点击explore
function handleExplore()
{
  const builtByDestyEle = document.getElementById("built-by-desty");
  builtByDestyEle.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
};
onMounted(() => {
  new Swiper(".swiper", {
    direction: 'vertical',
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper
    loop: true,
    autoplay: {
      delay: 800,
    }
  })
})
</script>
<style lang="less" scoped>
@keyframes pcslideUp {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 -80vw;
  }
}

@keyframes mobileslideUp {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 -1008px;
  }
}

.business {
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  color: #000000;
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 600px;
  margin-bottom: 123px;

  &-animation-login {
    position: absolute;
    background: radial-gradient(#f7f7ff 60%, rgba(159, 174, 255, 0.33) 100%);
    width: 100%;
    z-index: -1;
    border-bottom-left-radius: 5%;
    border-bottom-right-radius: 5%;
    overflow: hidden;

    .bg-logo {
      animation: pcslideUp 20s linear infinite;
      width: 100%;
      height: 100%;
      background: url(https://static.desty.app/desty-market/desktop-logged-market-full.png) repeat-y 0 0;
      background-size: 100% 80vw;
    }
  }

  .business-bg {
    position: absolute;
    right: 0;
    top: -110px;
    width: 829px;
    height: 774px;

  }

  .strong {
    font-weight: 800;
  }

  &-main {
    width: 1210px;
    display: flex;
    justify-content: space-between;
  }

  &-describe {
    width: 100%;
    margin: 0 auto;
    padding-top: 190px;

    &-tilte {
      font-size: 48px;
      line-height: 64px;
      font-weight: 300;
      &.column-flex {
        display: flex;
        flex-direction: column;
      }
    }

    &-des {
      width: 550px;
      font-size: 24px;
      line-height: 42px;
      color: #474747;
      margin-top: 24px;
    }

    &-btn {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 12px;
      width: 207px;
      height: 56px;
      border-radius: 12px;
      font-size: 18px;
      line-height: 23px;
      color: #ffffff;
      margin-top: 28px;
    }

    &-bg {
      width: 826.3px;
      height: 854.21px;
      position: absolute;
      left: -666px;
      top: 245px;
      background: linear-gradient(151.45deg,
        rgba(12, 27, 184, 0.23) -4.34%,
      rgba(12, 27, 184, 0.2) 106.2%);
      filter: blur(200px);
      transform: rotate(10.49deg);
    }

    &.is-mobile {
      &-tilte {
        font-size: 32px;
        line-height: 40px;
        font-weight: 300;
      }
    }
  }

  &-scroll {
    margin-top: 75px;
  }

  .login-box {
    width: 100%;
    height: 800px;
    margin-top: -112px;
    font-size: 64px;
    line-height: 84px;
    color: #000000;

    .line {
      width: 1210px;
      border: 1px solid #000000;
    }

    .id-text-box,
    .en-text-box {
      max-width: 510px;
      text-align: center;
    }
  }

  .mark-text {
    font-size: 48px;
    line-height: 64px;
    height: 64px;
    display: inline-block;
    margin-right: 8px;
  }

  .swiper {
    margin: 0;
    height: 64px;
    display: inline-block;
    position: relative;
    top: 14px;
  }
}

@media screen and (max-width: 768px) {
  .business {
    padding: 0 16px;
    min-height: 384px;
    margin-bottom: 80px;

    &-main {
      width: 100%;
      flex-direction: column;
      border-top: none;
    }

    &-describe {
      padding-top: 40px;

      &-tilte {
        font-size: 32px;
        line-height: 40px;
      }

      &-des {
        display: none;
      }

      &-btn {
        width: 140px;
        height: 52px;
        font-size: 16px;
        line-height: 20px;
      }
    }

    .mobile-scroll-down {
      font-size: 16px;
      line-height: 28px;
      text-align: center;
      color: #000000;
    }

    &-animation-login {
      width: 100%;
      height: 800px;
      border-bottom-left-radius: 2%;
      border-bottom-right-radius: 2%;
      background: radial-gradient(#f7f7ff 10%, rgba(159, 174, 255, 0.33) 100%);

      .bg-logo {
        animation: mobileslideUp 20s linear infinite;
        width: 100%;
        height: 100%;
        background: url(https://static.desty.app/desty-market/mobile-logged-market-full.png) repeat-y 0 0;
        background-size: cover;
      }
    }

    .business-bg {
      position: absolute;
      right: 0;
      top: 132px;
      width: 180px;
      height: 240px;
      flex-shrink: 0;
      object-fit: cover;
    }

    .login-box {
      margin-top: -58px;
      font-weight: 400;
      font-size: 40px;
      line-height: 60px;

      .en-text-box,
      .id-text-box {
        max-width: 328px;
        text-align: center;
      }
    }

    .mark-text {
      font-size: 32px;
      line-height: 40px;
      height: 40px;
    }

    .swiper {
      height: 40px;
      display: inline-block;
      position: relative;
      top: 6px;
    }
  }


}
</style>
