export default defineEventHandler((event) => {
  const query = getQuery(event);

  // QR Code 網址的最後一段視為商品編號
  const productId = (query.url ?? "").toString().split("/").filter(Boolean).pop();
  const product = mockProductById(productId) ?? mockProductList()[0];

  return mockOk({ id: product.id, brand_id: product.brand_id });
});
