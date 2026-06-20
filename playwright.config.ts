// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Tell Playwright where your local Next.js server is running
    baseURL: "http://localhost:3000",
  },
});
