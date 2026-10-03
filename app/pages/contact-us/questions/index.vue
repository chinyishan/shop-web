<template>
  <div v-if="pageInfo?.attribute_data" class="l-page p-qa">
    <SwipersBanner :info="pageInfo.attribute_data?.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <div class="p-qa__layout">
          <!-- 分類 .......................................................... -->
          <aside class="c-sidenav p-qa__aside">
            <p class="c-sidenav__title">Q&amp;A</p>
            <ul class="c-sidenav__list">
              <li
                v-for="item in resource.categories"
                :key="item.key"
                class="c-sidenav__item"
              >
                <button
                  type="button"
                  class="c-sidenav__link"
                  :class="{ 'c-sidenav__link--is-active': toggleId == item.key }"
                  @click="onToggleChange(item.key)"
                >
                  {{ item.label }}
                </button>
              </li>
            </ul>
          </aside>

          <!-- 問題列表 ...................................................... -->
          <div class="p-qa__main">
            <div class="c-section__head c-section__head--stack p-qa__head">
              <span class="c-section__eyebrow">Questions</span>
              <h2 class="c-section__title">{{ getCategoryLabel() }}</h2>
            </div>

            <ul v-loading="loading" class="p-qa__list">
              <li
                v-for="(item, index) in questionList"
                :key="index"
                class="p-qa__item"
                :class="{ 'p-qa__item--is-open': isOpen(item) }"
              >
                <button type="button" class="p-qa__question" @click="toggleClick(item)">
                  <span class="p-qa__index">Q{{ indexMethod(index + 1) }}</span>
                  <span class="p-qa__title">{{ item.question_header.title }}</span>
                  <span class="p-qa__icon">
                    <svgo-array-up v-show="isOpen(item)" />
                    <svgo-array-down v-show="!isOpen(item)" />
                  </span>
                </button>
                <div v-show="isOpen(item)" class="p-qa__answer">
                  <div class="c-prose">
                    <Editor :html="item.editor.content"/>
                  </div>
                </div>
              </li>
            </ul>

            <Pagination
              v-if="showPagination()"
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
const route = useRoute();
const router = useRouter();

const { page } = useSiteConfig();
const pageInfo = computed(() => page("page-question"));
useSeo("page-question");

/** 分類 */
const { data: resource } = await useFetch("/api/questions/resource", {
  transform: (res) => res.result,
  default: () => ({ categories: [] }),
});
const firstCategory = () => resource.value.categories[0]?.key;
const toggleId = ref(route.query.category_id ?? firstCategory());

watch(
  () => route.query.category_id,
  (id) => {
    toggleId.value = id ?? firstCategory();
  }
);

const getCategoryLabel = () =>
  resource.value.categories.find((item) => item.key === Number(toggleId.value))?.label;
useBreadcrumbTitle(getCategoryLabel);

/** 問題列表：分類或頁碼改變時自動重抓 */
const currentPage = ref(1);
const { data: questions, status } = await useFetch("/api/questions/list", {
  query: computed(() => ({ category_id: toggleId.value, page: currentPage.value })),
  transform: (res) => res.result,
});

const loading = computed(() => status.value === "pending");
const questionList = computed(() => questions.value?.data ?? []);
const paginateInfo = computed(() => toPageInfo(questions.value?.meta, 10));

const indexMethod = (index) => (paginateInfo.value.currentPage - 1) * 10 + index;
const showPagination = () => paginateInfo.value.total / paginateInfo.value.perPage > 1;

const onToggleChange = (id) => {
  currentPage.value = 1;
  toggleId.value = id;
  router.replace({ query: { category_id: id } });
};

const onPageChange = ({ page }) => {
  currentPage.value = page;
};

/** 展開狀態，換頁或換分類時全部收合 */
const openIds = ref([]);
const isOpen = (item) => openIds.value.includes(item.id);
const toggleClick = (item) => {
  openIds.value = isOpen(item) ? openIds.value.filter((id) => id !== item.id) : [...openIds.value, item.id];
};
watch(questionList, () => {
  openIds.value = [];
});
</script>

<style lang="scss" scoped>
.p-qa {
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
    margin-bottom: $space-6;
  }

  &__list {
    border-top: 1px solid $gray-100;
  }

  &__item {
    border-bottom: 1px solid $gray-100;

    &--is-open {
      .p-qa__title {
        color: $primary;
      }
    }
  }

  &__question {
    display: flex;
    align-items: flex-start;
    gap: $space-5;
    width: 100%;
    padding: $space-5 0;
    background: none;
    text-align: left;
    cursor: pointer;

    @include md() {
      gap: $space-3;
      padding: $space-4 0;
    }
  }

  &__index {
    flex-shrink: 0;
    color: $primary-300;
    font-size: $fz-h4;
    font-weight: 600;
    letter-spacing: $ls-eyebrow;

    @include md() {
      font-size: $fz-body;
    }
  }

  &__title {
    flex: 1;
    color: $ink;
    font-size: $fz-body-lg;
    font-weight: 500;
    line-height: $lh-heading;
    letter-spacing: $ls-body;
    transition: color $duration $ease;

    @include md() {
      font-size: $fz-body;
    }
  }

  &__icon {
    flex-shrink: 0;
    color: $primary;

    :deep(svg) {
      width: 20px;
      height: 20px;
    }
  }

  &__answer {
    padding: 0 0 $space-6 calc(#{$space-5} + 46px);

    @include md() {
      padding-left: 0;
    }
  }
}
</style>
