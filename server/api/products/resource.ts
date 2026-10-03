export default defineEventHandler(() => {
  const products = mockProductList();
  const prices = products.map((product) => product.price);

  return mockOk({
    effects: mockEffectTags(),
    audiences: mockAudienceTags(),
    sorts: mockSortOptions(),
    price_range: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
  });
});
