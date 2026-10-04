<template>
  <div v-if="pageData" class="l-page p-home">
    <SwipersBanner class="p-home__hero" :info="pageData.carousel" size="large" />
    <HomeIntro v-if="pageData.intro" :data="pageData.intro" />
    <HomeBrands v-if="brands.length" :brands="brands" />
    <HomeFeatured v-if="pageData.featured_products" :data="pageData.featured_products" />
    <HomeJournal v-if="pageData.carousel_article" :data="pageData.carousel_article" />
    <HomeVoices v-if="pageData.carousel_reviews" :data="pageData.carousel_reviews" />
    <HomeCooperation v-if="pageData.cooperation" :data="pageData.cooperation" />
    <HomeCta v-if="pageData.carousel_small" :data="pageData.carousel_small" />
  </div>
</template>

<script setup>
const { page } = useSiteConfig();
const pageData = computed(() => page("page-index")?.attribute_data);

useSeo("page-index");

const { data: brands } = await useFetch("/api/index/config", {
  transform: (res) => res.result.data ?? [],
  default: () => [],
});
</script>

<style lang="scss" scoped>
.p-home {
  background-color: $surface;
}
</style>
