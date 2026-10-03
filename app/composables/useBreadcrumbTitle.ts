/**
 * 麵包屑最後一層的名稱（商品名、文章標題…）由頁面提供。
 * 以路徑為 key 存在 useState：伺服器端每個請求各自一份，不會互相污染。
 */
const useBreadcrumbTitles = () => useState<Record<string, string>>("breadcrumb-titles", () => ({}));

export function useBreadcrumbTitle(title: MaybeRefOrGetter<string | undefined>) {
  const route = useRoute();
  const titles = useBreadcrumbTitles();
  const path = route.path;

  const update = (value: string | undefined) => {
    titles.value = { ...titles.value, [path]: value ?? "" };
  };

  update(toValue(title));
  if (import.meta.client) {
    watch(() => toValue(title), update);
  }
}

export function useCurrentBreadcrumbTitle() {
  const route = useRoute();
  const titles = useBreadcrumbTitles();
  return computed(() => titles.value[route.path]);
}
