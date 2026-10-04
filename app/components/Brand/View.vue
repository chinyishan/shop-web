<template>
  <div v-if="info" class="l-page p-brand">
    <SwipersBanner :info="info.modules?.carousel" />
    <Breadcrumb />

    <!-- 品牌故事 ............................................................. -->
    <section
      v-if="info.brand_story"
      class="c-section c-section--flush-top p-brand__story"
    >
      <div class="c-section__inner">
        <div class="p-brand__story-row">
          <div class="p-brand__story-media">
            <div class="c-figure">
              <img
                :src="info.brand_story.image"
                :alt="info.brand_story.title"
                :title="info.brand_story.title"
              >
            </div>
          </div>
          <div class="p-brand__story-body">
            <span class="c-section__eyebrow">Brand story</span>
            <h2 class="c-section__title">{{ info.brand_story.title }}</h2>
            <p class="p-brand__story-text">{{ info.brand_story.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 商品列表 ............................................................. -->
    <section v-if="products.length" class="c-section c-section--tint p-brand__products">
      <div class="c-section__inner">
        <div class="c-section__head">
          <div>
            <span class="c-section__eyebrow">Products</span>
            <h2 class="c-section__title">商品列表</h2>
          </div>
          <div v-if="info.modules?.products_list?.more" class="c-section__action">
            <NuxtLink class="c-link-more" :to="`/products/${brandId}/detail?category=products`">
              <span>全部商品</span>
              <span class="c-link-more__arrow">→</span>
            </NuxtLink>
          </div>
        </div>

        <ul class="p-brand__product-grid">
          <li v-for="item in products" :key="item.id">
            <ProductCard :item="item" />
          </li>
        </ul>
      </div>
    </section>

    <!-- 好評回饋 ............................................................. -->
    <section v-if="reviews.length" class="c-section p-brand__reviews">
      <div class="c-section__inner c-section__inner--narrow">
        <div class="c-section__head">
          <div>
            <span class="c-section__eyebrow">Voices</span>
            <h2 class="c-section__title">好評回饋</h2>
          </div>
          <div v-if="info.modules?.carousel_reviews?.more" class="c-section__action">
            <NuxtLink class="c-link-more" :to="`/products/${brandId}/detail?category=reviews`">
              <span>更多回饋</span>
              <span class="c-link-more__arrow">→</span>
            </NuxtLink>
          </div>
        </div>

        <ul class="p-brand__review-list">
          <ReviewCard
            v-for="item in reviews"
            :key="item.id"
            :user="item.user_name"
            :image="item.image"
            :content="item.content"
            :company="item.company"
            :career="item.career"
            :product-name="item.product_name"
            :product-link="`/products/${item.brand_id}/product/${item.product_id}`"
          />
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});

const route = useRoute();
const brandId = computed(() => route.params.id);

const products = computed(() =>
  props.info?.modules?.products_list?.items ?? []
);
const reviews = computed(() =>
  (props.info?.modules?.carousel_reviews?.items ?? []).slice(0, 4)
);
</script>

<style lang="scss" scoped>
.p-brand {
  background-color: $surface;

  // ------------------------------------------------------------ 品牌故事
  &__story {
    padding-top: $space-8;

    @include md() {
      padding-top: $space-6;
    }
  }

  &__story-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $space-9;
    align-items: center;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  &__story-media {
    .c-figure {
      border-radius: $radius-lg;
    }
  }

  &__story-text {
    margin-top: $space-5;
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    white-space: pre-line;
  }

  // ------------------------------------------------------------ 商品列表
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

    .c-product__media {
      background-color: $white;
    }
  }

  // ------------------------------------------------------------ 好評回饋
  &__review-list {
    border-top: 1px solid $gray-100;
  }
}
</style>
