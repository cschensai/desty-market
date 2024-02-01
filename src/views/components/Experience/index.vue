<template>
  <section :class="['experience', { 'experience-login': isLogin }]">
    <div class="experience-content">
      <h2 class="experience-title">{{ $t('experience.title') }}</h2>
      <div class="experience-btn" @click="goExperience">
        <span>{{ $t('experience.btn') }}</span>
        <img
          class="right-arrow"
          v-lazy="'https://static.desty.app/desty-homepage/v2/right_arrow.svg'"
          alt="desty market"
        />
      </div>
      <img
        class="white-supers"
        v-lazy="'https://static.desty.app/desty-homepage/v2/white-supers.png?x-oss-process=style/img-webp'"
        alt="desty market"
      />
      <img
        class="yellow-supers"
        v-lazy="'https://static.desty.app/desty-homepage/v2/yellow-supers.png?x-oss-process=style/img-webp'"
        alt="desty market"
      />
    </div>
  </section>
  <ConnectDialog :visible="connectDialogVisible" @handleClose="handleClose" />
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import ConnectDialog from "./ConnectDialog.vue";

const connectDialogVisible = ref(false);
const store = useStore();

function goExperience () {
  connectDialogVisible.value = true;
};

function handleClose() {
  connectDialogVisible.value = false;
}

const isLogin = computed(() => {
  return store.state.isLogin;
});

</script>
<style lang="less" scoped>
.experience {
  width: 100%;
  height: 541px;
  background-color: #fff;
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  position: relative;
  transform: translateY(25px);
  &-login {
    transform: translateY(-20px);
  }
  &-content {
    width: 100%;
    height: 100%;
    background-color: #eff2ff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-title {
    font-weight: 700;
    font-size: 56px;
    line-height: 71px;
    text-align: center;
    color: #000000;
    z-index: 1;
    margin: 164px 0 40px 0;
  }
  &-btn {
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;
    gap: 12px;
    min-width: 165px;
    height: 55px;
    background-color: #0c1bb8;
    border-radius: 12px;
    margin: 0;
    cursor: pointer;
    span {
      font-family: "Plus Jakarta Sans";
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      letter-spacing: -0.01em;
      color: #ffffff;
    }
    .right-arrow {
      margin-left: 10px;
    }
  }
  .white-supers {
    position: absolute;
    left: -38px;
    top: 0px;
  }
  .yellow-supers {
    position: absolute;
    right: 0;
    top: 214px;
  }
}
@media screen and (max-width: 768px) {
  .experience {
    width: 100%;
    height: 324px;
    transform: translateY(20px);
    overflow: hidden;
    &-login {
      transform: translateY(-20px);
    }
    &-title {
      width: 299px;
      height: 84px;
      font-weight: 700;
      font-size: 30px;
      line-height: 42px;
      margin: 40px 0;
    }
    &-btn {
      min-width: 154px;
      height: 52px;
      z-index: 1;
      padding: 16px 11px;
      span {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
      }
    }
    .white-supers {
      left: -160px;
      top: -100px;
    }
    .yellow-supers {
      right: -123px;
      top: 152px;
      width: 309.77px;
      height: 204.73px;
    }
  }
}
.test {
  :deep(.magnetic-button) {
    width: 200px;
  }
}
</style>
