import type { Linter } from "eslint"
import cspellPlugin from "@cspell/eslint-plugin"
import cspellJson from "../cspell.json"
import { sharedFiles } from "./shared"

export const cspellConfig: Linter.Config = {
  files: sharedFiles,
  ignores: cspellJson.ignorePaths,
  name: "eslint/cspell",
  plugins: { "@cspell": cspellPlugin },
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        configFile: new URL("../cspell.json", import.meta.url).toString(),
        cspell: {},
      },
    ],
  },
}
