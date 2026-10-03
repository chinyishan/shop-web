<template>
  <section class="c-section p-home__voices" >
    <div class="c-section__inner">
      <div class="c-section__head">
        <div>
          <span class="c-section__eyebrow">Voices</span>
          <h2 class="c-section__title">使用者的話</h2>
        </div>
      </div>

      <ul class="p-home__voice-grid">
        <li class="p-home__voice" v-for="item in voiceItems" :key="item.id">
          <blockquote class="p-home__voice-text">{{ item.content }}</blockquote>
          <div class="p-home__voice-person">
            <div class="p-home__voice-avatar">
              <img :src="item.image" :alt="item.user_name" :title="item.user_name" />
            </div>
            <div>
              <p class="p-home__voice-name">{{ item.user_name }}</p>
              <p class="p-home__voice-job">
                {{ item.company }}・{{ item.career }}
              </p>
            </div>
          </div>
          <NuxtLink
            class="p-home__voice-product"
            :to="`/products/${item.brand_id}/product/${item.product_id}`"
          >
            {{ item.product_name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
/** 首頁：好評回饋 */
const props = defineProps({
  data: { type: Object, required: true },
});

const voiceItems = computed(() => (props.data.items ?? []).slice(0, 3));
</script>

<style lang="scss" scoped>
.p-home {
  // ------------------------------------------------------------ 好評回饋
  &__voice-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-7;

    @include tb() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  &__voice {
    display: flex;
    flex-direction: column;
    padding-top: $space-5;
    border-top: 1px solid $primary-100;
  }

  &__voice-text {
    color: $text;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    @include line-clamp(5);
  }

  &__voice-person {
    display: flex;
    align-items: center;
    gap: $space-3;
    margin-top: auto; // 讓各欄的人物資訊對齊底部
    padding-top: $space-5;
  }

  &__voice-avatar {
    flex-shrink: 0;
    @include size(48px);
    border-radius: $radius-pill;
    overflow: hidden;
    background-color: $primary-50;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__voice-name {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 500;
    letter-spacing: $ls-body;
  }

  &__voice-job {
    margin-top: 2px;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__voice-product {
    margin-top: $space-4;
    color: $primary;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    transition: color $duration $ease;

    &:hover {
      color: $primary-dark;
    }
  }
}
</style>
