import type { TSESLint } from "@typescript-eslint/utils"
import type { Linter } from "eslint"
import prettierConfig from "eslint-config-prettier"
import { dirname, resolve } from "node:path"
import tseslint from "typescript-eslint"
import { fileURLToPath } from "url"
import {
  baseConfig,
  cspellConfig,
  importConfigArray,
  languageOptionFactory,
  perfectionistConfig,
  reactConfig,
  reactHooksConfig,
  typescriptConfig,
} from "./.eslint"

const ignoresConfig: Linter.Config = {
  ignores: [
    "**/.next/**",
    "**/.turbo/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/build/**",
    "**/pnpm-lock.yaml",
  ],
  name: "eslint/ignores",
}

const tsConfigPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "./tsconfig.json",
)

const languageOptionConfig = languageOptionFactory(tsConfigPath)

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  ignoresConfig,
  languageOptionConfig,
  ...importConfigArray,
  cspellConfig,
  baseConfig,
  ...importConfigArray,
  perfectionistConfig,
  reactHooksConfig,
  reactConfig,
  prettierConfig,
  typescriptConfig,
)

export default config
