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

        <ul class="p-reviews__list" v-if="reviewsData?.length">
          <li class="c-review" :id="item.id" v-for="item in reviewsData" :key="item.id">
            <div class="c-review__avatar">
              <img :src="item.image" :alt="item.user" :title="item.user" />
            </div>
            <div class="c-review__body">
              <NuxtLink
                class="c-review__product"
                :to="`/products/${brandId}/product/${item.product_id}`"
              >
                {{ item.product_name }}
              </NuxtLink>
              <p class="c-review__text">{{ item.content }}</p>
              <p class="c-review__person">
                {{ item.user }}<Separator />{{ item.company }}<Separator
                />{{ item.career }}
              </p>
            </div>
          </li>
        </ul>
        <p class="c-empty" v-else>目前沒有回饋資料</p>
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
