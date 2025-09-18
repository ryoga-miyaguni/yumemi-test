import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import securityPlugin from "eslint-plugin-security";
import unicornPlugin from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = tseslint.config(
  // Next.js recommended
  ...compat.extends("next/core-web-vitals"),

  // TypeScript recommended (型情報なし)
  {
    extends: [...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { fixStyle: "inline-type-imports", prefer: "type-imports" },
      ],
      // 型情報必須ルールは無効化
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },

  // Unicorn plugin
  {
    extends: [unicornPlugin.configs.recommended],
    rules: {
      "unicorn/prevent-abbreviations": "off",
    },
  },

  // Perfectionist plugin
  {
    extends: [perfectionist.configs["recommended-natural"]],
    rules: {
      "perfectionist/sort-imports": "off",
    },
  },

  // Unused imports plugin
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Security plugin
  {
    extends: [securityPlugin.configs.recommended],
  },

  // General JS rules
  {
    rules: {
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
      "prefer-template": "error",
    },
  },

  // Prettier (must be last)
  eslintConfigPrettier,

  // Ignore build artifacts
  {
    ignores: ["**/.next/**", "**/node_modules/**"],
  },
);

export default eslintConfig;
