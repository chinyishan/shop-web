<template>
  <div
    class="default"
    :class="{
      'hide-scrollbar': hideScrollbar,
    }"
  >
    <NuxtLoadingIndicator :throttle="0"></NuxtLoadingIndicator>
    <MainHeader />
    <div class="layout-container">
      <NuxtPage />
      <GoTop />
    </div>
    <MainFooter class="footer" />
  </div>
</template>

<script setup>
import _ from "lodash";
const runtimeConfig = useRuntimeConfig();
const environment = runtimeConfig.public.environment;

const webStore = useWebStore();
const { configs: appConfigs } = useAppStore();
const { hambergerOpen, width } = toRefs(appConfigs);
const hideScrollbar = computed(() => {
  if (!_.isUndefined(hambergerOpen.value) && width.value < 768) {
    return hambergerOpen.value ? true : false;
  } else {
    false;
  }
});

const { navRouterData } = useNavRouterStore();
await useFetch("/api/system/config").then((res) => {
  const webConfigData = _.get(res, "data.value.0.result");
  const navbar = _.get(res, "data.value.1.result");
  navRouterData.brands.children = navbar.brands.map((item) => {
    return {
      name: item.label,
      key: `page-brands.${item.key}`,
      href: `/brands/${item.key}`,
      path: `/brands/${item.key}`,
    };
  });
  navRouterData.products.children = navbar.brands.map((item) => {
    return {
      name: item.label,
      key: `page-products.${item.key}`,
      href: `/products/${item.key}/detail`,
      path: `/products/${item.key}/detail`,
    };
  });
  navRouterData.qualites.children = navbar.qualities.map((item) => {
    return {
      name: item.label,
      key: `page-qualities.${item.key}`,
      href: `/qualities/${item.key}`,
      path: `/qualities/${item.key}`,
    };
  });
  navRouterData.articles.children = navRouterData.articles.children.concat(
    navbar.article_categories.map((item) => {
      return {
        name: item.label,
        key: `page-article.${item.key}`,
        href: `/articles/${item.key}`,
        path: `/articles/${item.key}`,
      };
    })
  );
  const { options } = useResourceStore();
  const { article_categories, brands, qualities } = navbar;
  options.navbar = {
    ...options.navbar,
    brands,
    qualities,
    article_categories:
      options.navbar.article_categories.concat(article_categories),
  };
  webStore.configs["attribute_data"] = webConfigData.attribute_data;
  webStore.pages = _.get(res, "data.value.2.result");
});
const configs = webStore.configs?.attribute_data;
if (configs) {
  useHead({
    title: configs.seo.title,
    titleTemplate: `%s - ${configs?.config_header.name}`,
  });
  useSeoMeta({
    title: configs.seo.title,
    ogTitle: configs.seo.title,
    url: configs.seo.url,
    ogUrl: configs.seo.url,
    keywords: configs.seo.keyword ?? "HealthLab 健康實驗室",
    description: configs.seo.description,
    ogDescription: configs.seo.description,
  });
}
const app = useAppStore();
onBeforeMount(() => {
  app.configs.width = window.innerWidth;
  app.configs.scrollTop = document.documentElement.scrollTop;
});
onMounted(() => {
  app.configs.width = window.innerWidth;

  window.addEventListener("resize", function () {
    app.configs.width = window.innerWidth;
  });
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    app.configs.scrollTop = scrollTop;
  });
});
</script>

<style lang="scss">
.default {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $surface;
}
.hide-scrollbar {
  overflow-y: hidden;
}
.footer {
  margin-top: auto;
}

@include md() {
  .default {
    // background-color: $white;
  }
}
</style>
