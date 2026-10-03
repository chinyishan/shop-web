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

            <CartSummary />
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
import { ElMessage } from "element-plus";

const cart = useCartStore();

useSeo("page-index", {
  title: "購物車",
  description: "確認購物車內的商品與數量。",
});

const onRemove = (item) => {
  cart.remove(item.key);
  ElMessage.success(`已移除：${item.name}`);
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
