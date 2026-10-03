export default defineNuxtRouteMiddleware((to, from) => {
  const runtimeConfig = useRuntimeConfig();
  const maintainceMode = runtimeConfig.public.maintainceMode;
  if (to.path !== "/maintenance" && maintainceMode == "true") {
    return navigateTo("/maintenance");
  } else if (maintainceMode !== "true" && to.path == "/maintenance") {
    return navigateTo("/");
  }
});
