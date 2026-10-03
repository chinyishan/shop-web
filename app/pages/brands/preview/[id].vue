<template>
  <BrandView :info="pageInfo" />
</template>

<script setup>
import { useRoute } from "vue-router";
import _ from "lodash";

const route = useRoute();
const { id } = route.params;

const { data } = await useFetch(`/api/brand/preview/${id}`);
const pageInfo = ref(_.get(data, "value.result") ?? {});

setSEO("page-brands", pageInfo.value.modules?.seo);
</script>
