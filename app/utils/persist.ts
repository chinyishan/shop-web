/**
 * Pinia 持久化設定：把 store 的 items 以「陣列」存進 localStorage。
 * 沿用改版前的 key 與格式，使用者原本的購物車、收藏不會消失。
 */
export const persistItems = <T>(key: string, normalize: (items: T[]) => T[] = (items) => items) => ({
  key,
  serializer: {
    serialize: (state: { items: T[] }) => JSON.stringify(state.items),
    deserialize: (raw: string) => {
      const saved = JSON.parse(raw);
      return { items: Array.isArray(saved) ? normalize(saved) : [] };
    },
  },
});
