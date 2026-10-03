<template>
  <section class="c-section p-home__intro" >
    <div class="c-section__inner">
      <div class="p-home__intro-head">
        <div class="p-home__intro-lead">
          <span class="c-section__eyebrow">{{ data.eyebrow }}</span>
          <h2 class="c-section__title p-home__intro-title">
            {{ data.title }}
          </h2>
        </div>
        <div>
          <p class="p-home__intro-text">{{ data.description }}</p>
          <NuxtLink class="c-btn c-btn--ghost p-home__intro-cta" to="/quiz">
            做個 1 分鐘保健測驗
          </NuxtLink>
        </div>
      </div>

      <ul class="p-home__features">
        <li
          class="c-feature p-home__feature"
          v-for="(feature, index) in data.features"
          :key="index"
        >
          <span class="c-feature__index">{{ String(index + 1).padStart(2, "0") }}</span>
          <h3 class="c-feature__title">{{ feature.title }}</h3>
          <p class="c-feature__desc">{{ feature.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
/** 首頁：品牌理念 */
defineProps({
  data: { type: Object, required: true },
});
</script>

<style lang="scss" scoped>
.p-home {
  // ------------------------------------------------------------ 品牌理念
  &__intro-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $space-8;
    align-items: end;
    margin-bottom: $space-10;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-5;
      margin-bottom: $space-8;
    }
  }

  &__intro-title {
    font-size: $fz-h1;

    @include md() {
      font-size: $fz-h3;
    }
  }

  &__intro-text {
    color: $content;
    font-size: $fz-body-lg;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    white-space: pre-line;

    @include md() {
      font-size: $fz-body;
    }
  }

  &__intro-cta {
    margin-top: $space-5;
  }

  &__features {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $space-7;

    @include tb() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-6;
    }
    @include sm() {
      grid-template-columns: 1fr;
    }
  }

  &__feature {
    padding-top: $space-5;
    border-top: 1px solid $primary-100;
  }
}
</style>
