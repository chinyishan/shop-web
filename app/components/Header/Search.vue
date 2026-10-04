<template>
  <div class="l-header__search" :class="{ 'l-header__search--is-open': searchOpen }">
    <input
      ref="searchInputRef"
      v-model="searchText"
      class="l-header__search-input"
      type="text"
      placeholder="輸入關鍵字"
      @keyup.enter="onSearch"
    >
    <button type="button" class="l-header__search-btn" aria-label="搜尋" title="搜尋" @click="onSearch">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
/** 頁首搜尋：第一次點擊展開輸入框，再次點擊或按 Enter 送出 */
const route = useRoute();
const router = useRouter();

const searchText = ref(route.query.search as string | undefined);
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchOpen = ref(false);

const onSearch = () => {
  if (!searchOpen.value) {
    searchOpen.value = true;
    nextTick(() => searchInputRef.value?.focus());
    return;
  }

  searchOpen.value = false;
  router.push({ name: "search", query: { search: searchText.value ?? "" } });
};

// 換頁時收合
watch(
  () => route.fullPath,
  () => {
    searchOpen.value = false;
  },
);
</script>

<style lang="scss" scoped>
.l-header {
  // ------------------------------------------------------------ 搜尋
  &__search {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__search-input {
    width: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid transparent;
    background: transparent;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    outline: none;
    opacity: 0;
    transition: width $duration $ease, opacity $duration $ease;
  }

  &__search--is-open &__search-input {
    width: 180px;
    padding: $space-2 0;
    border-bottom-color: $primary-100;
    opacity: 1;

    @include md() {
      width: 130px;
    }
  }

  &__search-btn {
    @include size(24px);
    padding: 0;
    background: none;
    cursor: pointer;

    color: $text;
    transition: color $duration $ease;

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    &:hover {
      color: $primary;
    }
  }
}
</style>
