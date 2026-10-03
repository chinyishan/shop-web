<template>
  <div class="l-header__search" :class="{ 'l-header__search--is-open': searchOpen }">
    <input
      class="l-header__search-input"
      type="text"
      placeholder="輸入關鍵字"
      v-model="searchText"
      ref="searchInputRef"
      @keyup.enter="onSearch"
    />
    <button type="button" class="l-header__search-btn" @click="onSearch">
      <img src="@/assets/images/picture/search-icon-1.png" alt="搜尋" title="搜尋" />
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

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
