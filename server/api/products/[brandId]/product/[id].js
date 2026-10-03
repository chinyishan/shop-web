export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const product = mockProductById(id);

  if (!product) return mockOk(null);

  return mockOk(mockProductDetail(product));
});
