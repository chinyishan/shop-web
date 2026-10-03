<template>
  <div>
    <div class="c-section__head c-section__head--stack p-products__head">
      <span class="c-section__eyebrow">Voices</span>
      <h2 class="c-section__title">好評回饋</h2>
    </div>

    <ul v-if="reviewsData?.length" class="p-products__reviews">
      <ReviewCard
        v-for="item in reviewsData"
        :key="item.id"
        :user="item.user"
        :image="item.image"
        :content="item.content"
        :company="item.company"
        :career="item.career"
        :product-name="item.product_name"
        :product-link="`/products/${brandId}/product/${item.product_id}`"
      />
    </ul>
    <p v-else class="c-empty">目前沒有回饋資料</p>

    <Pagination
      v-if="reviewsPage.total / reviewsPage.perPage > 1"
      :prop-page-info="reviewsPage"
      @click-handler="onReviewsPageChange"
    />
  </div>
</template>

<script setup>
/** 商品專區「好評回饋」分頁：切到這個分頁時才抓資料 */
const props = defineProps({
  brandId: { type: [String, Number], required: true },
});

const reviewsPageNo = ref(1);
const { data: reviews } = useFetch(() => `/api/products/${props.brandId}/reviews`, {
  query: computed(() => ({ page: reviewsPageNo.value })),
  transform: (res) => res.result,
  server: false,
});
const reviewsData = computed(() => reviews.value?.data ?? []);
const reviewsPage = computed(() => toPageInfo(reviews.value?.meta, 5));

const onReviewsPageChange = ({ page }) => {
  reviewsPageNo.value = page;
};
</script>

<style lang="scss" scoped>
.p-products {
  &__head {
    margin-bottom: $space-5;
  }

  &__reviews {
    border-top: 1px solid $gray-100;
  }
}
</style>
