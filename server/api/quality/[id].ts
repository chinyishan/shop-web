export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  return mockOk(mockQualityById(id));
});
