<template>
  <section class="c-section c-section--tint p-home__cooperation">
    <div class="c-section__inner">
      <div class="p-home__cooperation-row">
        <div class="p-home__cooperation-media">
          <div class="c-figure c-figure--plain">
            <img
              :src="data.image"
              :alt="data.title"
              :title="data.title"
            />
          </div>
        </div>
        <div class="p-home__cooperation-body">
          <span class="c-section__eyebrow">Cooperation</span>
          <h2 class="c-section__title">{{ data.title }}</h2>
          <p class="p-home__cooperation-text">
            {{ data.description }}
          </p>
          <NuxtLink class="c-btn c-btn--ghost" to="/contact-us/information">
            合作與提案
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/** 首頁：專業合作 */
defineProps({
  data: { type: Object, required: true },
});
</script>

<style lang="scss" scoped>
.p-home {
  // ------------------------------------------------------------ 專業合作
  &__cooperation-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $space-9;
    align-items: center;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  &__cooperation-text {
    margin: $space-5 0 $space-7;
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    white-space: pre-line;
  }
}
</style>
