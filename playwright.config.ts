import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3198);

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  snapshotPathTemplate: "tests/e2e/__screenshots__/{projectName}/{arg}{ext}",
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" },
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    // E2E_OUTPUT 可指向另一份 build（例如升級前的版本）來產生截圖基準
    command: `node ${process.env.E2E_OUTPUT ?? ".output"}/server/index.mjs`,
    url: `http://localhost:${PORT}/api/system/config`,
    env: { PORT: String(PORT) },
    reuseExistingServer: false,
  },
});
