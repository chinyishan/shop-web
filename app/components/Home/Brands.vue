<template>
  <section class="c-section c-section--tint p-home__brands">
    <div class="c-section__inner">
      <div class="c-section__head">
        <div>
          <span class="c-section__eyebrow">Brands</span>
          <h2 class="c-section__title">系列品牌</h2>
        </div>
      </div>

      <div class="p-home__brand-list">
        <article v-for="brand in brands" :key="brand.id" class="p-home__brand">
          <NuxtLink class="p-home__brand-media" :to="`/brands/${brand.id}`">
            <div class="c-figure">
              <img :src="brand.logo" :alt="brand.name" :title="brand.name" >
            </div>
          </NuxtLink>

          <div class="p-home__brand-body">
            <h3 class="p-home__brand-name">{{ brand.name }}</h3>
            <p class="p-home__brand-desc">{{ brand.description }}</p>

            <ul class="p-home__brand-products">
              <li
                v-for="product in brand.products"
                :key="product.id"
                class="p-home__brand-product"
              >
                <NuxtLink
                  class="c-product"
                  :to="`/products/${brand.id}/product/${product.id}`"
                >
                  <div class="c-product__media">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      :title="product.name"
                    >
                  </div>
                  <h4 class="c-product__name">{{ product.name }}</h4>
                  <Price :value="product.price" :origin="product.origin_price" size="sm" />
                </NuxtLink>
              </li>
            </ul>

            <NuxtLink class="c-link-more" :to="`/brands/${brand.id}`">
              <span>了解品牌</span>
              <span class="c-link-more__arrow">→</span>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
/** 首頁：系列品牌：左右交錯 */
defineProps({
  brands: { type: Array, default: () => [] },
});
</script>

<style lang="scss" scoped>
.p-home {
  // ------------------------------------------------------------ 系列品牌
  &__brand-list {
    display: flex;
    flex-direction: column;
    gap: $space-10;

    @include md() {
      gap: $space-8;
    }
  }

  &__brand {
    display: grid;
    grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
    gap: $space-8;
    align-items: center;

    &:nth-child(even) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 380px);

      .p-home__brand-media {
        order: 2;
      }
    }

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-5;

      &:nth-child(even) {
        grid-template-columns: 1fr;

        .p-home__brand-media {
          order: 0;
        }
      }
    }
  }

  &__brand-media {
    display: block;

    .c-figure {
      // 品牌識別卡的原始比例，避免裁切到品牌名
      aspect-ratio: #{532} / #{372};
      border-radius: $radius-lg;
      background-color: $white;
    }

    &:hover .c-figure img {
      transform: scale(1.03);
    }
  }

  &__brand-name {
    color: $ink;
    font-size: $fz-h3;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;
  }

  &__brand-desc {
    max-width: $container-text;
    margin-top: $space-3;
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
  }

  &__brand-products {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $space-5;
    margin: $space-6 0;

    @include sm() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-4;
    }
  }

  &__brand-product {
    .c-product__media {
      background-color: $white;
    }

    .c-product__name {
      font-size: $fz-sm;
    }
  }
}
</style>
