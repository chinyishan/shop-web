export default defineEventHandler((event) => {
  const query = getQuery(event);

  return mockOk(mockPaginate(mockQuestionList(query.category_id ?? null), query, 10));
});
