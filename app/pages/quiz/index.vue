<template>
  <div class="l-page p-quiz">
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Find your supplement</span>
      <h1 class="c-page-head__title">保健需求測驗</h1>
      <p class="c-page-head__lead">
        回答四個問題，營養師團隊的配方邏輯幫你挑出適合的組合。
      </p>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner c-section__inner--narrow">
        <!-- 問題 -->
        <div v-if="!finished" class="p-quiz__card">
          <div class="p-quiz__progress">
            <span class="p-quiz__step">
              {{ stepIndex + 1 }} / {{ questions.length }}
            </span>
            <div class="p-quiz__bar">
              <span class="p-quiz__bar-fill" :style="{ width: `${progress}%` }" />
            </div>
          </div>

          <h2 class="p-quiz__question">{{ currentQuestion.title }}</h2>
          <p v-if="currentQuestion.hint" class="p-quiz__hint">
            {{ currentQuestion.hint }}
          </p>

          <ul class="p-quiz__options">
            <li v-for="option in currentQuestion.options" :key="String(option.value)">
              <button
                type="button"
                class="p-quiz__option"
                :class="{
                  'p-quiz__option--is-active':
                    answers[currentQuestion.key] === option.value,
                }"
                @click="onSelect(option.value)"
              >
                {{ option.label }}
              </button>
            </li>
          </ul>

          <div class="p-quiz__actions">
            <button
              v-if="stepIndex > 0"
              type="button"
              class="p-quiz__back"
              @click="stepIndex--"
            >
              ← 上一題
            </button>
          </div>
        </div>

        <!-- 結果 -->
        <QuizResult v-else :results="results" :summary="summary" @restart="onRestart" />
      </div>
    </section>
  </div>
</template>

<script setup>
useSeo("page-index", {
  title: "保健需求測驗",
  description: "回答幾個問題，找出適合你的保健組合。",
});

/** 題目選項來自商品資源 API */
const { data: resourceData } = await useFetch("/api/products/resource");
const resource = computed(() => resourceData.value?.result ?? {});

const questions = computed(() => [
  {
    key: "effect",
    title: "最近最想改善哪個方向？",
    hint: "選一個最在意的，之後還能調整。",
    options: (resource.value.effects ?? []).map((tag) => ({
      label: tag.label,
      value: tag.key,
    })),
  },
  {
    key: "audience",
    title: "想找給誰補充？",
    options: (resource.value.audiences ?? []).map((tag) => ({
      label: tag.label,
      value: tag.key,
    })),
  },
  {
    key: "budget",
    title: "單次預算大概多少？",
    options: [
      { label: "NT$ 1,000 以下", value: "low" },
      { label: "NT$ 1,000 - 2,500", value: "mid" },
      { label: "NT$ 2,500 以上", value: "high" },
    ],
  },
  {
    key: "vegan",
    title: "有素食需求嗎？",
    options: [
      { label: "需要素食可食", value: true },
      { label: "沒有特別限制", value: false },
    ],
  },
]);

const stepIndex = ref(0);
const answers = ref({});
const finished = ref(false);
const results = ref([]);

const currentQuestion = computed(() => questions.value[stepIndex.value] ?? {});
const progress = computed(
  () => ((stepIndex.value + 1) / questions.value.length) * 100
);

const summary = computed(() => {
  const effect = (resource.value.effects ?? []).find(
    (tag) => tag.key === answers.value.effect
  )?.label;
  const audience = (resource.value.audiences ?? []).find(
    (tag) => tag.key === answers.value.audience
  )?.label;
  const budget = { low: "1,000 元以下", mid: "1,000-2,500 元", high: "2,500 元以上" }[
    answers.value.budget
  ];

  return `${audience ?? "你"}・${effect ?? "日常保健"}・預算 ${budget ?? "不限"}${
    answers.value.vegan ? "・素食可食" : ""
  }`;
});

const onSelect = (value) => {
  answers.value[currentQuestion.value.key] = value;

  if (stepIndex.value < questions.value.length - 1) {
    stepIndex.value += 1;
    return;
  }
  fetchResults();
};

const fetchResults = async () => {
  const { effect, audience, budget, vegan } = answers.value;
  const res = await $fetch("/api/products/recommend", { query: { effect, audience, budget, vegan } });
  results.value = res.result?.data ?? [];
  finished.value = true;
};

const onRestart = () => {
  answers.value = {};
  stepIndex.value = 0;
  results.value = [];
  finished.value = false;
};
</script>

<style lang="scss" scoped>
.p-quiz {
  background-color: $surface;

  // ------------------------------------------------------------ 題目
  &__card {
    padding: $space-8;
    border: 1px solid $primary-100;
    border-radius: $radius-lg;
    background-color: $primary-50;

    @include md() {
      padding: $space-5;
    }
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-bottom: $space-6;
  }

  &__step {
    color: $primary;
    font-size: $fz-xs;
    font-weight: 600;
    letter-spacing: $ls-eyebrow;
  }

  &__bar {
    flex: 1;
    height: 4px;
    border-radius: $radius-pill;
    background-color: $primary-100;
    overflow: hidden;
  }

  &__bar-fill {
    display: block;
    height: 100%;
    background-color: $primary;
    transition: width $duration $ease;
  }

  &__question {
    color: $ink;
    font-size: $fz-h3;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;
    text-align: left;

    @include md() {
      font-size: $fz-body-lg;
    }
  }

  &__hint {
    margin-top: $space-3;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-3;
    margin-top: $space-6;

    @include sm() {
      grid-template-columns: 1fr;
    }
  }

  &__option {
    width: 100%;
    padding: $space-4;
    border: 1px solid $gray-200;
    border-radius: $radius-md;
    background-color: $white;
    color: $text;
    font-size: $fz-body;
    letter-spacing: $ls-body;
    text-align: left;
    cursor: pointer;
    transition: border-color $duration $ease, background-color $duration $ease,
      color $duration $ease;

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

  &__actions {
    margin-top: $space-5;
  }

  &__back {
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

}
</style>
