import type { Order } from "#shared/types/shop";

const STORAGE_KEY = "healthlab-orders";
const MAX_RECORDS = 20;

export const useOrderStore = defineStore(
  "order",
  () => {
    /** 本機訂單紀錄（示範用，真實專案應由後端提供） */
    const items = ref<Order[]>([]);

    const count = computed(() => items.value.length);
    const isEmpty = computed(() => items.value.length === 0);

    const add = (order: Order) => {
      items.value = [order, ...items.value].slice(0, MAX_RECORDS);
    };

    const findByNo = (orderNo: string) =>
      items.value.find((item) => String(item.order_no).toUpperCase() === String(orderNo).trim().toUpperCase()) ?? null;

    const clear = () => {
      items.value = [];
    };

    return { items, count, isEmpty, add, findByNo, clear };
  },
  {
    persist: persistItems<Order>(STORAGE_KEY),
  },
);
