<template>
  <div v-if="info?.attribute_data" class="l-page p-article">
    <SwipersBanner :info="info.attribute_data?.carousel ?? fallbackCarousel" />
    <Breadcrumb />

    <header class="c-page-head p-article__head">
      <div class="c-page-head__eyebrow">Article</div>
      <h1 class="c-page-head__title">
        {{ info.attribute_data?.article_header?.title }}
      </h1>
      <div class="c-page-head__meta">
        <span v-for="(item, index) in info.categories" :key="index" class="c-tag">
          {{ item.name }}
        </span>
        <time>{{ info.published_at }}</time>
      </div>
    </header>

    <section class="c-section c-section--flush-top p-article__body">
      <div class="c-section__inner c-section__inner--narrow">
        <div class="c-prose">
          <Editor :html="info.attribute_data?.editor?.content"/>
        </div>

        <nav class="p-article__nav">
          <NuxtLink
            v-if="prev"
            class="p-article__nav-item p-article__nav-item--prev"
            :to="linkTo(prev.id)"
          >
            <span class="p-article__nav-label">← 上一篇</span>
            <span class="p-article__nav-title">
              {{ prev.attribute_data?.article_header?.title }}
            </span>
          </NuxtLink>
          <span v-else class="p-article__nav-item p-article__nav-item--disabled">
            <span class="p-article__nav-label">第一篇</span>
          </span>

          <NuxtLink
            v-if="next"
            class="p-article__nav-item p-article__nav-item--next"
            :to="linkTo(next.id)"
          >
            <span class="p-article__nav-label">下一篇 →</span>
            <span class="p-article__nav-title">
              {{ next.attribute_data?.article_header?.title }}
            </span>
          </NuxtLink>
          <span v-else class="p-article__nav-item p-article__nav-item--disabled">
            <span class="p-article__nav-label">最後一篇</span>
          </span>
        </nav>
      </div>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  info: { type: Object, default: () => ({}) },
  prev: { type: Object, default: null },
  next: { type: Object, default: null },
  categoryId: { type: [String, Number], default: "all" },
  preview: { type: Boolean, default: false },
  fallbackCarousel: { type: Object, default: () => ({}) },
});

const linkTo = (id) =>
  props.preview
    ? `/articles/article/preview/${id}`
    : {
        name: "articles-categoryId-id",
        params: { categoryId: props.categoryId, id },
      };
</script>

<style lang="scss" scoped>
.p-article {
  background-color: $white;

  &__head {
    border-bottom: 1px solid $gray-100;
  }

  &__body {
    padding-top: $space-8;
  }

  // ------------------------------------------------------------ 上下篇
  &__nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-6;
    margin-top: $space-10;
    padding-top: $space-6;
    border-top: 1px solid $gray-100;

    @include md() {
      grid-template-columns: 1fr;
      gap: $space-4;
      margin-top: $space-8;
    }
  }

  &__nav-item {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    color: $text;
    transition: color $duration $ease;

    &--next {
      text-align: right;

      @include md() {
        text-align: left;
      }
    }

    &--disabled {
      color: $gray-300;
    }

    &:hover:not(&--disabled) {
      color: $primary;
    }
  }

  &__nav-label {
    color: $primary-400;
    font-size: $fz-xs;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
  }

  &__nav-title {
    font-size: $fz-body;
    line-height: $lh-heading;
    letter-spacing: $ls-body;
    @include line-clamp(2);
  }
}
</style>
