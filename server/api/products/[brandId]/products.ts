export default defineEventHandler((event) => {
  const brandId = getRouterParam(event, "brandId");
  const query = getQuery(event);

  const filtered = mockFilterProducts(mockProductList(brandId), query);

  return mockOk(mockPaginate(filtered.map(mockProductCard), query, 12));
});
