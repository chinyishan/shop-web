<template>
  <div class="c-stepper" :class="{ 'c-stepper--sm': size === 'sm' }">
    <button
      type="button"
      class="c-stepper__btn"
      :disabled="modelValue <= min"
      aria-label="減少數量"
      @click="onStep(-1)"
    >
      −
    </button>
    <span class="c-stepper__value">{{ modelValue }}</span>
    <button
      type="button"
      class="c-stepper__btn"
      :disabled="modelValue >= max"
      aria-label="增加數量"
      @click="onStep(1)"
    >
      ＋
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 99 },
  size: { type: String, default: "md" },
});

const emit = defineEmits(["update:modelValue", "change"]);

const onStep = (step) => {
  const next = Math.min(Math.max(props.modelValue + step, props.min), props.max);
  if (next === props.modelValue) return;

  emit("update:modelValue", next);
  emit("change", next);
};
</script>
