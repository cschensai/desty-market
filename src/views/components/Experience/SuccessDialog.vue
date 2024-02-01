<template>
  <el-dialog
    class="success-dialog"
    align-center
    v-model="props.visible"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div class="flex f-fd-c f-ai-c">
      <h1 class="title">{{ $t('successDialog.title') }}</h1>
      <div class="desc">
        {{ $t('successDialog.descPrev') }}<br />
        {{ $t('successDialog.descNext') }}
      </div>
      <el-button type="primary" @click="handleClose">{{ $t('successDialog.btn') }}</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ElDialog, ElButton } from 'element-plus';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['handleClose']);

function handleClose() {
  emit('handleClose');
}


</script>

<style lang="less">
.el-dialog.success-dialog {
  font-family: 'Plus Jakarta Sans';
  width: 472px;
  height: max-content;
  border-radius: 12px;
  .el-dialog__body {
    padding-top: 0;
  }
  .title {
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    color: #374151;
    margin: 0 0 10px;
  }
  .desc {
    font-size: 16px;
    line-height: 20px;
    color: #6B7280;
    margin-bottom: 32px;
    text-align: center;
  }
  .el-button {
    width: 288px;
    height: 56px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    color: #fff;
  }
}
@media screen and (max-width: 768px) {
.el-dialog.success-dialog {
    width: 90%;
    .el-button {
      width: 100%;
    }
  }
}
</style>