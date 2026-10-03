<template>
  <div class="l-page p-reviews">
    <SwipersBanner :info="pageInfo.modules?.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner c-section__inner--narrow">
        <div class="c-section__head c-section__head--stack">
          <span class="c-section__eyebrow">Voices</span>
          <h2 class="c-section__title">好評回饋</h2>
          <p class="c-section__lead">{{ brandLabel }}</p>
        </div>

        <ul v-if="reviewsData?.length" class="p-reviews__list">
          <ReviewCard
            v-for="item in reviewsData"
            :id="item.id"
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
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const { brandId } = route.params;
const { id: previewId } = route.query;
const site = useSiteConfig();
const brandLabel = computed(() => site.brandLabel(brandId) ?? "");

const { data: pageInfo } = await useFetch(`/api/products/${brandId}/page-products`, {
  transform: (res) => res.result,
});
useSeo("page-products", pageInfo.value?.modules?.seo);

const reviewsData = ref([]);

onMounted(async () => {
  const res = await $fetch(`/api/products/${brandId}/preview/review`, { query: { id: previewId } });
  reviewsData.value = res.result?.data ?? [];
  await nextTick();
  document.getElementById(previewId)?.scrollIntoView({ behavior: "smooth" });
});
</script>

<style lang="scss" scoped>
.p-reviews {
  background-color: $white;

  &__list {
    border-top: 1px solid $gray-100;
  }
}
</style>
