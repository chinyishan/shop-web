<template>
  <ProductView :product-info="productInfo" />
</template>

<script setup>
const route = useRoute();
const { brandId, id } = route.params;

const [{ data: pageInfo }, { data: productInfo }] = await Promise.all([
  useFetch(`/api/products/${brandId}/page-products`, { transform: (res) => res.result }),
  useFetch(`/api/products/${brandId}/product/preview/${id}`, { transform: (res) => res.result }),
]);

if (!pageInfo.value || !productInfo.value) {
  throw createError({ statusCode: 404, message: "找不到商品" });
}

useSeo(pageInfo.value.modules?.seo, productInfo.value.attribute_data?.seo);
useBreadcrumbTitle(() => productInfo.value?.attribute_data?.product_header?.name);
</script>
