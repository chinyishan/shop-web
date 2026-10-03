<template>
  <ArticleView
    :info="articleInfo"
    :prev="navigationInfo.prev"
    :next="navigationInfo.next"
    :categoryId="categoryId"
    :fallbackCarousel="pageInfo?.attribute_data?.carousel"
  />
</template>

<script setup>
import _ from "lodash";

const route = useRoute();
const { id, categoryId } = route.params;
const { options } = useResourceStore();
const { pages } = useWebStore();

const pageInfo = ref(pages["page-information"]);

const resources = await useFetch("/api/articles/resource");
options.breadcrumb.articleResources = _.get(resources, "data.value.result");

const query = cleanParams({
  category_id: categoryId === "all" ? null : categoryId,
});

const { data } = await useFetch(`/api/articles/${id}`, { query });
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
