<template>
  <BrandView :info="pageInfo" />
</template>

<script setup>
import { useRoute } from "vue-router";
import _ from "lodash";

const route = useRoute();
const { id } = route.params;

const { data } = await useFetch(`/api/brand/${id}`);
const pageInfo = ref(_.get(data, "value"));

// 沒有品牌資料就回首頁
if (!pageInfo.value) {
  await navigateTo("/");
}

setSEO("page-brands", pageInfo.value.modules?.seo);
</script>
