<template>
  <div></div>
</template>
<script setup>
import { ElLoading, textProps } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
// import {}
const loadingInstance1 = ElLoading.service({
  fullscreen: true,
  customClass: "loading-text",
  text: "跳轉中",
});
// 要刪掉
const runtimeConfig = useRuntimeConfig();
const environment = runtimeConfig.public.environment;

onMounted(() => {
  let baseURL = window.location.origin;
  let params = {
    url: `${baseURL}${route.path}`,
  };

  $fetch("/api/products/qr-code-redirect", { query: params })
    .then((res) => {
      const { result: data } = res;
      if (res.success) {
        router.push({
          name: "products-brandId-product-id",
          params: {
            brandId: data.brand_id,
            id: data.id,
          },
        });
      } else {
        router.push("/");
      }
    })
    .catch(() => {
      router.push("/");
    })
    .finally(() => {
      loadingInstance1.close();
    });
});

definePageMeta({
  layout: "redirect",
});
</script>
<style>
.el-loading-spinner p {
  text-align: center;
  color: red;
}
</style>
