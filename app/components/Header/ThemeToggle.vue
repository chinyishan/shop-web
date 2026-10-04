<template>
  <button
    type="button"
    class="l-header__theme"
    :aria-label="label"
    :aria-pressed="isDark"
    :title="label"
    @click="toggle"
  >
    <!-- 伺服器端不知道使用者的主題，圖示只在瀏覽器端顯示 -->
    <ClientOnly>
      <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1"
          stroke-linecap="round"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" stroke-linejoin="round" />
      </svg>
    </ClientOnly>
  </button>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme();
const label = computed(() => (isDark.value ? "切換為淺色模式" : "切換為深色模式"));
</script>

<style lang="scss" scoped>
.l-header {
  &__theme {
    display: flex;
    align-items: center;
    justify-content: center;
    @include size(26px);
    padding: 0;
    border: 0;
    background: none;
    color: $text;
    cursor: pointer;
    transition: color $duration $ease;

    svg {
      @include size(24px);
      display: block;
    }

    &:hover {
      color: $primary;
    }

    &:focus-visible {
      outline: 2px solid $primary;
      outline-offset: 3px;
      border-radius: $radius-sm;
    }
  }
}
</style>
