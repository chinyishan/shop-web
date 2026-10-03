<template>
  <article v-if="order" class="c-order">
    <header class="c-order__head">
      <div>
        <p class="c-order__no">{{ order.order_no }}</p>
        <p class="c-order__date">{{ formatDate(order.created_at) }}</p>
      </div>
      <span class="c-tag c-tag--solid">{{ statusLabel }}</span>
    </header>

    <ul class="c-order__items">
      <li v-for="item in order.items" :key="item.key ?? item.id" class="c-order__item">
        <span class="c-order__media">
          <img :src="item.image" :alt="item.name" :title="item.name" >
        </span>
        <span class="c-order__body">
          <span class="c-order__name">{{ item.name }}</span>
          <span v-if="item.spec_label" class="c-order__spec">{{ item.spec_label }}</span>
          <span class="c-order__qty">× {{ item.qty }}</span>
        </span>
        <span class="c-order__amount">{{ formatPrice(item.price * item.qty) }}</span>
      </li>
    </ul>

    <dl class="c-order__summary">
      <div class="c-order__row">
        <dt>商品小計</dt>
        <dd>{{ formatPrice(order.subtotal) }}</dd>
      </div>
      <div v-if="order.discount" class="c-order__row">
        <dt>折扣（{{ order.coupon }}）</dt>
        <dd>-{{ formatPrice(order.discount) }}</dd>
      </div>
      <div class="c-order__row">
        <dt>運費</dt>
        <dd>{{ order.shipping_fee ? formatPrice(order.shipping_fee) : "免運" }}</dd>
      </div>
      <div class="c-order__row c-order__row--total">
        <dt>實付金額</dt>
        <dd>{{ formatPrice(order.total) }}</dd>
      </div>
    </dl>

    <footer v-if="order.delivery" class="c-order__foot">
      <p>{{ deliveryLabel }}｜{{ order.delivery.address }}</p>
      <p>{{ paymentLabel }}</p>
    </footer>
  </article>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    default: null,
  },
});

const STATUS = {
  pending: "處理中",
  shipped: "已出貨",
  done: "已完成",
};
const DELIVERY = { home: "宅配到府", store: "超商取貨" };
const PAYMENT = { credit: "信用卡", atm: "ATM 轉帳", cod: "貨到付款" };

const statusLabel = computed(() => STATUS[props.order?.status] ?? "處理中");
const deliveryLabel = computed(
  () => DELIVERY[props.order?.delivery?.method] ?? "宅配到府"
);
const paymentLabel = computed(() => PAYMENT[props.order?.payment] ?? "信用卡");

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};
</script>

<style lang="scss" scoped>
.c-order {
  padding: $space-6;
  border: 1px solid $primary-100;
  border-radius: $radius-lg;
  background-color: $white;

  @include md() {
    padding: $space-5;
  }

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-4;
    padding-bottom: $space-4;
    border-bottom: 1px solid $gray-100;
  }

  &__no {
    color: $ink;
    font-size: $fz-body;
    font-weight: 600;
    letter-spacing: $ls-heading;
  }

  &__date {
    margin-top: $space-1;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__items {
    padding: $space-3 0;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3 0;
  }

  &__media {
    flex-shrink: 0;
    @include size(48px);
    border-radius: $radius-sm;
    background-color: $primary-50;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 4px;
      box-sizing: border-box;
    }
  }

  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__name {
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    @include line-clamp(1);
  }

  &__spec,
  &__qty {
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__amount {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 600;
    white-space: nowrap;
  }

  &__summary {
    padding-top: $space-3;
    border-top: 1px solid $gray-100;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-2 0;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;

    &--total {
      margin-top: $space-2;
      padding-top: $space-3;
      border-top: 1px solid $gray-100;
      color: $text;

      dd {
        color: $primary-dark;
        font-size: $fz-h4;
        font-weight: 600;
      }
    }
  }

  &__foot {
    margin-top: $space-4;
    padding-top: $space-4;
    border-top: 1px solid $gray-100;
    color: $muted;
    font-size: $fz-xs;
    line-height: 1.8;
    letter-spacing: $ls-body;
  }
}
</style>
