---
mode: "agent"
tools: ["codebase", "githubRepo", "selection"]
description: "コード編集時のルール"
---

# プロジェクト構成

本プロジェクトはReact Router v7を使用したReactアプリケーションです。以下のディレクトリ構成を持っています。
React Router v7に関しては、[公式ドキュメント](https://reactrouter.com/home)を参照してください。

```
app
├── root.tsx                # アプリケーションのエントリポイント
├── routes.ts               # ルーティング設定
├── routes/                 # 画面ごとのルーティング関連ファイル
├── theme/                  # テーマ設定関連
├── ui/
│   ├── components/         # UIコンポーネント
│   ├── layouts/            # レイアウトコンポーネント
│   └── templates/          # テンプレート・画面単位のUI
```

# ライブラリ

本プロジェクトではUIライブラリとして[Yamada UI](https://yamada-ui.com/)を使用しています。
Yamada UIに関しては、[公式ドキュメント](https://yamada-ui.com/)を参照してください。

データフェッチなどのキャッシュ管理には、[TanStack Query](https://tanstack.com/query/latest)を使用しています。
TanStack Queryに関しては、[公式ドキュメント](https://tanstack.com/query/latest)を参照してください。

# コーディングルール

以下のコーディングルールに従ってください。

- 必ず簡潔で明確な表現を使用してください。
- 不要な情報を含めないようにしてください。
- 関数を定義する場合、アロー関数（`()=>{}`）ではなく、`function name () {}` の形で記載してください。ただし、コールバックとして渡す場合は`function(){}`は使用せず、アロー関数を使用してください。
- プログラムコードは適切にインデントしてください。
- eslintのエラーが出た場合は、ファイルを保存して自動fixを行い、その後エラーが解消されたか確認してください。
- コメントは必要最小限にしてください。ただし、関数を追加した場合はJSDoc形式でその関数の動作を完結に記載してください。
