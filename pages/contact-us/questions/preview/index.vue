<template>
  <div class="l-page p-qa" v-if="pageInfo?.attribute_data">
    <SwipersBanner :info="pageInfo.attribute_data?.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <div class="p-qa__layout">
          <aside class="c-sidenav p-qa__aside">
            <p class="c-sidenav__title">Q&amp;A</p>
            <ul class="c-sidenav__list">
              <li
                class="c-sidenav__item"
                v-for="item in resource.categories"
                :key="item.key"
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

            <ul class="p-qa__list" v-loading="loading">
              <li
                class="p-qa__item"
                :class="{ 'p-qa__item--is-open': item.showContent }"
                :id="item.id"
                v-for="(item, index) in questionList"
                :key="index"
              >
                <button type="button" class="p-qa__question" @click="toggleClick(item)">
                  <span class="p-qa__index">Q{{ index + 1 }}</span>
                  <span class="p-qa__title">{{ item.question_header.title }}</span>
                  <span class="p-qa__icon">
                    <svgo-array-up v-show="item.showContent" />
                    <svgo-array-down v-show="item.showContent == false" />
                  </span>
                </button>
                <div class="p-qa__answer" v-show="item.showContent">
                  <div class="c-prose">
                    <Editor :html="item.editor.content"></Editor>
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
import _ from "lodash";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.query;

const { pages } = useWebStore();
const pageInfo = ref(pages["page-question"]);
setSEO("page-question");

const pageResource = await $fetch("/api/questions/resource");
const { options } = useResourceStore();

const loading = ref(false);
const resource = ref(_.get(pageResource, "result"));
const toggleId = ref(route.query.category_id ?? resource.value.categories[0].key);
options.breadcrumb.questionsCategories = resource.value.categories;

const getCategoryLabel = () =>
  _.find(resource.value.categories, { key: Number(toggleId.value) })?.label;

const questionList = ref([]);

const getQuestionList = () => {
  loading.value = true;

  $fetch(`/api/questions/${id}/preview`)
    .then((res) => {
      const data = _.get(res, "result.questions", {});
      questionList.value = _.map(data, (item, key) => {
        item.id = key;
        item.showContent = id == key;
        return item;
      });

      nextTick(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  getQuestionList();
});

const toggleClick = (item) => {
  item.showContent = !item.showContent;
};
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
