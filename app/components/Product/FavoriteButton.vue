<template>
  <ClientOnly>
    <button
      type="button"
      v-bind="$attrs"
      class="c-favorite"
      :class="{ 'c-favorite--is-active': isActive }"
      :aria-label="isActive ? '取消收藏' : '加入收藏'"
      @click.prevent.stop="onToggle"
    >
      <svg viewBox="0 0 24 24" :fill="isActive ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.6">
        <path
          d="M12 20s-7-4.3-7-9.2A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.8c0 4.9-7 9.2-7 9.2z"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </ClientOnly>
</template>

<script setup>
import { ElMessage } from "element-plus";

// ClientOnly 當根節點時屬性不會自動落下，改成手動綁定
defineOptions({ inheritAttrs: false });

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const wishlist = useWishlistStore();
const isActive = computed(() => wishlist.has(props.product.id));

const onToggle = () => {
  const added = wishlist.toggle(props.product);
  ElMessage.success(added ? "已加入收藏" : "已取消收藏");
};
</script>

<style lang="scss" scoped>
.c-favorite {
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
    @include size(20px);
  }

  &:hover {
    border-color: $primary-300;
    color: $primary;
  }

  &--is-active {
    border-color: $primary;
    color: $primary;
  }
}
</style>
