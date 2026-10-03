<template>
  <section class="c-section p-home__products" >
    <div class="c-section__inner">
      <div class="c-section__head">
        <div>
          <span class="c-section__eyebrow">Products</span>
          <h2 class="c-section__title">精選商品</h2>
        </div>
        <div class="c-section__action" v-if="data.more">
          <NuxtLink class="c-link-more" to="/products/1/detail">
            <span>商品專區</span>
            <span class="c-link-more__arrow">→</span>
          </NuxtLink>
        </div>
      </div>

      <ul class="p-home__product-grid">
        <li v-for="item in data.items" :key="item.id">
          <ProductCard :item="item" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
/** 首頁：精選商品 */
defineProps({
  data: { type: Object, required: true },
});
</script>

<style lang="scss" scoped>
.p-home {
  // ------------------------------------------------------------ 精選商品
  &__product-grid {
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
}
</style>
