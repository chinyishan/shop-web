<template>
  <p class="c-price" :class="sizeClass" v-if="value !== null && value !== undefined">
    <span class="c-price__now">{{ formatPrice(value) }}</span>
    <span class="c-price__origin" v-if="origin">{{ formatPrice(origin) }}</span>
  </p>
</template>

<script setup>
const props = defineProps({
  value: { type: [Number, String], default: null },
  origin: { type: [Number, String], default: null },
  size: { type: String, default: "md" },
});

const sizeClass = computed(() =>
  props.size === "md" ? null : `c-price--${props.size}`
);
</script>
