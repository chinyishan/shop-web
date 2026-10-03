import { defineStore } from "pinia";

const STORAGE_KEY = "healthlab-orders";
const MAX_RECORDS = 20;

export const useOrderStore = defineStore("order", () => {
  /** 本機訂單紀錄（示範用，真實專案應由後端提供） */
  const items = ref([]);
  const ready = ref(false);

  const count = computed(() => items.value.length);
  const isEmpty = computed(() => items.value.length === 0);

  const add = (order) => {
    items.value.unshift(order);
    if (items.value.length > MAX_RECORDS) {
      items.value = items.value.slice(0, MAX_RECORDS);
    }
  };

  const findByNo = (orderNo) =>
    items.value.find(
      (item) => String(item.order_no).toUpperCase() === String(orderNo).trim().toUpperCase()
    ) ?? null;

  const clear = () => {
    items.value = [];
  };

  const hydrate = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) items.value = saved;
    } catch (error) {
      items.value = [];
    }
    ready.value = true;
  };

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
    } catch (error) {
      // 無痕模式等情境忽略即可
    }
  };

  return { items, ready, count, isEmpty, add, findByNo, clear, hydrate, persist };
});
