import { defineConfig } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:4173";

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL, channel: "chrome", headless: true },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "node scripts/serve-out.mjs",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: true,
      },
});
