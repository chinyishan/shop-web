import type { ApiResponse, Paginated } from "#shared/types/api";
import type { SeoMeta } from "#shared/types/site";



export const mockOk = <T>(result: T): ApiResponse<T> => ({ success: true, result });

export const mockPaginate = <T>(
  items: T[],
  query: Record<string, unknown> = {},
  defaultPerPage = 10,
): Paginated<T> => {
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

export const mockSeo = (title: string, description: string): Required<SeoMeta> => ({
  title,
  description,
  keywords: `好日補給,VITADAY,保健食品,${title}`,
  url: "https://vitaday.example.com",
});

export const mockBanner = (image: string, imageM: string | null | undefined, alt: string) => ({
  image,
  image_m: imageM ?? image,
  url: "",
  alt,
  new_page: false,
});
