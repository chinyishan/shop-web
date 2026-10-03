import { describe, expect, it } from "vitest";
import { persistItems } from "../../app/utils/persist";

describe("persistItems", () => {
  it("只把 items 以陣列存起來（與改版前格式相同）", () => {
    const { serializer } = persistItems("key");
    expect(serializer.serialize({ items: [{ id: 1 }] })).toBe('[{"id":1}]');
  });

  it("讀取時套用 normalize，格式錯誤時回傳空陣列", () => {
    const { serializer } = persistItems<{ id: number; key?: string }>("key", (items) =>
      items.map((item) => ({ ...item, key: item.key ?? `${item.id}-0` })),
    );
    expect(serializer.deserialize('[{"id":5}]')).toEqual({ items: [{ id: 5, key: "5-0" }] });
    expect(serializer.deserialize('{"not":"array"}')).toEqual({ items: [] });
  });
});
