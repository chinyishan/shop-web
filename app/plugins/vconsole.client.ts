/** 手機除錯面板：只在開發模式載入，不會打包進正式版 */
export default defineNuxtPlugin(async () => {
  if (!import.meta.dev) return;

  const { default: VConsole } = await import("vconsole");
  new VConsole();
});
