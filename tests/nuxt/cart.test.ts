import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

const product = { id: 101, name: "B 群", brand: "GreenLab", brand_id: 1, image: "/p.svg", price: 490, stock: 10 };

describe("useCartStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("同商品同規格累加數量，不同規格分開計算", () => {
    const cart = useCartStore();
    cart.add(product, { spec: { id: 1, label: "單盒", price: 490, stock: 10 } });
    cart.add(product, { spec: { id: 1, label: "單盒", price: 490, stock: 10 }, qty: 2 });
    cart.add(product, { spec: { id: 2, label: "三盒", price: 1350, stock: 10 } });

    expect(cart.items).toHaveLength(2);
    expect(cart.qtyOf(101, 1)).toBe(3);
    expect(cart.count).toBe(4);
    expect(cart.subtotal).toBe(490 * 3 + 1350);
  });

  it("數量不超過庫存，也不低於 1", () => {
    const cart = useCartStore();
    const item = cart.add({ ...product, stock: 3 }, { qty: 5 });
    expect(item.qty).toBe(3);

    cart.increase(item.key);
    expect(cart.qtyOf(101)).toBe(3);

    cart.setQty(item.key, 0);
    expect(cart.qtyOf(101)).toBe(1);
  });

  it("移除與清空", () => {
    const cart = useCartStore();
    const item = cart.add(product);
    cart.add({ ...product, id: 102 });

    cart.remove(item.key);
    expect(cart.items.map((i) => i.id)).toEqual([102]);

    cart.clear();
    expect(cart.isEmpty).toBe(true);
  });
});

