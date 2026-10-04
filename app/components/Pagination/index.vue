<template>
  <div class="c-pager">
    <el-pagination
      class="c-pager__inner"
      :current-page="propPageInfo.currentPage"
      :page-size="propPageInfo.perPage"
      :total="propPageInfo.total ?? 0"
      size=""
      layout="prev, pager, next"
      @current-change="clickHandler"
    />
  </div>
</template>

<script setup>
defineProps({
  propPageInfo: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(["clickHandler"]);

const clickHandler = (currentPage) => {
  emit("clickHandler", { page: currentPage.toString() });
};
</script>

<style lang="scss" scoped>
.c-pager {
  &__inner {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  :deep(.btn-prev),
  :deep(.btn-next) {
    @include size(40px);
    margin: 0;
    border: 1px solid $primary-100;
    border-radius: $radius-pill;
    background-color: transparent;
    color: $primary;
    transition: background-color $duration $ease, border-color $duration $ease,
      color $duration $ease;

    &:hover:not(:disabled) {
      border-color: $primary;
      background-color: $primary;
      color: $on-primary;
    }

    &:disabled {
      border-color: $gray-200;
      color: $gray-300;
      cursor: not-allowed;
    }
  }

  :deep(.el-pager) {
    display: flex;
    align-items: center;
    gap: $space-1;

    .number {
      min-width: 36px;
      height: 36px;
      margin: 0;
      border-radius: $radius-pill;
      background: transparent;
      color: $content;
      font-size: $fz-sm;
      font-weight: 400;
      letter-spacing: $ls-body;
      transition: color $duration $ease, background-color $duration $ease;

      &:hover {
        color: $primary;
      }

      &.is-active {
        background-color: $primary;
        color: $on-primary;
        font-weight: 500;
      }
    }

    .more {
      background: transparent;
      color: $gray-300;
    }
  }
}
</style>
