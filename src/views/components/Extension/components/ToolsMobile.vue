<template>
  <div class="extension-tools-mobile">
    <div class="list-out" v-for="(cards, index) in chunksList" :key="index">
      <div class="flex list">
        <Card @click.native="handleDetail(item.detailUrl, item.appName)" v-for="item in cards" :key="item.appId" :item="item" />
      </div>
    </div>
    <div class="flex f-jc-c f-ai-c more-box" v-if="!isLoadAll">
    <div @click="handleMore" class="flex f-jc-c f-ai-c more-btn">{{ $t('extension.showMore') }} <img class="arrow-down" v-lazy="'https://static.desty.app/desty-market/arrow-down.png?x-oss-process=style/img-webp'" alt="desty market" /></div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import chunk from 'lodash.chunk';
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

const chunksList = computed(() => {
  return chunk(store.state.otherQuerySliceList, 3);
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
.extension-tools-mobile {
  width: calc(100vw - 16px);
  font-family: 'Plus Jakarta Sans';
  position: relative;
  overflow: hidden;
  .list-out {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .list {
      margin-bottom: 20px;
      width: max-content;
    }
    &:last-of-type {
      .list {
        margin-bottom: 0;
      }
    }
  }
  .more-box {
    position: absolute;
    bottom: 0;
    width: 100vw;
    left: -16px;
    height: 140px;
    background: linear-gradient(179.65deg, rgba(255, 255, 255, 0) 0.3%, #FFFFFF 84.91%);
    color: #fff;
    .more-btn {
      cursor: pointer;
      width: 153px;
      height: 52px;
      background-color: #0C1BB8;
      border-radius: 12px;
      .arrow-down {
        margin-left: 16px;
      }
    }
  }
}
</style>