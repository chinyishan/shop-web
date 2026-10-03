/** 所有 /api 端點的共用回應格式 */
export interface ApiResponse<T> {
  success: boolean;
  result: T;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

/** 下拉、分頁籤等選項 */
export interface Option<K = number | string> {
  key: K;
  label: string;
}
