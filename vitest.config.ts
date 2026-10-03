import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    projects: [
      // 純函式：不需要 Nuxt，跑得快
      {
        test: {
          name: "unit",
          include: ["tests/unit/**/*.test.ts"],
          environment: "node",
        },
      },
      // 需要 Nuxt 自動匯入的 store、composable
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["tests/nuxt/**/*.test.ts"],
          environment: "nuxt",
          hookTimeout: 60_000,
        },
      }),
    ],
  },
});
