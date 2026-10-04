import type { PageKey, SiteConfig, SystemConfigResponse } from "#shared/types/site";

const SITE_CONFIG_KEY = "site-config";
const DEFAULT_SITE_NAME = "好日補給 VITADAY";

/**
 * 取得全站設定（頁首、頁尾、導覽、各頁 SEO）。
 * 只在 app.vue 呼叫一次並 await，其他地方一律用 useSiteConfig() 讀取。
 */
export function fetchSiteConfig() {
  return useFetch("/api/system/config", {
    key: SITE_CONFIG_KEY,
    transform: ([config, navbar, pages]: SystemConfigResponse): SiteConfig => ({
      ...config.result.attribute_data,
      navbar: navbar.result,
      pages: pages.result,
    }),
  });
}

export function useSiteConfig() {
  const { data } = useNuxtData<SiteConfig>(SITE_CONFIG_KEY);

  const siteName = computed(() => data.value?.config_header.name ?? DEFAULT_SITE_NAME);
  const navbar = computed(() => data.value?.navbar ?? { brands: [], qualities: [], article_categories: [] });

  const page = (key: PageKey) => data.value?.pages[key];
  const brandLabel = (id: number | string) => navbar.value.brands.find((brand) => brand.key === Number(id))?.label;

  return {
    config: data,
    siteName,
    header: computed(() => data.value?.config_header),
    footer: computed(() => data.value?.config_footer),
    friendlyLinks: computed(() => data.value?.friendly_link.url ?? []),
    seo: computed(() => data.value?.seo ?? {}),
    navbar,
    page,
    brandLabel,
  };
}
