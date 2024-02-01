<template>
  <div class="extension-tools">
      <div class="flex f-fw-w f-jc-sb extension-tools-list">
        <Card @click.native="handleDetail(item.detailUrl, item.appName)" v-for="item in $store.state.otherQuerySliceList" :item="item" :key="item.appId" />
      </div>
      <div class="flex f-jc-c f-ai-fe more-box" v-if="!isLoadAll">
      <div @click="handleMore" class="flex f-jc-c f-ai-c more-btn">{{ $t('extension.showMore') }} <img class="arrow-down" v-lazy="'https://static.desty.app/desty-market/arrow-down.png?x-oss-process=style/img-webp'" alt="desty market" /></div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import Card from '@/components/Card/index.vue';
import { linkURLAddQuery } from '@/views/utils/utils';
import { pushLog } from '@/sls/pushLog';

const { push } = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();
const route = useRoute();

// 是否展示全部
const isLoadAll = computed(() => {
  const { otherQuerySliceList = [], otherQueryList = [] } = store.state;
  return otherQuerySliceList.length >= otherQueryList.length;
});

// show more
function handleMore() {
  store.commit('setOtherQuerySliceList');
}

// push detail
function handleDetail(detailUrl, appName) {
  let { pathname } = new URL(detailUrl);
  pathname = linkURLAddQuery(pathname, route)
  pathname && push(pathname);
  const { isLogin, userInfo } = store.state;
  const { userId = null, phone = null } = userInfo || {};
  proxy.$dataReport('general: clicks market tool', {
    source: document.referrer,
    tools_name: appName,
    is_logged_in: isLogin,
    user_id: userId,
    phone_number: phone,
  });
  pushLog({
    key: 'handle_extension_detail',
    token: store.state.currToken,
    userId,
    phone,
    detailUrl,
    appName,
  });
}
</script>

<style lang="less" scoped>
 .extension-tools {
    position: relative;
    font-family: 'Plus Jakarta Sans';
    // 给最外层的盒子添加伪元素，列不满则左对齐
    &-list:after {
      content: "";
      width: 413px;
    }
    .more-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 280px;
      background: linear-gradient(179.65deg, rgba(255, 255, 255, 0) 0.3%, #FFFFFF 84.91%);
      .more-btn {
        cursor: pointer;
        width: 215px;
        height: 56px;
        background-color: #0C1BB8;
        border-radius: 12px;
        font-weight: 600;
        font-size: 18px;
        color: #fff;
        margin-bottom: 40px;
        .arrow-down {
          margin-left: 16px;
        }
      }
    }
  }
</style>