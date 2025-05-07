import type { Linter } from "eslint"
import perfectionistPlugin from "eslint-plugin-perfectionist"
import { sharedFiles } from "./shared"

export const perfectionistConfig: Linter.Config = {
  files: sharedFiles,
  name: "eslint/perfectionist",
  plugins: {
    perfectionist: perfectionistPlugin,
  },
  rules: {
    ...perfectionistPlugin.configs["recommended-natural"].rules,
    "perfectionist/sort-imports": [
      "error",
      { newlinesBetween: "never", type: "natural" },
    ],
  },
}
