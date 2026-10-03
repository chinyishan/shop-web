<template>
  <div class="l-page p-articles" v-if="pageInfo?.attribute_data">
    <SwipersBanner :info="pageInfo.attribute_data.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <div class="p-articles__layout">
          <!-- 分類 .......................................................... -->
          <aside class="c-sidenav p-articles__aside">
            <p class="c-sidenav__title">Journal</p>
            <ul class="c-sidenav__list">
              <li class="c-sidenav__item" v-for="item in toggleOptions" :key="item.key">
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
              <ul class="p-articles__grid" v-if="articleList.length">
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
                        />
                      </div>
                    </div>
                    <div class="c-card__meta">
                      <span
                        class="c-tag"
                        v-for="(item, index) in article.categories"
                        :key="index"
                        >{{ item.name }}</span
                      >
                      <time>{{ article.published_at }}</time>
                    </div>
                    <h3 class="c-card__title">{{ article.title }}</h3>
                    <p class="c-card__desc">{{ article.subtitle }}</p>
                  </NuxtLink>
                </li>
              </ul>
              <p class="c-empty" v-else-if="!loading">目前沒有文章</p>
            </div>

            <Pagination
              v-if="paginateInfo.total / paginateInfo.perPage > 1"
              :propPageInfo="paginateInfo"
              @clickHandler="onPageChange"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import _ from "lodash";
import { useRouter, useRoute } from "vue-router";

const newsImage = "/placeholder-news.svg";
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const { pages } = useWebStore();
const pageInfo = ref(pages["page-information"]);
setSEO("page-information");

const toggleId = ref(route.params.id);
const toggleOptions = ref([{ label: "全部文章", key: "all" }]);

const resources = await useFetch("/api/articles/resource");
toggleOptions.value = toggleOptions.value.concat(
  _.get(resources, "data.value.result.categories", [])
);

const currentLabel = computed(
  () => _.find(toggleOptions.value, (item) => item.key == toggleId.value)?.label ?? "全部文章"
);

const articleList = ref([]);
const paginateInfo = ref({ currentPage: 1, perPage: 9, total: 1 });

const getArticleList = (page = paginateInfo.value.currentPage) => {
  loading.value = true;

  return $fetch("/api/articles/list", {
    query: {
      category_id: toggleId.value == "all" ? null : toggleId.value,
      page,
    },
  })
    .then((res) => {
      articleList.value = _.get(res, "result.data", []);
      paginateInfo.value = {
        currentPage: _.get(res, "result.meta.current_page"),
        perPage: _.get(res, "result.meta.per_page"),
        total: _.get(res, "result.meta.total"),
      };
    })
    .finally(() => {
      loading.value = false;
    });
};

const onPageChange = ({ page }) => {
  nextTick(() => getArticleList(page));
};

const onCategoryChange = (val) => {
  toggleId.value = val;
  paginateInfo.value.currentPage = 1;
  router.replace({ query: { category_id: val } });
  getArticleList(1);
};

onMounted(() => {
  getArticleList();
});

function onImageError(event) {
  event.target.src = newsImage;
}
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
