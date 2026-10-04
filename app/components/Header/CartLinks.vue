<template>
  <NuxtLink class="l-header__cart" to="/wishlist" aria-label="收藏清單">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
      <path
        d="M12 20s-7-4.3-7-9.2A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.8c0 4.9-7 9.2-7 9.2z"
        stroke-linejoin="round"
      />
    </svg>
    <ClientOnly>
      <span v-if="wishlist.count" class="l-header__cart-badge">{{ wishlist.count }}</span>
    </ClientOnly>
  </NuxtLink>

  <NuxtLink class="l-header__cart" to="/cart" aria-label="購物車">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
      <path
        d="M7 8h10l-1 11H8L7 8z"
        stroke-linejoin="round"
      />
      <path d="M9.5 8a2.5 2.5 0 0 1 5 0" stroke-linecap="round" />
    </svg>
    <ClientOnly>
      <span v-if="cart.count" class="l-header__cart-badge">{{ cart.count }}</span>
    </ClientOnly>
  </NuxtLink>
</template>

<script setup lang="ts">
/** 頁首的收藏清單與購物車圖示（含數量） */
const cart = useCartStore();
const wishlist = useWishlistStore();
</script>

<style lang="scss" scoped>
.l-header {
  // ------------------------------------------------------------ 購物車
  &__cart {
    position: relative;
    display: flex;
    align-items: center;
    color: $text;
    transition: color $duration $ease;

    svg {
      @include size(26px);
      display: block;
    }

    &:hover {
      color: $primary;
    }
  }

  &__cart-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: $radius-pill;
    background-color: $cta;
    color: $on-cta;
    font-size: 11px;
    line-height: 18px;
    text-align: center;
    box-sizing: border-box;
  }
}
</style>
