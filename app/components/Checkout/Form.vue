<template>
  <div class="p-checkout__form">
    <el-form ref="formRef" :model="form" label-position="top">
      <h2 class="p-checkout__group">收件資訊</h2>

      <el-form-item
        label="收件人姓名"
        prop="name"
        :rules="[{ required: true, message: '請輸入收件人姓名' }]"
      >
        <el-input v-model="form.name" placeholder="請輸入姓名" :disabled="loading" />
      </el-form-item>

      <el-form-item
        label="手機號碼"
        prop="mobile"
        :rules="[
          { required: true, message: '請輸入手機號碼' },
          { pattern: /^09\d{8}$/, message: '請輸入正確的手機號碼' },
        ]"
      >
        <el-input
          v-model="form.mobile"
          placeholder="09xxxxxxxx"
          :disabled="loading"
        />
      </el-form-item>

      <el-form-item
        label="電子信箱"
        prop="email"
        :rules="[
          { required: true, message: '請輸入電子信箱' },
          {
            validator: (rules, val) => isEmail(val),
            message: '請輸入正確的 Email',
          },
        ]"
      >
        <el-input
          v-model="form.email"
          placeholder="請輸入 Email"
          :disabled="loading"
        />
      </el-form-item>

      <h2 class="p-checkout__group">配送方式</h2>

      <el-form-item prop="delivery" :rules="[{ required: true, message: '請選擇配送方式' }]">
        <el-radio-group v-model="form.delivery" :disabled="loading">
          <el-radio value="home">宅配到府（滿 NT$ 1,000 免運）</el-radio>
          <el-radio value="store">超商取貨</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        :label="form.delivery === 'store' ? '取貨門市' : '收件地址'"
        prop="address"
        :rules="[{ required: true, message: '請填寫配送地址或門市' }]"
      >
        <el-input
          v-model="form.address"
          :placeholder="
            form.delivery === 'store'
              ? '例：7-ELEVEN 健康門市'
              : '例：台北市中正區健康路 1 號 5 樓'
          "
          :disabled="loading"
        />
      </el-form-item>

      <h2 class="p-checkout__group">付款方式</h2>

      <el-form-item prop="payment" :rules="[{ required: true, message: '請選擇付款方式' }]">
        <el-radio-group v-model="form.payment" :disabled="loading">
          <el-radio value="credit">信用卡一次付清</el-radio>
          <el-radio value="atm">ATM 轉帳</el-radio>
          <el-radio value="cod">貨到付款</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="訂單備註" prop="memo">
        <el-input
          type="textarea"
          v-model="form.memo"
          :rows="4"
          :disabled="loading"
          placeholder="有特殊需求可以在這裡告訴我們（選填）"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
/** 結帳表單：收件、配送、付款資訊 */
const form = defineModel({ type: Object, required: true });
defineProps({
  loading: { type: Boolean, default: false },
});

const formRef = ref(null);

defineExpose({
  validate: () => formRef.value.validate().catch(() => false),
});
</script>

<style lang="scss" scoped>
.p-checkout {
  // ------------------------------------------------------------ 表單
  &__group {
    margin-bottom: $space-5;
    padding-bottom: $space-3;
    border-bottom: 1px solid $gray-100;
    color: $ink;
    font-size: $fz-body-lg;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;
    text-align: left;

    &:not(:first-child) {
      margin-top: $space-7;
    }
  }

  &__form {
    :deep(.el-form-item) {
      margin-bottom: $space-5;
    }

    :deep(.el-form-item__label) {
      margin-bottom: $space-2;
      padding: 0;
      color: $text;
      font-size: $fz-sm;
      line-height: 1.6;
      letter-spacing: $ls-body;
    }

    :deep(.el-input__wrapper),
    :deep(.el-textarea__inner) {
      min-height: 52px;
      border-radius: $radius-sm;
      box-shadow: 0 0 0 1px $gray-200 inset;
    }

    :deep(.el-radio-group) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: $space-3;
      width: 100%;
    }

    :deep(.el-radio) {
      display: flex;
      align-items: center;
      height: auto;
      margin: 0;
      padding: 0;
    }

    :deep(.el-radio__label) {
      color: $text;
      font-size: $fz-body;
      letter-spacing: $ls-body;
    }
  }
}
</style>
