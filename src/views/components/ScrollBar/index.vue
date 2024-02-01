<template>
  <div class="scroll-bar">
    <div class="scroll-bar-outer">
      <div class="inner"></div>
    </div>
    {{ $t('notLogin.scrollDown') }}
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
@keyframes anime {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(236px);
  }
}
.scroll-bar {
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  line-height: 28px;
  color: #000;
  .scroll-bar-outer {
    position: relative;
    width: 2px;
    height: 180px;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-right: 20px;
    .inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 56px;
      transform: translateY(0);
      transform-origin: top;
      background-color: #000;
      animation: anime infinite 1.5s;
    }
  }
}
</style>
