<template>
  <div class="l-page p-product" v-if="productInfo">
    <Breadcrumb />

    <section class="c-section c-section--flush-top p-product__hero">
      <div class="c-section__inner">
        <Commodity :productInfo="productInfo" />
      </div>
    </section>

    <!-- 詳情／檢驗／規格 ....................................................... -->
    <section class="c-section c-section--tint p-product__detail">
      <div class="c-section__inner">
        <ul class="p-product__tabs">
          <li v-for="tab in tabs" :key="tab.key">
            <button
              type="button"
              class="p-product__tab"
              :class="{ 'p-product__tab--is-active': toggle === tab.key }"
              @click="toggle = tab.key"
            >
              {{ tab.label }}
            </button>
          </li>
        </ul>

        <div class="p-product__panel">
          <div class="c-prose">
            <Editor :html="panelHtml"></Editor>
          </div>
        </div>
      </div>
    </section>

    <!-- 好評推薦 .............................................................. -->
    <section class="c-section p-product__reviews" v-if="reviews.length">
      <div class="c-section__inner c-section__inner--narrow">
        <div class="c-section__head c-section__head--stack">
          <span class="c-section__eyebrow">Voices</span>
          <h2 class="c-section__title">好評推薦</h2>
        </div>

        <ul class="p-product__review-list">
          <ReviewCard
            v-for="(item, index) in reviews"
            :key="index"
            :user="item.user_name"
            :image="item.image"
            :content="item.content"
            :company="item.company"
            :career="item.career"
          />
        </ul>
      </div>
    </section>

    <!-- 最近瀏覽 .............................................................. -->
    <ClientOnly>
      <section class="c-section p-product__recent" v-if="recentItems.length">
        <div class="c-section__inner">
          <div class="c-section__head">
            <div>
              <span class="c-section__eyebrow">Recently viewed</span>
              <h2 class="c-section__title">最近瀏覽</h2>
            </div>
          </div>

          <ul class="p-product__related-grid">
            <li v-for="item in recentItems" :key="item.id">
              <ProductCard :item="item" />
            </li>
          </ul>
        </div>
      </section>
    </ClientOnly>

    <!-- 相關商品 .............................................................. -->
    <section class="c-section c-section--surface p-product__related" v-if="related.length">
      <div class="c-section__inner">
        <div class="c-section__head">
          <div>
            <span class="c-section__eyebrow">More</span>
            <h2 class="c-section__title">相關商品</h2>
          </div>
        </div>

        <ul class="p-product__related-grid">
          <li v-for="item in related" :key="item.id">
            <ProductCard :item="item" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>

const props = defineProps({
  productInfo: {
    type: Object,
    default: () => ({}),
  },
});

const tabs = [
  { key: "detail", label: "詳情" },
  { key: "examine", label: "檢驗" },
  { key: "format", label: "規格" },
];
const toggle = ref("detail");

const header = computed(() =>
  props.productInfo?.attribute_data?.product_header ?? {}
);
const panelHtml = computed(() => header.value?.[toggle.value] ?? "");

const reviews = computed(() =>
  (props.productInfo?.attribute_data?.carousel_reviews?.items ?? []).slice(0, 4)
);
const related = computed(() =>
  (props.productInfo?.attribute_data?.carousel_product?.items ?? []).slice(0, 4)
);

/** 最近瀏覽：進頁面先記錄，再排除自己 */
const recent = useRecentStore();
const recentItems = ref([]);

onMounted(() => {
  recentItems.value = recent.exclude(props.productInfo?.id).slice(0, 4);

  recent.add({
    id: props.productInfo?.id,
    name: header.value?.name,
    brand: props.productInfo?.brand,
    brand_id: props.productInfo?.brand_id,
    main_image: header.value?.product_images?.[0],
    price: header.value?.price,
    origin_price: header.value?.origin_price,
    stock: header.value?.stock,
    specs: header.value?.specs,
  });
});
</script>

<style lang="scss" scoped>
.p-product {
  background-color: $white;

  // ------------------------------------------------------------ 分頁標籤
  &__tabs {
    display: flex;
    gap: $space-6;
    border-bottom: 1px solid $primary-100;

    @include md() {
      gap: $space-5;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  &__tab {
    position: relative;
    padding: 0 0 $space-4;
    background: none;
    color: $content;
    font-size: $fz-body;
    letter-spacing: $ls-heading;
    white-space: nowrap;
    cursor: pointer;
    transition: color $duration $ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 2px;
      background-color: transparent;
      transition: background-color $duration $ease;
    }

    &:hover {
      color: $primary;
    }

    &--is-active {
      color: $primary;
      font-weight: 500;

      &::after {
        background-color: $primary;
      }
    }
  }

  &__panel {
    padding-top: $space-7;
  }

  // ------------------------------------------------------------ 好評
  &__review-list {
    border-top: 1px solid $gray-100;
  }

  // ------------------------------------------------------------ 相關商品
  &__related-grid {
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
}
</style>
