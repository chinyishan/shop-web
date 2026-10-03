export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const article = mockArticleById(id);

  if (!article) return mockOk({ article: null, prev: null, next: null });

  return mockOk({
    article: mockArticleDetail(article),
    ...mockArticleNavigation(article),
  });
});
