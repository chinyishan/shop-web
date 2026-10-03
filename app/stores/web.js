import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useWebStore = defineStore("web", () => {
  const configs = reactive({});
  const pages = reactive({});

  return {
    configs,
    pages,
  };
});
