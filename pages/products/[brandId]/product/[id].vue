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

const { data } = await useFetch(`/api/products/${brandId}/product/${id}`);
const productInfo = ref(_.get(data, "value.result"));

// 沒有品牌資訊回首頁；商品不屬於此品牌則回商品列表
if (!pageData.value) {
  await navigateTo("/");
} else if (
  !productInfo.value ||
  productInfo.value.attribute_data.product_header.brand_id !== Number(brandId)
) {
  await navigateTo({
    name: "products-brandId-detail",
    params: { brandId: brandId },
  });
}

setSEO(pageInfo.value.modules?.seo, {
  ...productInfo.value.attribute_data?.seo,
  title:
    productInfo.value.attribute_data?.seo.title ??
    productInfo.value.attribute_data?.product_header.name,
  keyword:
    productInfo.value.attribute_data?.seo.title ??
    productInfo.value.attribute_data?.product_header.name,
});

// 放入產品資訊讓麵包屑可以取用
options.breadcrumb.productsInfo.push({
  key: productInfo.value.id,
  label: productInfo.value.attribute_data?.product_header.name,
});
</script>
