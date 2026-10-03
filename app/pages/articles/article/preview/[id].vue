<template>
  <ArticleView
    :info="articleInfo"
    :prev="navigationInfo.prev"
    :next="navigationInfo.next"
    preview
    :fallbackCarousel="pageInfo?.attribute_data?.carousel"
  />
</template>

<script setup>
import _ from "lodash";

definePageMeta({
  layout: "default",
});

const route = useRoute();
const { id } = route.params;
const { options } = useResourceStore();
const { pages } = useWebStore();

const pageInfo = ref(pages["page-information"]);

const { data } = await useFetch(`/api/articles/preview/${id}`);
const articleInfo = ref(_.get(data, "value.result.article"));

if (!articleInfo.value) {
  await navigateTo("/articles/all");
}

setSEO("page-information", articleInfo.value.attribute_data?.seo);

const navigationInfo = ref({
  next: _.get(data, "value.result.next"),
  prev: _.get(data, "value.result.prev"),
});

options.breadcrumb.articlesInfo.push({
  key: articleInfo.value.id,
  label: articleInfo.value.attribute_data?.article_header?.title,
});
</script>
