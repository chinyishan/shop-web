import { describe, expect, it } from "vitest";
import {
  calcShipping,
  calcTotal,
  FREE_SHIPPING_THRESHOLD,
  HOME_SHIPPING_FEE,
  STORE_SHIPPING_FEE,
} from "../../app/utils/checkout";

describe("calcShipping", () => {
  const base = { subtotal: 500, isEmpty: false, delivery: "home" as const };

  it("宅配未滿額要收運費", () => {
    expect(calcShipping(base)).toBe(HOME_SHIPPING_FEE);
  });

  it("宅配滿額免運（含剛好等於門檻）", () => {
    expect(calcShipping({ ...base, subtotal: FREE_SHIPPING_THRESHOLD })).toBe(0);
  });

  it("超商取貨不論金額都收固定運費", () => {
    expect(calcShipping({ ...base, delivery: "store", subtotal: 5000 })).toBe(STORE_SHIPPING_FEE);
  });

  it("免運優惠碼與空購物車不收運費", () => {
    expect(calcShipping({ ...base, freeShipping: true })).toBe(0);
    expect(calcShipping({ ...base, delivery: "store", freeShipping: true })).toBe(0);
    expect(calcShipping({ ...base, isEmpty: true })).toBe(0);
  });
});

describe("calcTotal", () => {
  it("小計 - 折扣 + 運費", () => {
    expect(calcTotal(1350, 135, 60)).toBe(1275);
  });

  it("折扣超過金額時最低為 0", () => {
    expect(calcTotal(100, 500, 0)).toBe(0);
  });
});
