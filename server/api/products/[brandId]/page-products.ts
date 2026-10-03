export default defineEventHandler((event) => {
  const brandId = getRouterParam(event, "brandId");

  return mockOk(mockProductPage(brandId) ?? null);
});
