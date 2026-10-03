export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const query = getQuery(event);
  const article = mockArticleById(id);

  if (!article) return mockOk({ article: null, prev: null, next: null });

  return mockOk({
    article: mockArticleDetail(article),
    ...mockArticleNavigation(article, query.category_id ?? null),
  });
});
