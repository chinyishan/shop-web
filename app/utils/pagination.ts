import type { PaginationMeta } from "#shared/types/api";

/** 把 API 的分頁 meta 轉成 <Pagination> 需要的格式 */
export const toPageInfo = (meta: PaginationMeta | undefined, perPage = 10) => ({
  currentPage: meta?.current_page ?? 1,
  perPage: meta?.per_page ?? perPage,
  total: meta?.total ?? 0,
});
