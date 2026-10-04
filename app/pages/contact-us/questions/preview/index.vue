<template>
  <div v-if="pageInfo?.attribute_data" class="l-page p-qa">
    <SwipersBanner :info="pageInfo.attribute_data?.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <div class="p-qa__layout">
          <aside class="c-sidenav p-qa__aside">
            <p class="c-sidenav__title">Q&amp;A</p>
            <ul class="c-sidenav__list">
              <li
                v-for="item in resource.categories"
                :key="item.key"
                class="c-sidenav__item"
              >
                <span
                  class="c-sidenav__link"
                  :class="{ 'c-sidenav__link--is-active': toggleId == item.key }"
                  style="cursor: not-allowed"
                >
                  {{ item.label }}
                </span>
              </li>
            </ul>
          </aside>

          <div class="p-qa__main">
            <div class="c-section__head c-section__head--stack p-qa__head">
              <span class="c-section__eyebrow">Preview</span>
              <h2 class="c-section__title">{{ getCategoryLabel() }}</h2>
            </div>

            <ul v-loading="loading" class="p-qa__list">
              <li
                v-for="(item, index) in questionList"
                :id="item.id"
                :key="index"
                class="p-qa__item"
                :class="{ 'p-qa__item--is-open': item.showContent }"
              >
                <button type="button" class="p-qa__question" @click="toggleClick(item)">
                  <span class="p-qa__index">Q{{ index + 1 }}</span>
                  <span class="p-qa__title">{{ item.question_header.title }}</span>
                  <span class="p-qa__icon">
                    <svgo-array-up v-show="item.showContent" />
                    <svgo-array-down v-show="item.showContent == false" />
                  </span>
                </button>
                <div v-show="item.showContent" class="p-qa__answer">
                  <div class="c-prose">
                    <Editor :html="item.editor.content"/>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const { id } = route.query;

const { page } = useSiteConfig();
const pageInfo = computed(() => page("page-question"));
useSeo("page-question");

const { data: resource } = await useFetch("/api/questions/resource", {
  transform: (res) => res.result,
  default: () => ({ categories: [] }),
});
const toggleId = ref(route.query.category_id ?? resource.value.categories[0]?.key);

const getCategoryLabel = () =>
  resource.value.categories.find((item) => item.key === Number(toggleId.value))?.label;

/** 預覽的問題要等畫面出來後捲動過去，所以在瀏覽器端抓 */
const loading = ref(false);
const questionList = ref([]);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await $fetch(`/api/questions/${id}/preview`);
    questionList.value = Object.entries(res.result?.questions ?? {}).map(([key, item]) => ({
      ...item,
      id: key,
      showContent: id == key,
    }));
    await nextTick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  } finally {
    loading.value = false;
  }
});

const toggleClick = (item) => {
  item.showContent = !item.showContent;
};
</script>

<style lang="scss" scoped>
.p-qa {
  background-color: $surface;

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
