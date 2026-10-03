import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useAppStore = defineStore("app", () => {
  const configs = reactive({
    width: 1920,
    scrollTop: 0,
    hambergerOpen: false,
  });

  return { configs };
  //
});
