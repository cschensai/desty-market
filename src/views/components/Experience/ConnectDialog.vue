<template>
  <el-dialog
    class="connect-dialog"
    v-model="props.visible"
    :before-close="handleClose"
    destroy-on-close
    :title="$t('reachUs.title')"
    :close-on-click-modal="false"
  >
    <div class="desc">{{ $t('reachUs.desc') }}</div>
    <el-form
      ref="formRef"
      :model="addAppData"
      label-position="top"
      size="large"
      hide-required-asterisk
      :rules="rules"
    >
      <el-form-item
        prop="companyName"
        :label="$t('reachUs.companyName')"
      >
        <el-input v-model="addAppData.companyName" :placeholder="$t('reachUs.companyNamePlaceholder')" />
      </el-form-item>
      <el-form-item
        prop="contactNumber"
        :label="$t('reachUs.contactNumber')"
      >
        <el-input v-model="addAppData.contactNumber" :placeholder="$t('reachUs.contactNumberPlaceholder')" />
      </el-form-item>
      <el-form-item
        prop="contactEmail"
        :label="$t('reachUs.contactEmail')"
      >
        <el-input v-model="addAppData.contactEmail" :placeholder="$t('reachUs.contactEmailPlaceholder')" />
      </el-form-item>
      <div class="flex f-jc-c">
        <el-button :loading="loading" color="#3445D0" @click="handleSubmit">{{ $t('reachUs.submitBtn') }}</el-button>
      </div>
    </el-form>
  </el-dialog>
  <SuccessDialog :visible="successDialogVisible" @handleClose="handleSuccessClose" />
</template>

<script setup>
import { ref, reactive, computed, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import SuccessDialog from './SuccessDialog.vue';

const formRef = ref(null);
const loading = ref(false);
const successDialogVisible = ref(false);
const { t } = useI18n();
const store =  useStore();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  }
});
const SPECIAL_EXP = /[(\~)(\~)(\!)(\！)(\@)(\#)(\$)(\￥)(\%)(\^)(\……)(\&)(\*)(\()(\（)(\))(\）)(\-)(\_))(\——)(\+)(\=)(\[)(\【)(\])(\】)(\{)(\})(\|))(\、))(\)(\\)(\;)(\；)(\:)(\：)(\')(\‘)(\’)(\")(\“)(\”)(\,)(\，)(\.)(\。)(\/)(\《)(\<)(\>)(\》)(\?)(\？)(\)]+/;
const { proxy } = getCurrentInstance();

const emit = defineEmits(['handleClose']);
const addAppData = reactive({
  companyName: '',
  contactNumber: '',
  contactEmail: '',
});

const rules = computed(() => {
  return {
      companyName: [{
        required: true,
        message: t('reachUs.companyNameError'),
      }, {
        validator: validateCompanyName,
        trigger: 'change',
      }],
      contactNumber: [{
        required: true,
        message: t('reachUs.contactNumberError'),
        trigger: 'change',
      }, {
        validator: validatePhone,
        trigger: 'change',
      }],
      contactEmail: [{
        required: true,
        message: t('reachUs.contactEmailError'),
        trigger: 'change',
      }, {
        type: 'email',
        message: t('reachUs.contactEmailError'),
        trigger: 'change',
      }, {
        validator: validateEmail,
        trigger: 'change',
      }],
  }
})

async function handleClose() {
  addAppData.companyName = '';
  addAppData.contactNumber = '';
  addAppData.contactEmail = '';
  if (!formRef.value) return;
  formRef.value.clearValidate();
  emit('handleClose');
}

// 验证
function handleSubmit() {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        const companyNameVal = addAppData.companyName?.trim?.();
        const success = await store.dispatch('reachUsAction', {
          name: companyNameVal,
          phone: addAppData.contactNumber,
          email: addAppData.contactEmail,
        });
        if (success) {
          handleClose();
          successDialogVisible.value = true;
        }
        const { isLogin, userInfo } = store.state;
        const { userId = null, phone = null } = userInfo || {};
        proxy.$dataReport('general: clicks market tool', {
          company_name: companyNameVal,
          contact_number: addAppData.contactNumber,
          contact_email: addAppData.contactEmail,
          is_logged_in: isLogin,
          user_id: userId,
          phone_number: phone,
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        loading.value = false;
      }
    }
  });
}

function validateCompanyName(rule, value, callback) {
  if (!value.trim()) {
    callback(new Error(t('reachUs.companyNameError')));
  } else if (SPECIAL_EXP.test(value)) {
    callback(new Error(t('reachUs.containSpecialError')));
  } else if (value?.length > 100) {
    callback(new Error(t('reachUs.nameMore100')));
    } else if(value?.length < 3) {
    callback(new Error(t('reachUs.nameLess3')));
  } else {
    callback();
  }
  
}

function validatePhone(rule, value, callback) {
  const regExp = /^\+?\d*$/ig;
  if (!regExp.test(value)) {
    callback(new Error(t('reachUs.contactNumberError')));
  } else if (value?.length > 15) {
    callback(new Error(t('reachUs.digitsmore15')));
  } else if (value?.length < 8) {
    callback(new Error(t('reachUs.digitsless8')));
  } else {
    callback();
  }
}

function validateEmail(rule, value, callback) {
 if (value?.length > 50) {
    callback(new Error(t('reachUs.emailmore50')));
  } else {
    callback();
  }
}

function handleSuccessClose() {
  successDialogVisible.value = false;
}

</script>

<style lang="less">
.el-dialog.connect-dialog {
  width: 472px;
  font-family: 'Plus Jakarta Sans';
  border-radius: 12px;
  .el-dialog__title {
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    color: #374151;
  }
  .desc {
    font-size: 16px;
    line-height: 20px;
    color: #6B7280;
    margin: 10px 0 24px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 24px !important;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-form {
    &.el-form--label-top .el-form-item .el-form-item__label {
      font-weight: 800;
      font-size: 16px;
      line-height: 20px;
      color: #374151;
      margin-bottom: 8px;
    }
    .el-input__wrapper {
      border-radius: 8px;
    }
    .el-button {
      margin-top: 40px;
      width: 288px;
      height: 55px;
      border-radius: 12px;
    }
  }
}
@media screen and (max-width: 768px) {
  .el-dialog.connect-dialog {
    width: 90%;
    .el-dialog__title {
      font-size: 18px;
      line-height: 24px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>