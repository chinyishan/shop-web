<template>
  <ArticleView
    :info="articleInfo"
    :prev="navigationInfo.prev"
    :next="navigationInfo.next"
    preview
    :fallback-carousel="pageInfo?.attribute_data?.carousel"
  />
</template>

<script setup>
const route = useRoute();

const { page } = useSiteConfig();
const pageInfo = computed(() => page("page-information"));

const { data } = await useFetch(`/api/articles/preview/${route.params.id}`, {
  transform: (res) => res.result,
});

const articleInfo = computed(() => data.value?.article);
if (!articleInfo.value) {
  throw createError({ statusCode: 404, message: "找不到文章" });
}

const navigationInfo = computed(() => ({ prev: data.value?.prev, next: data.value?.next }));

useSeo("page-information", articleInfo.value.attribute_data?.seo);
useBreadcrumbTitle(() => articleInfo.value?.attribute_data?.article_header?.title);
</script>
