<template>
  <aside class="p-cart__summary">
    <h2 class="p-cart__summary-title">訂單摘要</h2>

    <dl class="p-cart__summary-list">
      <div class="p-cart__summary-row">
        <dt>商品小計</dt>
        <dd>{{ formatPrice(cart.subtotal) }}</dd>
      </div>
      <div class="p-cart__summary-row">
        <dt>運費</dt>
        <dd>{{ shipping ? formatPrice(shipping) : "免運" }}</dd>
      </div>
    </dl>

    <div class="p-cart__total">
      <span>合計</span>
      <strong>{{ formatPrice(cart.subtotal + shipping) }}</strong>
    </div>

    <!-- 免運進度 -->
    <div class="p-cart__progress">
      <p class="p-cart__hint" v-if="shipping">
        再消費 <strong>{{ formatPrice(FREE_SHIPPING_THRESHOLD - cart.subtotal) }}</strong>
        即可享免運
      </p>
      <p class="p-cart__hint p-cart__hint--done" v-else>已達免運門檻 🎉</p>
      <div class="p-cart__bar">
        <span class="p-cart__bar-fill" :style="{ width: `${shippingProgress}%` }" />
      </div>
    </div>

    <NuxtLink class="c-btn p-cart__checkout" to="/checkout">前往結帳</NuxtLink>

    <button type="button" class="p-cart__clear" @click="onClear">
      清空購物車
    </button>
  </aside>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";

/** 購物車頁右側：小計、運費、免運進度與結帳按鈕 */
const cart = useCartStore();

const shipping = computed(() =>
  calcShipping({ subtotal: cart.subtotal, isEmpty: cart.isEmpty, delivery: "home" })
);
const shippingProgress = computed(() =>
  Math.min(Math.round((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100), 100)
);

const onClear = async () => {
  try {
    await ElMessageBox.confirm("確定要清空購物車嗎？", "清空購物車", {
      confirmButtonText: "確定清空",
      cancelButtonText: "取消",
      type: "warning",
    });
  } catch {
    return; // 使用者取消
  }
  cart.clear();
  ElMessage.success("購物車已清空");
};
</script>

<style lang="scss" scoped>
.p-cart {
  // ------------------------------------------------------------ 摘要
  &__summary {
    position: sticky;
    top: 120px;
    padding: $space-6;
    border: 1px solid $primary-100;
    border-radius: $radius-lg;
    background-color: $primary-50;

    @include lm() {
      position: static;
    }
  }

  &__summary-title {
    color: $ink;
    font-size: $fz-h4;
    font-weight: 600;
    letter-spacing: $ls-heading;
  }

  &__summary-list {
    margin-top: $space-5;
  }

  &__summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-3 0;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
  }

  &__total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: $space-4;
    padding-top: $space-4;
    border-top: 1px solid $primary-100;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;

    strong {
      color: $primary-dark;
      font-size: $fz-h3;
      font-weight: 600;
    }
  }

  &__progress {
    margin-top: $space-4;
  }

  &__hint {
    margin-bottom: $space-2;
    color: $content;
    font-size: $fz-xs;
    letter-spacing: $ls-body;

    strong {
      color: $primary-dark;
      font-weight: 600;
    }

    &--done {
      color: $primary;
    }
  }

  &__bar {
    height: 4px;
    border-radius: $radius-pill;
    background-color: $primary-100;
    overflow: hidden;
  }

  &__bar-fill {
    display: block;
    height: 100%;
    border-radius: $radius-pill;
    background-color: $primary;
    transition: width $duration $ease;
  }

  &__checkout {
    width: 100%;
    margin-top: $space-5;
  }

  &__clear {
    display: block;
    width: 100%;
    margin-top: $space-4;
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    cursor: pointer;
    transition: color $duration $ease;

    &:hover {
      color: $primary;
    }
  }
}
</style>
