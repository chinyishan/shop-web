import { describe, expect, it } from "vitest";
import { formatPrice, subscribePrice } from "../../app/utils/format";
import { toPageInfo } from "../../app/utils/pagination";
import { cleanParams } from "../../app/utils/query";
import { isEmail } from "../../app/utils/validate";

describe("formatPrice", () => {
  it("加上幣別與千分位", () => {
    expect(formatPrice(1280)).toBe("NT$ 1,280");
    expect(formatPrice("2500")).toBe("NT$ 2,500");
    expect(formatPrice(0)).toBe("NT$ 0");
  });

  it("沒有值時回傳空字串", () => {
    expect(formatPrice(null)).toBe("");
    expect(formatPrice(undefined)).toBe("");
    expect(formatPrice("")).toBe("");
  });
});

describe("subscribePrice", () => {
  it("9 折後四捨五入到十位", () => {
    expect(subscribePrice(1350)).toBe(1220); // 1215 → 1220
    expect(subscribePrice(490)).toBe(440); // 441 → 440
  });
});

describe("cleanParams", () => {
  it("移除 null、undefined 與空字串，保留 0 與 false", () => {
    expect(cleanParams({ a: 1, b: null, c: undefined, d: "", e: 0, f: false })).toEqual({ a: 1, e: 0, f: false });
  });
});

describe("toPageInfo", () => {
  it("轉換 API 分頁資訊", () => {
    expect(toPageInfo({ current_page: 2, per_page: 9, total: 30, last_page: 4 })).toEqual({
      currentPage: 2,
      perPage: 9,
      total: 30,
    });
  });

  it("資料還沒回來時給預設值", () => {
    expect(toPageInfo(undefined, 12)).toEqual({ currentPage: 1, perPage: 12, total: 0 });
  });
});

describe("isEmail", () => {
  it.each([
    ["test@example.com", true],
    ["a.b@c.tw", true],
    ["no-at-sign", false],
    ["a@b", false],
    ["has space@x.com", false],
  ])("%s → %s", (value, expected) => {
    expect(isEmail(value)).toBe(expected);
  });
});
