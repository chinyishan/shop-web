<template>
  <div class="l-app" :class="{ 'l-app--lock-scroll': lockScroll }">
    <MainHeader />
    <div class="l-app__main" :class="{ 'l-app__main--fill': fill }">
      <slot />
      <GoTop />
    </div>
    <MainFooter class="l-app__footer" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** 主內容撐滿頁首與頁尾之間的高度 */
  fill?: boolean;
}>();

const menuOpen = useMobileMenu();
const { width } = useWindowSize();

// 手機版展開選單時鎖住背景捲動
const lockScroll = computed(() => menuOpen.value && width.value < 768);
</script>

<style lang="scss">
.l-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $surface;

  &--lock-scroll {
    overflow-y: hidden;
  }

  &__main--fill {
    height: 100%;
  }

  &__footer {
    margin-top: auto;
  }
}
</style>
