import { defineConfig } from "cypress";
import { devServer } from "@cypress/vite-dev-server";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    supportFile: "cypress/support/e2e.ts", // optional: default support file for E2E
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        // You can import your Vite config here if needed, but it's optional
      },
    },
    supportFile: "cypress/support/component.ts", // optional: default support file for CT
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
  },
});
