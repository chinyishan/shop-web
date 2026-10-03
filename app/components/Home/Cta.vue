<template>
  <section class="p-home__cta" >
    <NuxtLink
      v-for="(item, index) in data.items"
      :key="index"
      class="p-home__cta-item"
      to="/qualities/3"
    >
      <picture>
        <source :srcset="item.image" media="(min-width: 769px)" >
        <img :src="item.image_m" alt="HealthLab" title="HealthLab" >
      </picture>
    </NuxtLink>
  </section>
</template>

<script setup>
/** 首頁：底部形象帶 */
defineProps({
  data: { type: Object, required: true },
});
</script>

<style lang="scss" scoped>
.p-home {
  // ------------------------------------------------------------ 底部形象帶
  &__cta {
    display: grid;
    grid-template-columns: 1fr;
  }

  &__cta-item {
    display: block;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: auto;
      transition: transform $duration $ease;
    }

    &:hover img {
      transform: scale(1.02);
    }
  }
}
</style>
