<template>
  <div v-if="pageInfo?.attribute_data" class="l-page p-articles">
    <SwipersBanner :info="pageInfo.attribute_data.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <div class="p-articles__layout">
          <!-- 分類 .......................................................... -->
          <aside class="c-sidenav p-articles__aside">
            <p class="c-sidenav__title">Journal</p>
            <ul class="c-sidenav__list">
              <li v-for="item in toggleOptions" :key="item.key" class="c-sidenav__item">
                <button
                  type="button"
                  class="c-sidenav__link"
                  :class="{ 'c-sidenav__link--is-active': toggleId == item.key }"
                  @click="onCategoryChange(item.key)"
                >
                  {{ item.label }}
                </button>
              </li>
            </ul>
          </aside>

          <!-- 文章 .......................................................... -->
          <div class="p-articles__main">
            <div class="c-section__head c-section__head--stack p-articles__head">
              <span class="c-section__eyebrow">Articles</span>
              <h2 class="c-section__title">{{ currentLabel }}</h2>
            </div>

            <div v-loading="loading">
              <ul v-if="articleList.length" class="p-articles__grid">
                <li v-for="article in articleList" :key="article.id">
                  <NuxtLink
                    class="c-card"
                    :to="{
                      name: 'articles-categoryId-id',
                      params: { id: article.id, categoryId: toggleId },
                    }"
                  >
                    <div class="c-card__media">
                      <div class="c-figure">
                        <img
                          :src="article.image"
                          :alt="article.title"
                          :title="article.title"
                          @error="onImageError"
                        >
                      </div>
                    </div>
                    <div class="c-card__meta">
                      <span
                        v-for="(item, index) in article.categories"
                        :key="index"
                        class="c-tag"
                        >{{ item.name }}</span
                      >
                      <time>{{ article.published_at }}</time>
                    </div>
                    <h3 class="c-card__title">{{ article.title }}</h3>
                    <p class="c-card__desc">{{ article.subtitle }}</p>
                  </NuxtLink>
                </li>
              </ul>
              <p v-else-if="!loading" class="c-empty">目前沒有文章</p>
            </div>

            <Pagination
              v-if="paginateInfo.total / paginateInfo.perPage > 1"
              :prop-page-info="paginateInfo"
              @click-handler="onPageChange"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const newsImage = "/placeholder-news.svg";
const route = useRoute();
const router = useRouter();

const { page } = useSiteConfig();
const pageInfo = computed(() => page("page-information"));
useSeo("page-information");

/** 分類 */
const toggleId = ref(route.params.id);
const currentPage = ref(1);

const { data: categories } = await useFetch("/api/articles/resource", {
  transform: (res) => res.result.categories ?? [],
  default: () => [],
});
const toggleOptions = computed(() => [{ label: "全部文章", key: "all" }, ...categories.value]);
const currentLabel = computed(
  () => toggleOptions.value.find((item) => item.key == toggleId.value)?.label ?? "全部文章"
);

/** 文章列表：分類或頁碼改變時自動重抓 */
const { data: articles, status } = await useFetch("/api/articles/list", {
  query: computed(() => ({
    category_id: toggleId.value === "all" ? undefined : toggleId.value,
    page: currentPage.value,
  })),
  transform: (res) => res.result,
});

const loading = computed(() => status.value === "pending");
const articleList = computed(() => articles.value?.data ?? []);
const paginateInfo = computed(() => toPageInfo(articles.value?.meta, 9));

const onPageChange = ({ page }) => {
  currentPage.value = page;
};

const onCategoryChange = (key) => {
  toggleId.value = key;
  currentPage.value = 1;
  router.replace({ query: { category_id: key } });
};

const onImageError = (event) => {
  event.target.src = newsImage;
};
</script>

<style lang="scss" scoped>
.p-articles {
  background-color: $white;

  &__layout {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: $space-10;
    align-items: start;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  &__aside {
    position: sticky;
    top: 120px;

    @include lm() {
      position: static;
    }
  }

  &__head {
    margin-bottom: $space-7;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-8 $space-6;

    @include tb() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @include md() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }
}
</style>
