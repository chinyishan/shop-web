<template>
  <div class="l-page p-wishlist">
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Wishlist</span>
      <h1 class="c-page-head__title">收藏清單</h1>
      <ClientOnly>
        <p v-if="!wishlist.isEmpty" class="c-page-head__lead">
          已收藏 {{ wishlist.count }} 項商品
        </p>
      </ClientOnly>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <ClientOnly>
          <template v-if="!wishlist.isEmpty">
            <ul class="p-wishlist__grid">
              <li v-for="item in wishlist.items" :key="item.id">
                <ProductCard :item="item" />
              </li>
            </ul>

            <div class="p-wishlist__foot">
              <button type="button" class="p-wishlist__clear" @click="onClear">
                清空收藏清單
              </button>
            </div>
          </template>

          <div v-else class="p-wishlist__empty">
            <p class="c-empty">還沒有收藏任何商品，點商品圖上的愛心就能收藏。</p>
            <NuxtLink class="c-btn c-btn--ghost" to="/products/1/detail">去逛逛商品</NuxtLink>
          </div>

          <template #fallback>
            <p class="c-empty">收藏清單讀取中…</p>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

const wishlist = useWishlistStore();

useSeo("page-index", {
  title: "收藏清單",
  description: "你收藏的商品都在這裡。",
});

const onClear = () => {
  wishlist.clear();
  ElMessage.success("已清空收藏清單");
};
</script>

<style lang="scss" scoped>
.p-wishlist {
  background-color: $surface;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $space-8 $space-6;

    @include tb() {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @include md() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-6 $space-4;
    }
  }

  &__foot {
    display: flex;
    justify-content: center;
    margin-top: $space-8;
  }

  &__clear {
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-5;
    padding-bottom: $space-9;
  }
}
</style>
