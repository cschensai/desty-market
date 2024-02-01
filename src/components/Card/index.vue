<template>
  <div class="flex f-fd-c f-jc-sb card">
    <div>
      <div class="flex f-jc-sb item-header">
        <div class="flex f-ai-c logo-title">
          <img
            class="logo"
            v-lazy="`${props.item.icon}?x-oss-process=style/img-webp`"
            alt="desty market"
          />
          <p class="title">{{ props.item.appName }}</p>
        </div>
        <div
          v-if="btnText"
          :class="['flex', 'f-jc-c', 'f-ai-c', 'status', { 'status-diabled': comingStatus }]"
        >
          <img v-if="addedStatus" class="check" v-lazy="'https://static.desty.app/desty-market/check.png?x-oss-process=style/img-webp'" alt="desty market" />{{ btnText }}
        </div>
      </div>
      <div class="item-des three-ellipsis" v-html="descShortText">
      </div>
    </div>
    <div class="item-tag">
      <div class="item-tag-item one-ellipsis"
           :title="tag"
           v-for="(tag, tagIndex) in tags" :key="tagIndex">{{ tag }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  }
})

const descShortText = computed(() => {
  const { language } = store.state;
  return language === 'id' ? props.item.titleIndonesia : props.item.title;
});

const tags = computed(() => {
  return [props.item.categoryL1Name, props.item.categoryL2Name].filter(i => i);
});

// added
const addedStatus = computed(() => {
  return props.item.actionType === '99';
});

// coming soon
const comingStatus = computed(() => {
  return props.item.actionType === '3';
})

const btnText = computed(() => {
  if (addedStatus.value) {
    return 'Added';
  } else if (comingStatus.value) {
    return 'Coming soon';
  }
  return '';
})

</script>

<style lang="less" scoped>
  .card {
    margin-bottom: 24px;
    cursor: pointer;
    box-sizing: border-box;
    width: 32%;
    height: 240px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px 24px;
    .item-header {
      display: flex;
      align-items: center;
      padding: 0;
      .logo-title {
        flex: 1;
      }
      .logo {
        width: 56px;
        height: 56px;
        border-radius: 100%;
      }
      .title {
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #000;
        margin-left: 16px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .status {
        padding: 8px;
        background-color: #5D6DEA;
        border-radius: 4px;
        font-weight: 800;
        font-size: 14px;
        color: #fff;
        margin-left: 4px;
        .check {
          width: 14px;
          margin-right: 6px;
        }
      }
      .status-diabled {
        width: 105px;
        background-color: #D9D9D9;
      }
    }
    .item-des {
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #333;
      margin-top: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .item-tag {
      padding: 0px;
      &-item {
        display: inline-block;
        padding: 8px 16px;
        background-color: rgba(0, 0, 0, 0.04);
        border-radius: 49px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.56);
        max-width: 156px;
        box-sizing: border-box;
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .card {
      width: 280px;
      height: 234px;
      padding: 16px;
      margin: 0 20px 0 0;
      .item-header {
        .logo {
          width: 40px;
          height: 40px;
        }
        .title {
          font-size: 14px;
          line-height: 20px;
        }
        .status {
          width: 70px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 12px;
          padding: 6px 0;
          .check {
            width: 13px;
            margin-right: 4px;
          }
        }
        .status-diabled {
          width: 90px;
        }
      }
      .item-des {
       margin-top: 24px;
        font-size: 16px;
        line-height: 26px;
        color: #333;
    }
    .item-tag {
      .item-tag-item {
        background-color: rgba(0, 0, 0, 0.04);
        border-radius: 49px;
        padding: 5px 10px;
        font-weight: 500;
        max-width: 112px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.56);
      }
    }
  }
}
</style>