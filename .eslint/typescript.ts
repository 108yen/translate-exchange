import type { TSESLint } from "@typescript-eslint/utils"
import { configs, plugin } from "typescript-eslint"
import { sharedFiles } from "./shared"

export const typescriptConfig: TSESLint.FlatConfig.Config = {
  files: sharedFiles,
  name: "eslint/typescript",
  plugins: {
    "@typescript-eslint": plugin,
  },
  rules: {
    ...configs.recommended[1].rules,
    ...configs.stylistic[2].rules,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
}
