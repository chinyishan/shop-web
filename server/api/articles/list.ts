export default defineEventHandler((event) => {
  const query = getQuery(event);
  const articles = mockArticleList(query.category_id ?? null).map(mockArticleCard);

  return mockOk(mockPaginate(articles, query, 9));
});
