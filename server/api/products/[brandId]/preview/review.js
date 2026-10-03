export default defineEventHandler((event) => {
  const brandId = getRouterParam(event, "brandId");
  const reviews = mockReviewList(brandId);

  // 預覽頁需要捲動到指定評論，因此一次回傳全部資料
  return mockOk(mockPaginate(reviews, { page: 1, per_page: reviews.length }));
});
