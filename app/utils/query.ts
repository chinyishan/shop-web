import type { Router } from "vue-router";

type QueryValue = string | number | boolean | null | undefined;

/** 移除 null、undefined 與空字串，避免送出 ?key= 這類空參數 */
export const cleanParams = <T extends Record<string, QueryValue>>(params: T) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== ""),
  ) as Partial<T>;

/** 以 params 取代目前網址的 query（不新增歷史紀錄） */
export const replaceQuery = (router: Router, params: Record<string, QueryValue>) =>
  router.replace({ query: cleanParams(params) as Record<string, string> });
