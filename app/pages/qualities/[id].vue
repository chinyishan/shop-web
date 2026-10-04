<template>
  <div v-if="qualityInfo" class="l-page p-quality">
    <SwipersBanner :info="qualityInfo?.page_modules?.carousel" />
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Quality</span>
      <h1 class="c-page-head__title">{{ qualityInfo.modules?.quality_header?.name }}</h1>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner c-section__inner--narrow">
        <div class="c-prose">
          <Editor :html="qualityInfo.modules?.editor?.content"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();

const { data: qualityInfo } = await useFetch(`/api/quality/${route.params.id}`, {
  transform: (res) => res.result,
});
if (!qualityInfo.value) {
  throw createError({ statusCode: 404, message: "找不到品質檢驗內容" });
}

useSeo("page-quality", qualityInfo.value.seo);
</script>

<style lang="scss" scoped>
.p-quality {
  background-color: $surface;
}
</style>
