import type { Linter } from "eslint"
import reactPlugin from "eslint-plugin-react"
import { sharedFiles } from "./shared"

export const reactConfig: Linter.Config = {
  files: sharedFiles,
  name: "eslint/react",
  plugins: { react: reactPlugin },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
  },
  settings: { react: { version: "detect" } },
}
