/**
 * 商品 QR Code 短網址：/product/:productId/:id
 * 直接在伺服器端 302 到商品頁，找不到商品就回首頁。
 */
export default defineEventHandler((event) => {
  const product = mockProductById(getRouterParam(event, "id"));
  const target = product ? `/products/${product.brand_id}/product/${product.id}` : "/";

  return sendRedirect(event, target, 302);
});
