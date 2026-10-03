import type { PageKey, SeoMeta } from "#shared/types/site";

/**
 * 設定頁面 SEO，優先順序：override > 頁面設定 > 全站設定。
 * page 可以是後台頁面代號，也可以直接傳入 SEO 物件；沒有給就用首頁設定。
 */
export function useSeo(page: PageKey | SeoMeta | undefined = "page-index", override: SeoMeta = {}) {
  const site = useSiteConfig();
  const pageSeo: SeoMeta = typeof page === "object" ? page : (site.page(page)?.attribute_data.seo ?? {});
  const pick = (key: keyof SeoMeta) => override[key] ?? pageSeo[key] ?? site.seo.value[key];

  useHead({
    title: pick("title"),
    meta: [{ name: "keywords", content: pick("keywords") }],
  });
  useSeoMeta({
    title: pick("title"),
    ogTitle: pick("title"),
    description: pick("description"),
    ogDescription: pick("description"),
    ogUrl: pick("url"),
  });
}
