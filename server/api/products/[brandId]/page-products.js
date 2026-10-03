export default defineEventHandler((event) => {
  const brandId = getRouterParam(event, "brandId");
  const page = mockProductPage(brandId);

  if (!page) return null;

  // 商品專區與商品單頁分別讀取根層級與 result 層級，兩種都提供
  return { success: true, ...page, result: page };
});
