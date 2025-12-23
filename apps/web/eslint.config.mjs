import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const nextConfigs = nextPlugin.configs["core-web-vitals"];

export default tseslint.config(
  {
    ignores: [
      "eslint.config.mjs",
      "postcss.config.mjs",
      "next.config.ts",
      "tailwind.config.ts",
      ".storybook",
      "playwright.config.ts",
      "vitest.config.ts",
      "vitest.setup.ts",
      ".next",
      "node_modules",
      "node_modules.backup-old",
      "dist",
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["src/components/ui/*.tsx", "tailwind.config.js"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextConfigs.rules,
      "@next/next/no-html-link-for-pages": "off",
    },
  },
);
