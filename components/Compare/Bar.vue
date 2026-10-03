<template>
  <Transition name="c-compare-bar">
    <div class="c-compare-bar" v-if="visible">
      <div class="c-compare-bar__inner">
        <p class="c-compare-bar__label">
          比較清單
          <span>{{ compare.count }} / {{ compare.maxItems }}</span>
        </p>

        <ul class="c-compare-bar__list">
          <li class="c-compare-bar__item" v-for="item in compare.items" :key="item.id">
            <img :src="item.main_image" :alt="item.name" :title="item.name" />
            <button
              type="button"
              class="c-compare-bar__remove"
              aria-label="移除"
              @click="compare.remove(item.id)"
            >
              ✕
            </button>
          </li>
        </ul>

        <div class="c-compare-bar__actions">
          <button type="button" class="c-compare-bar__clear" @click="compare.clear()">
            清除
          </button>
          <NuxtLink class="c-btn c-btn--sm" to="/compare">開始比較</NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const compare = useCompareStore();
const route = useRoute();

const isComparePage = computed(() => route.path === "/compare");
const visible = computed(() => !compare.isEmpty && !isComparePage.value);

// 比較列是固定在底部的，撐開 body 避免蓋住頁尾
watch(
  visible,
  (value) => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("has-compare-bar", value);
  },
  { immediate: true }
);

onUnmounted(() => {
  document.body.classList.remove("has-compare-bar");
});
</script>

<style lang="scss" scoped>
.c-compare-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  border-top: 1px solid $primary-100;
  background-color: rgba($white, 0.98);
  box-shadow: 0 -6px 24px rgba($primary, 0.08);

  &__inner {
    @include container($container-wide);
    display: flex;
    align-items: center;
    gap: $space-5;
    padding-top: $space-3;
    padding-bottom: $space-3;

    @include md() {
      gap: $space-3;
    }
  }

  &__label {
    flex-shrink: 0;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;

    span {
      margin-left: $space-2;
      color: $primary;
      font-weight: 600;
    }

    @include md() {
      display: none;
    }
  }

  &__list {
    display: flex;
    flex: 1;
    gap: $space-3;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    position: relative;
    flex-shrink: 0;
    @include size(56px);
    border: 1px solid $gray-200;
    border-radius: $radius-md;
    background-color: $primary-50;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: $space-1;
      box-sizing: border-box;
    }
  }

  &__remove {
    position: absolute;
    top: 0;
    right: 0;
    @include size(18px);
    padding: 0;
    border-bottom-left-radius: $radius-sm;
    background-color: rgba($primary-darker, 0.6);
    color: $white;
    font-size: 10px;
    line-height: 18px;
    cursor: pointer;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-3;
    flex-shrink: 0;
  }

  &__clear {
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }
}

.c-compare-bar-enter-active,
.c-compare-bar-leave-active {
  transition: transform $duration $ease, opacity $duration $ease;
}

.c-compare-bar-enter-from,
.c-compare-bar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
