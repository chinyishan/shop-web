export default defineEventHandler((event) => {
  const brandId = getRouterParam(event, "brandId");

  return mockOk({
    editor: { content: { zh_TW: mockPopularHtml(brandId) } },
  });
});
