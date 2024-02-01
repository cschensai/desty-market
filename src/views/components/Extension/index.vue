<template>
<div class="extension-outer" v-loading="$store.state.queryOtherLoading">
  <div class="extension">
    <div class="extension-title">{{ $t('extension.mainTitle') }}</div>
    <div class="extension-table-out">
      <div class="extension-table">
        <div
          :class="[
            'extension-table-item',
            { 'extension-table-active': item.code == activeNavKeyRef },
          ]"
          v-for="item in $store.state.categoryList"
          :key="item.code"
          @click="handleNavKey(item.code)"
        >
          <svg-icon v-show="!item.code" iconName="homeIcon" class="home-icon"></svg-icon>
          <p>{{ !item.code ? $t(item.name) : item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 下面的列表 -->
    <ToolsMobile v-if="$store.state.isMobile" />
    <ToolsPC v-else />
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import SvgIcon from '@/components/SvgIcon/index.vue';
import ToolsPC from './components/ToolsPC.vue';
import ToolsMobile from './components/ToolsMobile.vue';

const store = useStore();
const activeNavKeyRef = ref("");
// set nav key
function handleNavKey(key) {
  activeNavKeyRef.value = key;
  console.log('key',key)
  store.dispatch('getOtherAppQueryListAction', { categoryId: key });
}
</script>

<style lang="less" scoped>
.extension-outer {
  width: 100%;
  background: linear-gradient(179.65deg, #F9FAFB 0.3%, #FFFFFF 84.91%);
  padding-top: 105px;
  .extension {
    font-family: "Plus Jakarta Sans";
    font-style: normal;
    color: #000;
    width: 1210px;
    margin: 0 auto;
    &-title {
      font-weight: 600;
      font-size: 36px;
      line-height: 45px;
    }
    &-table {
      margin-top: 36px;
      margin-bottom: 40px;
      display: flex;
      padding: 0px;
      gap: 32px;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      &-item {
        flex-shrink: 0;
        cursor: pointer;
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        color: #9ca3af;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 7px 8px;
        // gap: 8px;
        .home-icon {
          margin-right: 6px;
          width: 24px;
          height: 24px;
        }
      }
      &-active {
        background-color: #0011bb;
        border-radius: 8px;
        font-size: 18px;
        line-height: 18px;
        color: #fff;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .extension-outer {
    padding-top: 72px;
    .extension {
      width: calc(100% - 16px);
      padding: 0 16px;
      // margin-top: 40px;
      &-title {
        font-weight: 700;
        font-size: 30px;
        line-height: 38px;
      }
      .extension-table-out {
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      &-table {
        gap: 0;
        overflow-x: auto;
        width: max-content;
        margin: 24px 0 20px;
        &-item {
          margin-right: 20px;
          white-space: nowrap;
          padding: 5px 8px;
          font-size: 16px;
          line-height: 18px;
        }
      }
    }
  }
  }
</style>
