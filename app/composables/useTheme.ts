/** 深色模式切換：預設跟隨系統，點擊後改為手動指定 */
export function useTheme() {
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === "dark");

  const toggle = () => {
    // 切換的瞬間加上 class，讓顏色平滑過渡（樣式見 base/_theme.scss）
    const root = document.documentElement;
    root.classList.add("color-mode-transition");
    window.setTimeout(() => root.classList.remove("color-mode-transition"), 300);

    colorMode.preference = isDark.value ? "light" : "dark";
  };

  return { isDark, toggle };
}
