<template>
  <div class="l-page p-cart">
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Cart</span>
      <h1 class="c-page-head__title">購物車</h1>
      <ClientOnly>
        <p class="c-page-head__lead" v-if="!cart.isEmpty">
          共 {{ cart.count }} 件商品
        </p>
      </ClientOnly>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <ClientOnly>
          <div class="p-cart__layout" v-if="!cart.isEmpty">
            <!-- 品項 .......................................................... -->
            <div class="p-cart__main">
            <ul class="p-cart__list">
              <li class="p-cart__item" v-for="item in cart.items" :key="item.key">
                <NuxtLink
                  class="p-cart__media"
                  :to="`/products/${item.brand_id}/product/${item.id}`"
                >
                  <img :src="item.image" :alt="item.name" :title="item.name" />
                </NuxtLink>

                <div class="p-cart__body">
                  <NuxtLink
                    class="p-cart__name"
                    :to="`/products/${item.brand_id}/product/${item.id}`"
                  >
                    {{ item.name }}
                  </NuxtLink>
                  <p class="p-cart__brand">{{ item.brand }}</p>
                  <p class="p-cart__spec" v-if="item.spec_label">{{ item.spec_label }}</p>
                  <Price class="p-cart__unit" :value="item.price" size="sm" />
                </div>

                <div class="p-cart__control">
                  <CartStepper
                    :modelValue="item.qty"
                    :max="item.stock ?? 99"
                    size="sm"
                    @update:modelValue="(val) => cart.setQty(item.key, val)"
                  />
                  <p class="p-cart__amount">{{ formatPrice(item.price * item.qty) }}</p>
                  <button
                    type="button"
                    class="p-cart__remove"
                    @click="onRemove(item)"
                  >
                    移除
                  </button>
                </div>
              </li>
            </ul>

              <CartAddon class="p-cart__addon" />
            </div>

            <!-- 結帳資訊 ...................................................... -->
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
                  再消費 <strong>{{ formatPrice(FREE_SHIPPING - cart.subtotal) }}</strong>
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
          </div>

          <!-- 空購物車 ........................................................ -->
          <div class="p-cart__empty" v-else>
            <p class="c-empty">購物車還沒有商品</p>
            <NuxtLink class="c-btn c-btn--ghost" to="/products/1/detail">
              去逛逛商品
            </NuxtLink>
          </div>

          <template #fallback>
            <p class="c-empty">購物車讀取中…</p>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";

const FREE_SHIPPING = 1000;
const SHIPPING_FEE = 80;

const cart = useCartStore();

useSeo("page-index", {
  title: "購物車",
  description: "確認購物車內的商品與數量。",
});

const shipping = computed(() =>
  cart.isEmpty || cart.subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE
);
const shippingProgress = computed(() =>
  Math.min(Math.round((cart.subtotal / FREE_SHIPPING) * 100), 100)
);

const onRemove = (item) => {
  cart.remove(item.key);
  ElMessage.success(`已移除：${item.name}`);
};

const onClear = () => {
  ElMessageBox.confirm("確定要清空購物車嗎？", "清空購物車", {
    confirmButtonText: "確定清空",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      cart.clear();
      ElMessage.success("購物車已清空");
    })
    .catch(() => {});
};

</script>

<style lang="scss" scoped>
.p-cart {
  background-color: $white;

  &__layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 360px);
    gap: $space-9;
    align-items: start;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-7;
    }
  }

  // ------------------------------------------------------------ 品項
  &__main {
    min-width: 0;
  }

  &__list {
    border-top: 1px solid $gray-100;
  }

  &__item {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr) auto;
    gap: $space-5;
    align-items: center;
    padding: $space-5 0;
    border-bottom: 1px solid $gray-100;

    @include md() {
      grid-template-columns: 88px minmax(0, 1fr);
      gap: $space-4;
    }
  }

  &__media {
    display: block;
    @include ratio(1, 1);
    border-radius: $radius-md;
    background-color: $primary-50;

    img {
      object-fit: contain;
      padding: $space-3;
      box-sizing: border-box;
    }
  }

  &__name {
    color: $ink;
    font-size: $fz-body;
    font-weight: 500;
    line-height: $lh-heading;
    letter-spacing: $ls-body;
    transition: color $duration $ease;

    &:hover {
      color: $primary;
    }
  }

  &__brand {
    margin-top: $space-2;
    color: $primary-400;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__spec {
    margin-top: $space-1;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__unit {
    margin-top: $space-2;
  }

  &__control {
    display: flex;
    align-items: center;
    gap: $space-5;

    @include md() {
      grid-column: 1 / -1;
      justify-content: space-between;
      gap: $space-3;
    }
  }

  &__amount {
    min-width: 110px;
    color: $ink;
    font-size: $fz-body;
    font-weight: 600;
    letter-spacing: $ls-body;
    text-align: right;

    @include md() {
      min-width: 0;
    }
  }

  &__remove {
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

  // ------------------------------------------------------------ 空狀態
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-5;
    padding-bottom: $space-9;
  }
}
</style>
