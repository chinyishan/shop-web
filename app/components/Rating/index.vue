<template>
  <p class="c-rating" v-if="value">
    <span class="c-rating__stars" role="img" :aria-label="`評分 ${value} 分`">
      <span class="c-rating__fill" :style="{ width: `${percent}%` }" aria-hidden="true"
        >★★★★★</span
      >
      <span class="c-rating__base" aria-hidden="true">★★★★★</span>
    </span>
    <span class="c-rating__value">{{ value.toFixed(1) }}</span>
    <span class="c-rating__count" v-if="count">（{{ count }}）</span>
  </p>
</template>

<script setup>
const props = defineProps({
  value: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
});

const percent = computed(() => Math.min(Math.max(props.value / 5, 0), 1) * 100);
</script>

<style lang="scss" scoped>
.c-rating {
  display: flex;
  align-items: center;
  gap: $space-2;
  color: $muted;
  font-size: $fz-xs;
  letter-spacing: $ls-body;

  &__stars {
    position: relative;
    display: inline-block;
    color: $gray-300;
    font-size: $fz-sm;
    line-height: 1;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  &__base {
    visibility: hidden;
  }

  &__fill {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    color: $accent-dark;
  }

  &__value {
    color: $text;
    font-weight: 500;
  }
}
</style>
