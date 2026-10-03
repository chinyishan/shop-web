import _ from "lodash";
export const isNumeric = (value) => {
  if (_.isNumber(value)) {
    return true;
  }
  if (_.isString(value) && !isNaN(value - parseFloat(value))) {
    return true;
  }
  return false;
};

export function setSEO(page = "page-index", seoData = {}) {
  const webStore = useWebStore();

  // 全域網站設定
  let webConfigSeo = _.get(webStore, "configs.attribute_data.seo");
  // 頁面網站設定
  let pageSeo =
    typeof page == "object"
      ? page
      : _.get(webStore.pages[page], "attribute_data.seo") ?? {};
  // 如果有自己帶的SEO資訊 則使用 階層為
  // seoData > 頁面資訊 > 全域頁面資訊

  useHead({
    title: seoData.title ?? pageSeo.title ?? webConfigSeo.title,
  });
  useSeoMeta({
    keywords: seoData.keywords ?? pageSeo.keywords ?? webConfigSeo.keywords,
    title: seoData.title ?? pageSeo.title ?? webConfigSeo.title,
    ogTitle: seoData.title ?? pageSeo.title ?? webConfigSeo.title,
    url: seoData.url ?? pageSeo.url ?? webConfigSeo.url,
    ogUrl: seoData.url ?? pageSeo.url ?? webConfigSeo.url,
    description:
      seoData.description ?? pageSeo.description ?? webConfigSeo.description,
    ogDescription:
      seoData.description ?? pageSeo.description ?? webConfigSeo.description,
  });
  // }
}

export function setParamsToRoute(router, params) {
  let query = {};
  Object.keys(params).forEach((key) => {
    if (!_.isNil(params[key]) && params[key] !== "") {
      query[key] = params[key];
    }
  });
  router.replace({ query: { ...query } });
  return;
}

/** 金額格式：1280 → NT$ 1,280 */
export const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") return "";
  return `NT$ ${Number(value).toLocaleString("zh-TW")}`;
};

export const cleanParams = (params) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
  );
};
