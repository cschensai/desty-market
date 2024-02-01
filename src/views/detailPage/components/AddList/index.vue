<template>
  <div class="add-list">
    <h1 class="title">{{ $t('detailPage.addTitle') }}</h1>
    <div class="list">
      <div class="flex list-inner">
        <Card @click.native="handleDetail(item.detailUrl, item.appName)" v-for="(item, index) in list" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import Card from '@/components/Card/index.vue';
import { useRoute } from 'vue-router';
import { linkURLAddQuery } from "@/views/utils/utils";
import { pushLog } from '@/sls/pushLog';


const store = useStore();
const { proxy } = getCurrentInstance();
const route = useRoute();

const list = computed(() => {
  return store.state.detailQueryList || [];
});

// push detail
function handleDetail(detailUrl, appName) {
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
    key: 'handle_addList_detail',
    token: store.state.currToken,
    userId,
    phone,
    detailUrl,
    appName,
  });
  let { pathname } = new URL(detailUrl);
  pathname = linkURLAddQuery(pathname, route)
  // location.href = `${import.meta.env.VITE_API_URL}${pathname}`;
  window.open(`${import.meta.env.VITE_API_URL}${pathname}`);
}
</script>

<style lang="less" scoped>
.add-list {
  font-family: 'Plus Jakarta Sans';
  width: 1210px;
  margin: 60px auto 40px;
  .title {
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 20px;
    color: #000;
  }
  .list-inner {
    gap: 22px;
  }
}
@media screen and (max-width: 768px) {
  .add-list {
    margin: 80px 18px 60px;
    width: calc(100% - 18px);
    .list {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .list-inner {
        width: max-content;
        gap: 0;
      }
    }
  }
}
</style>