<template>
  <Transition name="c-drawer">
    <div v-if="cart.drawerOpen" class="c-drawer">
      <div class="c-drawer__overlay" @click="cart.closeDrawer()"/>

      <aside class="c-drawer__panel">
        <header class="c-drawer__head">
          <p class="c-drawer__title">
            購物車
            <span class="c-drawer__count">{{ cart.count }}</span>
          </p>
          <button type="button" class="c-drawer__close" @click="cart.closeDrawer()">
            ✕
          </button>
        </header>

        <div class="c-drawer__body">
          <ul v-if="!cart.isEmpty" class="c-drawer__list">
            <li v-for="item in cart.items" :key="item.key" class="c-drawer__item">
              <NuxtLink
                class="c-drawer__media"
                :to="`/products/${item.brand_id}/product/${item.id}`"
                @click="cart.closeDrawer()"
              >
                <img :src="item.image" :alt="item.name" :title="item.name" >
              </NuxtLink>

              <div class="c-drawer__info">
                <NuxtLink
                  class="c-drawer__name"
                  :to="`/products/${item.brand_id}/product/${item.id}`"
                  @click="cart.closeDrawer()"
                >
                  {{ item.name }}
                </NuxtLink>
                <p v-if="item.spec_label" class="c-drawer__spec">{{ item.spec_label }}</p>

                <div class="c-drawer__row">
                  <CartStepper
                    :model-value="item.qty"
                    :max="item.stock ?? 99"
                    size="sm"
                    @update:model-value="(val) => cart.setQty(item.key, val)"
                  />
                  <p class="c-drawer__amount">{{ formatPrice(item.price * item.qty) }}</p>
                </div>

                <button type="button" class="c-drawer__remove" @click="cart.remove(item.key)">
                  移除
                </button>
              </div>
            </li>
          </ul>

          <p v-else class="c-empty">購物車還沒有商品</p>
        </div>

        <footer v-if="!cart.isEmpty" class="c-drawer__foot">
          <div class="c-drawer__total">
            <span>小計</span>
            <strong>{{ formatPrice(cart.subtotal) }}</strong>
          </div>
          <NuxtLink class="c-btn c-drawer__action" to="/checkout" @click="cart.closeDrawer()">
            前往結帳
          </NuxtLink>
          <NuxtLink
            class="c-btn c-btn--ghost c-drawer__action"
            to="/cart"
            @click="cart.closeDrawer()"
          >
            查看購物車
          </NuxtLink>
        </footer>
      </aside>
    </div>
  </Transition>
</template>

<script setup>
const cart = useCartStore();
const route = useRoute();

// 換頁時自動關閉
watch(
  () => route.fullPath,
  () => cart.closeDrawer()
);
</script>

<style lang="scss" scoped>
.c-drawer {
  position: fixed;
  inset: 0;
  z-index: 80;

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba($primary-darker, 0.35);
  }

  &__panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: min(420px, 92vw);
    background-color: $white;
    box-shadow: $shadow-lg;
  }

  // ------------------------------------------------------------ 頁首
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-5 $space-6;
    border-bottom: 1px solid $gray-100;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: $space-3;
    color: $ink;
    font-size: $fz-body-lg;
    font-weight: 600;
    letter-spacing: $ls-heading;
  }

  &__count {
    min-width: 22px;
    height: 22px;
    padding: 0 $space-2;
    border-radius: $radius-pill;
    background-color: $primary;
    color: $white;
    font-size: $fz-xs;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
  }

  &__close {
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-body;
    cursor: pointer;
    transition: color $duration $ease;

    &:hover {
      color: $primary;
    }
  }

  // ------------------------------------------------------------ 內容
  &__body {
    flex: 1;
    padding: 0 $space-6;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    gap: $space-4;
    padding: $space-5 0;
    border-bottom: 1px solid $gray-100;
  }

  &__media {
    flex-shrink: 0;
    @include size(72px);
    border-radius: $radius-md;
    background-color: $primary-50;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: $space-2;
      box-sizing: border-box;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__name {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 500;
    line-height: $lh-heading;
    letter-spacing: $ls-body;
    @include line-clamp(2);

    &:hover {
      color: $primary;
    }
  }

  &__spec {
    margin-top: $space-1;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
    margin-top: $space-3;
  }

  &__amount {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 600;
    letter-spacing: $ls-body;
  }

  &__remove {
    margin-top: $space-2;
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

  // ------------------------------------------------------------ 頁尾
  &__foot {
    padding: $space-5 $space-6 $space-6;
    border-top: 1px solid $gray-100;
    background-color: $primary-50;
  }

  &__total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: $space-4;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;

    strong {
      color: $primary-dark;
      font-size: $fz-h4;
      font-weight: 600;
    }
  }

  &__action {
    width: 100%;

    & + & {
      margin-top: $space-3;
    }
  }
}

// 動態
.c-drawer-enter-active,
.c-drawer-leave-active {
  transition: opacity $duration $ease;

  .c-drawer__panel {
    transition: transform $duration $ease;
  }
}

.c-drawer-enter-from,
.c-drawer-leave-to {
  opacity: 0;

  .c-drawer__panel {
    transform: translateX(100%);
  }
}
</style>
