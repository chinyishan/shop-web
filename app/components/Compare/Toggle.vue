<template>
  <ClientOnly>
    <button
      type="button"
      v-bind="$attrs"
      class="c-compare-toggle"
      :class="{ 'c-compare-toggle--is-active': isActive }"
      :aria-label="isActive ? '移出比較' : '加入比較'"
      @click.prevent.stop="onToggle"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M4 8h12M12 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 16H8M12 20l-4-4 4-4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </ClientOnly>
</template>

<script setup>
import { ElMessage } from "element-plus";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const compare = useCompareStore();
const isActive = computed(() => compare.has(props.product.id));

const onToggle = () => {
  const result = compare.toggle(props.product);

  if (result === "full") {
    ElMessage.warning(`最多比較 ${compare.maxItems} 項商品`);
    return;
  }
  ElMessage.success(result === "added" ? "已加入比較" : "已移出比較");
};
</script>

<style lang="scss" scoped>
.c-compare-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  @include size(36px);
  padding: 0;
  border: 1px solid $gray-200;
  border-radius: $radius-pill;
  background-color: alpha($white, 0.9);
  color: $muted;
  cursor: pointer;
  transition: color $duration $ease, border-color $duration $ease;

  svg {
    @include size(18px);
  }

  &:hover {
    border-color: $primary-300;
    color: $primary;
  }

  &--is-active {
    border-color: $primary;
    background-color: $primary;
    color: $on-primary;
  }
}
</style>
