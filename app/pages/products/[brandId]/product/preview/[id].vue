<template>
  <ProductView :productInfo="productInfo" />
</template>

<script setup>
import { useRoute } from "vue-router";
import _ from "lodash";

const route = useRoute();
const { options } = useResourceStore();
const { brandId, id } = route.params;

const { data: pageData } = await useFetch(`/api/products/${brandId}/page-products`);
const pageInfo = ref(_.get(pageData, "value.result"));

const { data: productData } = await useFetch(
  `/api/products/${brandId}/product/preview/${id}`
);
const productInfo = ref(_.get(productData, "value.result"));

setSEO(pageInfo.value.modules?.seo, productInfo.value.attribute_data?.seo);

// 放入產品資訊讓麵包屑可以取用
options.breadcrumb.productsInfo.push({
  key: productInfo.value.id,
  label: productInfo.value.attribute_data?.product_header.name,
});
</script>
