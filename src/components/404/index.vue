<template>
  <div class="container">
    <svg-icon iconName="404Banner" className="picture"></svg-icon>
    <p class="msg">
      {{ $t("uedSetting.404.title") }}
      <b>{{ $t("uedSetting.404.desty") }}</b>
      {{ $t("uedSetting.404.kamu") }}
    </p>
    <div class="button" @click="goBack">
      <span class="button-text">{{ $t("uedSetting.404.btnText") }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import SvgIcon from '@/components/SvgIcon/index.vue';

const router = useRouter();

function goBack() {
  router.go(-1);
}
</script>

<style lang="less" scoped>
.container {
  font-family: 'Plus Jakarta Sans';
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .picture {
    width: 454px;
    height: 202px;
  }
  .overall-logo {
    width: 80px;
    height: 33px;
  }
  .msg {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: #4a71d3;
    width: 435px;
  }
  .button {
    width: 289px;
    height: 48px;
    background-color: #4a71d3;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &-text {
      font-style: normal;
      font-weight: 800;
      font-size: 14px;
      line-height: 18px;
      color: #ffffff;
    }
  }
}

@media screen and (max-width: 768px) {
  .container {
    margin: auto 24px;
    .msg {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      width: 100%;
    }
    .picture {
      width: 290px;
    }
    .button {
      width: 234px;
    }
  }
}
</style>
