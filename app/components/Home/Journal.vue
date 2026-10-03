<template>
  <section class="c-section c-section--surface p-home__journal">
    <div class="c-section__inner">
      <div class="c-section__head">
        <div>
          <span class="c-section__eyebrow">Journal</span>
          <h2 class="c-section__title">資訊專欄</h2>
        </div>
        <div class="c-section__action" v-if="data.more">
          <NuxtLink class="c-link-more" to="/articles/all">
            <span>所有文章</span>
            <span class="c-link-more__arrow">→</span>
          </NuxtLink>
        </div>
      </div>

      <ul class="p-home__journal-grid">
        <li v-for="item in journalItems" :key="item.id">
          <NuxtLink
            class="c-card"
            :to="{
              name: 'articles-categoryId-id',
              params: { categoryId: 'all', id: item.id },
            }"
          >
            <div class="c-card__media">
              <div class="c-figure">
                <img :src="item.main_image" :alt="item.title" :title="item.title" />
              </div>
            </div>
            <div class="c-card__meta">
              <span class="c-tag">{{ item.category }}</span>
            </div>
            <h3 class="c-card__title">{{ item.title }}</h3>
            <p class="c-card__desc">{{ item.sub_title }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
/** 首頁：資訊專欄 */
const props = defineProps({
  data: { type: Object, required: true },
});

const journalItems = computed(() => (props.data.items ?? []).slice(0, 3));
</script>

<style lang="scss" scoped>
.p-home {
  // ------------------------------------------------------------ 資訊專欄
  &__journal-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-7;

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
