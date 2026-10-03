import VConsole from "vconsole";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  if (config.app.buildId === "dev") {
    let vConsole = new VConsole();
    nuxtApp.vueApp.use(vConsole);
  }
});
