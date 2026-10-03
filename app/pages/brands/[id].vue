<template>
  <BrandView :info="pageInfo" />
</template>

<script setup>
const route = useRoute();

const { data: pageInfo } = await useFetch(`/api/brand/${route.params.id}`, {
  transform: (res) => res.result,
});
if (!pageInfo.value) {
  throw createError({ statusCode: 404, message: "找不到品牌" });
}

useSeo("page-brands", pageInfo.value.modules?.seo);
</script>
