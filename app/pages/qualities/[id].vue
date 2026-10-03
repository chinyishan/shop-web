<template>
  <div class="l-page p-quality" v-if="qualityInfo">
    <SwipersBanner :info="qualityInfo?.page_modules?.carousel" />
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Quality</span>
      <h1 class="c-page-head__title">{{ qualityInfo.modules?.quality_header?.name }}</h1>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner c-section__inner--narrow">
        <div class="c-prose">
          <Editor :html="qualityInfo.modules?.editor?.content"></Editor>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import _ from "lodash";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.params;

const { data } = await useFetch(`/api/quality/${id}`);
const qualityInfo = ref(_.get(data, "value.result"));

if (!qualityInfo.value) {
  await navigateTo("/");
}

setSEO("page-quality", qualityInfo.value.seo);
</script>

<style lang="scss" scoped>
.p-quality {
  background-color: $white;
}
</style>
