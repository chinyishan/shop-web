<template>
  <aside class="p-checkout__summary">
    <h2 class="p-checkout__summary-title">訂單明細</h2>

    <ul class="p-checkout__items">
      <li v-for="item in cart.items" :key="item.key" class="p-checkout__item">
        <span class="p-checkout__item-media">
          <img :src="item.image" :alt="item.name" :title="item.name" >
        </span>
        <span class="p-checkout__item-body">
          <span class="p-checkout__item-name">{{ item.name }}</span>
          <span v-if="item.spec_label" class="p-checkout__item-spec">
            {{ item.spec_label }}
          </span>
          <span class="p-checkout__item-qty">× {{ item.qty }}</span>
        </span>
        <span class="p-checkout__item-amount">
          {{ formatPrice(item.price * item.qty) }}
        </span>
      </li>
    </ul>

    <!-- 優惠碼 -->
    <CheckoutCoupon v-model="coupon" :subtotal="cart.subtotal" />

    <dl class="p-checkout__amounts">
      <div class="p-checkout__amount-row">
        <dt>商品小計</dt>
        <dd>{{ formatPrice(cart.subtotal) }}</dd>
      </div>
      <div v-if="discount" class="p-checkout__amount-row">
        <dt>優惠折抵</dt>
        <dd class="p-checkout__amount-row--discount">
          -{{ formatPrice(discount) }}
        </dd>
      </div>
      <div class="p-checkout__amount-row">
        <dt>運費</dt>
        <dd>{{ shipping ? formatPrice(shipping) : "免運" }}</dd>
      </div>
    </dl>

    <div class="p-checkout__total">
      <span>應付金額</span>
      <strong>{{ formatPrice(total) }}</strong>
    </div>

    <button
      type="button"
      class="c-btn p-checkout__submit"
      :disabled="loading"
      @click="emit('submit')"
    >
      {{ loading ? "送出中…" : "送出訂單" }}
    </button>

    <NuxtLink class="p-checkout__back" to="/cart">返回購物車</NuxtLink>
  </aside>
</template>

<script setup>
/** 結帳頁右側：訂單明細、優惠碼、金額與送出按鈕 */
const coupon = defineModel("coupon", { type: Object, default: null });
defineProps({
  discount: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(["submit"]);

const cart = useCartStore();
</script>

<style lang="scss" scoped>
.p-checkout {
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

  &__items {
    margin-top: $space-5;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3 0;
    border-bottom: 1px solid alpha($primary-100, 0.8);
  }

  &__item-media {
    flex-shrink: 0;
    @include size(48px);
    border-radius: $radius-sm;
    background-color: $white;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 4px;
      box-sizing: border-box;
    }
  }

  &__item-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__item-name {
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    @include line-clamp(1);
  }

  &__item-spec,
  &__item-qty {
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__item-amount {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 600;
    white-space: nowrap;
  }

  &__amounts {
    margin-top: $space-4;
  }

  &__amount-row--discount {
    color: $accent-dark;
  }

  &__amount-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-2 0;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
  }

  &__total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: $space-3;
    padding-top: $space-4;
    border-top: 1px solid $primary-100;
    color: $text;
    font-size: $fz-sm;

    strong {
      color: $primary-dark;
      font-size: $fz-h3;
      font-weight: 600;
    }
  }

  &__submit {
    width: 100%;
    margin-top: $space-5;
  }

  &__back {
    display: block;
    margin-top: $space-4;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    text-align: center;

    &:hover {
      color: $primary;
    }
  }
}
</style>
