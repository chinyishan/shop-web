<template>
  <ProductView :product-info="productInfo" />
</template>

<script setup>
const route = useRoute();
const { brandId, id } = route.params;

const [{ data: pageInfo }, { data: productInfo }] = await Promise.all([
  useFetch(`/api/products/${brandId}/page-products`, { transform: (res) => res.result }),
  useFetch(`/api/products/${brandId}/product/${id}`, { transform: (res) => res.result }),
]);

const header = computed(() => productInfo.value?.attribute_data?.product_header);

if (!pageInfo.value || !productInfo.value) {
  throw createError({ statusCode: 404, message: "找不到商品" });
}

// 商品存在但網址的品牌不對：永久導向正確網址
if (header.value.brand_id !== Number(brandId)) {
  await navigateTo(`/products/${header.value.brand_id}/product/${id}`, { redirectCode: 301 });
}

const seo = productInfo.value.attribute_data?.seo;
useSeo(pageInfo.value.modules?.seo, {
  ...seo,
  title: seo?.title ?? header.value.name,
  keywords: seo?.keywords ?? header.value.name,
});
useBreadcrumbTitle(() => header.value?.name);
</script>
