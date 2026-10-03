export const mockOk = (result) => ({ success: true, result });

export const mockPaginate = (items, query = {}, defaultPerPage = 10) => {
  const perPage = Number(query.per_page) > 0 ? Number(query.per_page) : defaultPerPage;
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const start = (page - 1) * perPage;

  return {
    data: items.slice(start, start + perPage),
    meta: {
      current_page: page,
      per_page: perPage,
      total: items.length,
      last_page: Math.max(1, Math.ceil(items.length / perPage)),
    },
  };
};

export const mockSeo = (title, description) => ({
  title,
  description,
  keywords: `HealthLab,健康實驗室,保健食品,${title}`,
  url: "https://healthlab.example.com",
});

export const mockBanner = (image, imageM, alt) => ({
  image,
  image_m: imageM ?? image,
  url: "",
  alt,
  new_page: false,
});
