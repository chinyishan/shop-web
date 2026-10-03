export default defineEventHandler((event) => {
  const query = getQuery(event);

  const filtered = mockFilterProducts(mockProductList(), query);

  const items = filtered.map((product) => ({
    ...mockProductCard(product),
    image: product.image,
  }));

  return mockOk(mockPaginate(items, query, 15));
});
