<template>
  <div class="p-checkout__coupon">
    <div v-if="!coupon" class="p-checkout__coupon-row">
      <input
        v-model="couponCode"
        class="p-checkout__coupon-input"
        type="text"
        placeholder="輸入優惠碼"
        :disabled="couponLoading"
        @keyup.enter="onApplyCoupon"
      >
      <button
        type="button"
        class="p-checkout__coupon-btn"
        :disabled="couponLoading"
        @click="onApplyCoupon"
      >
        套用
      </button>
    </div>
    <div v-else class="p-checkout__coupon-applied">
      <span>
        <strong>{{ coupon.code }}</strong>
        {{ coupon.label }}
      </span>
      <button type="button" @click="onRemoveCoupon">移除</button>
    </div>
    <p class="p-checkout__coupon-hint">可用：HEALTH100、VIP10、FREESHIP</p>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

/** 優惠碼：v-model 為目前套用的優惠（沒有則為 null） */
const coupon = defineModel({ type: Object, default: null });
const props = defineProps({
  subtotal: { type: Number, required: true },
});

const couponCode = ref("");
const couponLoading = ref(false);

const onApplyCoupon = async () => {
  const code = couponCode.value.trim();
  if (!code) return;

  couponLoading.value = true;
  try {
    const res = await $fetch("/api/orders/coupon", { query: { code, subtotal: props.subtotal } });
    if (!res.success) {
      ElMessage.warning(res.message);
      return;
    }
    coupon.value = res.result;
    ElMessage.success(`已套用優惠碼：${res.result.label}`);
  } finally {
    couponLoading.value = false;
  }
};

const onRemoveCoupon = () => {
  coupon.value = null;
  couponCode.value = "";
};
</script>

<style lang="scss" scoped>
.p-checkout {
  // ------------------------------------------------------------ 優惠碼
  &__coupon {
    margin-top: $space-5;
    padding-top: $space-4;
    border-top: 1px solid $primary-100;
  }

  &__coupon-row {
    display: flex;
    gap: $space-2;
  }

  &__coupon-input {
    flex: 1;
    min-width: 0;
    min-height: 40px;
    padding: 0 $space-3;
    border: 1px solid $gray-200;
    border-radius: $radius-sm;
    background-color: $white;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    outline: none;

    &:focus {
      border-color: $primary;
    }
  }

  &__coupon-btn {
    padding: 0 $space-4;
    border: 1px solid $primary;
    border-radius: $radius-sm;
    background: none;
    color: $primary;
    font-size: $fz-sm;
    cursor: pointer;
    transition: background-color $duration $ease, color $duration $ease;

    &:hover:not(:disabled) {
      background-color: $primary;
      color: $on-primary;
    }
  }

  &__coupon-applied {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
    padding: $space-3;
    border: 1px dashed $primary;
    border-radius: $radius-sm;
    background-color: $white;
    color: $text;
    font-size: $fz-sm;

    strong {
      margin-right: $space-2;
      color: $primary-dark;
    }

    button {
      padding: 0;
      background: none;
      color: $muted;
      font-size: $fz-xs;
      cursor: pointer;

      &:hover {
        color: $primary;
      }
    }
  }

  &__coupon-hint {
    margin-top: $space-2;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }
}
</style>
