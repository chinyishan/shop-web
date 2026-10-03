export default defineEventHandler((event) => {
  const brandId = getRouterParam(event, "brandId");
  const query = getQuery(event);

  return mockOk(mockPaginate(mockReviewList(brandId), query, 5));
});
