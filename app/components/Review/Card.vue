<template>
  <li class="c-review">
    <div class="c-review__avatar">
      <img :src="image" :alt="user" :title="user" >
    </div>
    <div class="c-review__body">
      <NuxtLink v-if="productLink" class="c-review__product" :to="productLink">
        {{ productName }}
      </NuxtLink>
      <p class="c-review__text">{{ content }}</p>
      <p class="c-review__person">
        {{ user }}<Separator />{{ company }}<Separator />{{ career }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
/** 使用者好評卡片（樣式見 assets/scss/components/_page.scss） */
defineProps<{
  user: string;
  image: string;
  content: string;
  company?: string;
  career?: string;
  productName?: string;
  productLink?: string;
}>();
</script>
