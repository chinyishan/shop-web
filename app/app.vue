<template>
  <NuxtLoadingIndicator :throttle="0" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
await fetchSiteConfig();

const { siteName, seo } = useSiteConfig();

// 全站預設 SEO，各頁再用 useSeo() 覆寫
useHead({
  title: () => seo.value.title,
  titleTemplate: (title) => (title ? `${title} - ${siteName.value}` : siteName.value),
  meta: [{ name: "keywords", content: () => seo.value.keywords ?? siteName.value }],
});
useSeoMeta({
  title: () => seo.value.title,
  ogTitle: () => seo.value.title,
  ogUrl: () => seo.value.url,
  description: () => seo.value.description,
  ogDescription: () => seo.value.description,
});
</script>
