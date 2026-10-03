/** 維護模式：所有頁面導向 /maintenance；關閉後 /maintenance 導回首頁 */
export default defineNuxtRouteMiddleware((to) => {
  const { maintenanceMode } = useRuntimeConfig().public;
  const onMaintenancePage = to.path === "/maintenance";

  if (maintenanceMode && !onMaintenancePage) return navigateTo("/maintenance");
  if (!maintenanceMode && onMaintenancePage) return navigateTo("/");
});
