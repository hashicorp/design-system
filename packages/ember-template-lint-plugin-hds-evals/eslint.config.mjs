import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/", "results/", "tests/.eval-runs/"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];
