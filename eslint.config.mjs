import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    ".wrangler/**",
    "_exp/**",
    "test-results/**",
    "playwright-report/**",
    "out/**",
    "node_modules/**",
    "docs/templates/**",
    "scripts/**",
    "next-env.d.ts",
  ]),
]);
