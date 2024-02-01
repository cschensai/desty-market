<template>
<!-- seo -->
 <metainfo>
    <title>desty market | {{ detailInfo.appName }}</title>
    <meta name="Page title" :content="`desty market | ${detailInfo.appName}`" />
    <meta property="og:title" :content="`desty market | ${detailInfo.appName}`" />
    <meta property="twitter:title" :content="`desty market | ${detailInfo.appName}`" />
    <meta name="description" :content="descShortText" />
    <meta property="og:description" :content="descShortText" />
    <meta property="twitter:description" :content="descShortText" />
    <component is="script" type="application/ld+json">{{ ldJson }}</component>
  </metainfo>
  <div class="detail">
    <div class="shadow-bg"></div>
    <div class="top-info">
      <div class="flex left">
        <img class="logo" v-lazy="detailInfo.icon" alt="desty-market" />
        <div class="flex f-jc-c f-fd-c title-tags">
          <div class="flex title-flag">
            <div class="title">{{ detailInfo.appName }}</div>
            <div v-if="detailInfo.actionType === '99'" class="added-flag">
              <img width="14" height="14" class="check" v-lazy="'https://static.desty.app/desty-market/check.png?x-oss-process=style/img-webp'" alt="desty market" />Added
            </div>
          </div>
          <div class="flex tags">
            <span class="tag-item" v-for="item in detailInfo.cateTags" :key="item">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
        <el-button
          v-if="detailInfo.actionBtnText"
          :loading="addAppLoading"
          :class="['right', { 'right-ghost': detailInfo.actionType === '2', 'right-disabled': detailInfo.actionType === '3' }]"
          @click="handleAddApp(detailInfo.actionType, detailInfo.actionBtnText)"
        >{{ $t(detailInfo.actionBtnText) }} <img class="website-img" v-if="detailInfo.actionType === '2'" v-lazy="'https://static.desty.app/desty-market/website.png?x-oss-process=style/img-webp'" alt="desty market" />
      </el-button>
    </div>
    <div class="flex detail-info">
      <div class="left-info">
        <div class="cards-box">
          <template v-if="store.state.isMobile">
            <div class="cards-box-inner">
              <div class="card-item" @click="handleImg(index)" v-for="(item, index) in detailInfo.imageAttachment" :key="index">
                <!-- 1.视频 2.图片 -->
                <img class="card-img" v-lazy="item.urlType === 1 ? item.videoCoverUrl :
                `${item.url}?x-oss-process=style/img-webp`"  alt="desty market" />
                <div class="flex f-jc-c f-ai-c mask-video" v-if="item.urlType === 1"><img v-lazy="'https://static.desty.app/desty-market/video-play.png'" alt="desty market" /></div>
              </div>
            </div>
          </template>
          <template v-else>
            <img v-if="detailInfo.imageAttachment?.length > 3" @click="handlePrev" class="left-arrow-single" v-lazy="'https://static.desty.app/desty-market/left-arrow-single.png?x-oss-process=style/img-webp'" alt="desty market" />
            <swiper
              :key="detailInfo.imageAttachment?.length"
              :slidesPerView="3"
              :spaceBetween="24"
              :loop="detailInfo.imageAttachment?.length > 3"
              @swiper="setSwiperRef"
            >
              <swiper-slide
                v-for="(item, index) in detailInfo.imageAttachment"
                :key="index"
              >
                <div class="card-item" @click="handleImg(index)">
                  <!-- 1.视频 2.图片 -->
                  <img class="card-img" v-lazy="item.urlType === 1 ? item.videoCoverUrl : `${item.url}?x-oss-process=style/img-webp`" alt="desty market" />
                  <div class="flex f-jc-c f-ai-c mask-video" v-if="item.urlType === 1"><img v-lazy="'https://static.desty.app/desty-market/video-play.png'" alt="desty market" /></div>
                </div>
              </swiper-slide>
            </swiper>
            <img v-if="detailInfo.imageAttachment?.length > 3" @click="handleNext" class="right-arrow-single" v-lazy="'https://static.desty.app/desty-market/right-arrow-single.png?x-oss-process=style/img-webp'" alt="desty market" />
          </template>
        </div>
        <div class="tools">
          <!-- <h1 class="title">{{ $t('detailPage.toolsTitle') }}</h1> -->
          <div class="desc" v-html="descText"></div>
        </div>
      </div>
      <div class="right-info">
        <h1 class="information-title">{{ $t('detailPage.information') }}</h1>
        <div class="flex f-ai-c home">
          <img class="home-icon" v-lazy="'https://static.desty.app/desty-market/home.png?x-oss-process=style/img-webp'" alt="desty market" />
          <a class="link-text home-link one-ellipsis" rel="noopener noreferrer" href="javascript: void(0);"
             @click="handleHref('home', detailInfo.homeUrl)">{{ detailInfo.homeUrl }}</a>
        </div>
        <div class="flex f-ai-c mail">
          <img class="mail-icon" v-lazy="'https://static.desty.app/desty-market/mail.png?x-oss-process=style/img-webp'" alt="desty market" />
          <a class="link-text" href="javascript: void(0);" @click="handleHref('email', detailInfo.email)" rel="noopener noreferrer">{{ detailInfo.email }}</a>
        </div>
        <h1 class="integrated-with-title">{{ $t('detailPage.integratedWith') }}</h1>
        <div class="flex f-ai-c integrated-with-box">
          <img class="product-logo" v-lazy="detailInfo.categoryL2Icon" alt="desty market" />
          <span class="product-name">{{ detailInfo.categoryL2Name }}</span>
        </div>
        <h1 class="how-integrate-title">{{ $t('detailPage.howtoIntegrate') }}</h1>
        <a class="link-text" href="javascript: void(0);" @click="handleHref('integrate', detailInfo.integrateUrl)" rel="noopener noreferrer">{{ $t('detailPage.readHere') }}</a>
      </div>
    </div>
    <SwiperDialog :visible="swiperDialogVisible" :imgIndex="imgIndex" :assets="detailInfo.imageAttachment" @handleClose="handleCloseSwiperDialog" />
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
import { ElButton } from 'element-plus';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperDialog from '../SwiperDialog/index.vue';
import { ACTION_TYPE_OBJ } from '@/views/utils/constant';
import { linkURLAddQuery } from '@/views/utils/utils';
import 'swiper/css';

const swiperDialogVisible = ref(false);
const store = useStore();
const { params } = useRoute();
const route = useRoute();
const swiperRef = ref(null);
const imgIndex = ref(0);
const addAppLoading = ref(false);
const { t } = useI18n();
const { proxy } = getCurrentInstance();

function handleImg(index) {
  imgIndex.value = index;
  swiperDialogVisible.value = true;
  const { userId = null, phone = null } = store.state.userInfo || {};
  proxy.$dataReport('general: market detail page actions', {
    tools_name: params.detailUrl,
    enlarge_banner: (+index) + 1, // number类型
    user_id: userId,
    phone_number: phone,
  });
}

function handleCloseSwiperDialog() {
  swiperDialogVisible.value = false;
}

function setSwiperRef (swiper) {
  swiperRef.value = swiper;
};

// 上一张
function handlePrev() {
  swiperRef.value?.slidePrev();
}

// 下一张
function handleNext() {
  swiperRef.value?.slideNext();
}

// action type button
async function handleAddApp(type, btnText) {
  // 1.add app 2.go to website 3.coming soon 4.see app
  if (type === '1') {
    // 已登录
    if (store.state.isLogin) {
      try {
        addAppLoading.value = true;
        const path = `${import.meta.env.VITE_API_URL}/${params.detailUrl}`;
        const success = await store.dispatch('addAppAction', { uniqueUrl: path });
        if (success) {
          store.dispatch('getToolsDetailAction', { uniqueUrl: path });
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        addAppLoading.value = false;
      }
    } else{
      // 未登录
      const redirect_url = window.encodeURIComponent(location.href);
      let urlLink = `${import.meta.env.VITE_OMNI_URL}/register?redirectUrl=${redirect_url}`;
      urlLink = linkURLAddQuery(urlLink, route)
      location.href = urlLink;
    }
  } else if (type === '2' || type === '99') { // 2: go to website 99: see app
    const { userId = null, phone = null } = store.state.userInfo || {};
    proxy.$dataReport('general: market detail page actions', {
      tools_name: params.detailUrl,
      action_button_redirect: t(btnText),
      user_id: userId,
      phone_number: phone,
    });
    window.open(detailInfo.value.actionUrl);
  }else if(type === '4'){
    window.open(detailInfo.value.redirectUrl);
  }
}

// click href
function handleHref(type, address) {
  let url, key;
  address = linkURLAddQuery(address, route)
  if (type === 'home') {
    url = address;
    key = 'tool_website_redirect';
  } else if (type === 'integrate') {
    url = address;
    key = 'how_to_redirect';
  } else if (type === 'email') {
    url = `mailto:${address}`;
    key = 'email_redirect';
  }
  if (url) window.open(url);
  const { userId = null, phone = null } = store.state.userInfo || {};
  proxy.$dataReport('general: market detail page actions', {
    tools_name: params.detailUrl,
    [key]: address,
    user_id: userId,
    phone_number: phone,
  });
}

// 详细信息
const detailInfo = computed(() => {
  const info = store.state.toolsDetail || {};
  info.imageAttachment = info.imageAttachment || [];
  info.videoAttachment = info.videoAttachment || [];
  info.imageAttachment = info.imageAttachment.sort((a,b) => (a.sort - b.sort))
  info.imageAttachment = info.videoAttachment.concat(info.imageAttachment);
  const cateTags = [info.categoryL1Name, info.categoryL2Name].filter(i => i);
  return {
    ...info,
    actionBtnText: ACTION_TYPE_OBJ[info.actionType],
    cateTags,
  };
});

const descText = computed(() => {
  const { language } = store.state;
  return language === 'id' ? detailInfo.value.contextIndonesia : detailInfo.value.context;
});

const descShortText = computed(() => {
  const { language } = store.state;
  return language === 'id' ? detailInfo.value.titleIndonesia : detailInfo.value.title;
});

const metaTitle = computed(() => {
  return store.state.isLogin ? t('seo.loginTitle') : t('seo.title');
});

// seo ld+json
const ldJson = computed(() => {
  return {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": `desty market | ${metaTitle.value}`,
    "url": `https://market.desty.app/${params.detailUrl}`,
    "description": descShortText.value,
    "image": "https://www.desty.app/favicon.ico?v=2",
    "identifier": "desty market",
    "alternateName": detailInfo.value.appName,
    "significantLink": `https://market.desty.app/${params.detailUrl}`,
    "dateCreated": "2023-01-10T10:00:00TZD",
    "hasPart": "https://desty.app",
    "thumbnailUrl": "https://www.desty.app/favicon.ico?v=2"
  };
});

</script>

<style lang="less" scoped>
  .detail {
    width: 1210px;
    margin: 0 auto;
    position: relative;
    .shadow-bg {
      position: absolute;
      width: 826.3px;
      height: 854.21px;
      left: -647.49px;
      top: -26px;
      background: linear-gradient(151.45deg, rgba(12, 27, 184, 0.23) -4.34%, rgba(12, 27, 184, 0.2) 106.2%);
      filter: blur(200px);
      z-index: -1;
    }
    .top-info {
      padding: 100px 0 49px;
      border-bottom: 1px solid #D9D9D9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        flex: 1;
        .logo {
          width: 104px;
          height: 104px;
          box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
          border-radius: 11px;
        }
        .title-tags {
          margin: 0 30px 0 20px;
          flex: 1;
          .title-flag {
            flex: 1;
            .title {
              font-weight: 800;
              font-size: 32px;
              line-height: 40px;
              color: #374151;
              // flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .added-flag {
              width: 93px;
              height: 36px;
              flex-shrink: 0;
              margin-left: 26px;
              background-color: #ADB1BA;
              border-radius: 4px;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 800;
              font-size: 14px;
              .check {
                margin-right: 8px;
              }
            }
          }
          .tags {
            gap: 8px;
            margin-top: 16px;
            .tag-item {
              padding: 8px 16px;
              background-color: rgba(0, 0, 0, 0.04);
              border-radius: 49px;
              font-weight: 500;
              font-size: 16px;
              color: #6D737F;

            }
          }
        }
      }
      .right {
        font-family: "Plus Jakarta Sans";
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 56px;
        padding: 16px 20px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: -0.01em;
        color: #fff;
        background-color: #0C1BB8;
      }
      .right-ghost {
        border: 2px solid #0000BB;
        background-color: unset;
        color: #0000BB;
        font-weight: 400;
        .website-img {
          margin-left: 10px;
        }
      }
      .right-disabled {
        background-color: #C8CDD3;
        border: 2px solid #8E939E;
        box-shadow: 4px 4px 0px #8E939E;
      }
    }
    .detail-info {
      margin-top: 40px;
      justify-content: space-between;
      .left-info {
        width: 738px;
        .cards-box {
          position: relative;
          .left-arrow-single,
          .right-arrow-single {
            position: absolute;
            width: 24px;
            height: 24px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          }
          .left-arrow-single {
            left: -50px;
          }
          .right-arrow-single {
            right: -50px;
          }
          .card-item {
            width: 230px;
            height: 130px;
            background-color: #D9D9D9;
            cursor: pointer;
            position: relative;
            .card-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            .mask-video {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25));
              
            }
          }
        }
        .tools {
          margin-top: 41px;
          .title {
            margin: 40px 0 24px;
            font-weight: 700;
            font-size: 20px;
            color: #000;
          }
          .desc {
            max-width: 738px;
            font-size: 16px;
            line-height: 145%;
            color: #374151;
            :deep(ul) {
              list-style: disc !important;
              // list-style-position: inside !important;
              li {
                margin-bottom: 8px;
                display: flex;
                &::marker {
                 content: '';
                }
                &::before {
                  content: '';
                  flex-shrink: 0;
                  margin: 2px 8px 0 0;
                  width: 21px;
                  height: 21px;
                  background-image: url('https://static.desty.app/desty-market/check-li.svg');
                  background-size: 100% 100%;
                }
              }
            }
            :deep(h1) {
              margin-bottom: 24px;
              line-height: 38px;
            }
            :deep(h2) {
              margin-bottom: 20px;
              line-height: 30px;
            }
            :deep(h3) {
              margin-bottom: 18px;
            }
            :deep(h4) {
              margin-bottom: 16px;
            }
            :deep(h5) {
              margin-bottom: 14px;
              line-height: 20px;
            }
            :deep(p) {
              margin-bottom: 12px;
            }
          }
        }
      }
      .right-info {
        flex: 1;
        margin-left: 130px;
        width: calc(100% - 868px);
        .information-title,
        .integrated-with-title,
        .how-integrate-title {
          font-weight: 700;
          font-size: 20px;
          line-height: 25px;
          color: #000;

        }
        .home-icon,
        .mail-icon {
          width: 15px;
          height: 15px;
          margin-right: 14px;
        }
        .link-text {
          font-size: 18px;
          color: #0000BB;
        }
        .home {
          margin-top: 20px;
          .home-link {
            text-decoration: none;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .mail {
          margin-top: 16px;
        }
        .integrated-with-title {
          margin-top: 40px;
        }
        .integrated-with-box {
          margin-top: 20px;
          .product-logo {
            width: 22px;
            height: 22px;
            margin-right: 12px;
            border-radius: 100%;
          }
          .product-name {
            font-weight: 400;
            font-size: 18px;
            line-height: 23px;
            color: #000;
          }
        }
        .how-integrate-title {
          margin: 40px 0 16px;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .detail {
      width: 100%;
      .shadow-bg {
        width: 200px;
        height: 464.8px;
        left: -100px;
        top: 94px;
        filter: blur(120px);
      }
      .top-info {
        padding: 42px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0 18px;
        .left {
          .logo {
            width: 100px;
            height: 100px;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
            border-radius: 11px;
          }
          .title-tags {
            margin: 0 0 0 16px;
            .title-flag {
              .title {
                font-size: 28px;
                line-height: 35px;
              }
              .added-flag {
                margin-left: 16px;
                width: 76px;
                height: 30px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 12px;
                .check {
                  margin-right: 6px;
                }
              }
            }
            .tags {
              gap: 12px;
              .tag-item {
                white-space: nowrap;
                padding: 6px 8px;
                font-size: 12px;
              }
            }
        }
        }
        .right {
          margin-top: 40px;
          font-size: 16px;
        }
      }
      .detail-info {
        flex-direction: column;
        .left-info {
          width: 100%;
          .cards-box {
            margin-left: 18px;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            &::-webkit-scrollbar {
              display: none;
            }
            .cards-box-inner {
              width: max-content;
              display: flex;
              .card-item {
                flex-shrink: 0;
                width: 230;
                height: 130px;
                margin-right: 18px;
                overflow: hidden;
                .card-img {
                  object-fit: contain;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .tools {
            margin: 40px 18px 0;
            .desc {
              max-width: 100%;
              line-height: 26px;
              :deep(ul) {
                li {
                  &::before {
                    margin-top: 4px;
                    width: 17px;
                    height: 17px;
                  }
                }
              }
            }
          }
        }
        .right-info {
          margin: 40px 18px 0;
          width: calc(100% - 40px);
          .integrated-with-box {
            margin-top: 24px;
          }
        }
      }
    }
  }
</style>