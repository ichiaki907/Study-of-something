# Vercel デプロイ手順（memo-next-app）

このドキュメントは `memo-next-app` を Vercel へデプロイするための最短手順です。

## 前提
- GitHub アカウント
- Vercel アカウント（GitHub 連携済み）
- 本リポジトリが GitHub に push 済み

## 1) Vercel ダッシュボードからデプロイ（推奨）
1. Vercel にログイン
2. `Add New...` → `Project`
3. このリポジトリを Import
4. **Root Directory** を `memo-next-app` に設定
5. Framework Preset は `Next.js`（自動検出）
6. Build/Install 設定はデフォルトでOK
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next`（Next.js 管理）
7. `Deploy` を押す

## 2) CLI でデプロイ（任意）
```bash
cd memo-next-app
npx vercel
```
初回は対話で設定されます。既存プロジェクトへ本番反映する場合:

```bash
npx vercel --prod
```

## 3) 環境変数
現状の `memo-next-app` は追加の環境変数を必須としていません。
将来的に追加した場合は、Vercel の Project Settings → Environment Variables に登録してください。

## 4) よくあるハマりどころ
- ルートを誤ってリポジトリ直下にすると build に失敗することがある
  - `Root Directory = memo-next-app` を必ず確認
- Node バージョン差異で不整合が出る場合は、Vercel の Node.js Version をローカルと合わせる
- 依存関係更新後に不整合がある場合は、Vercel で `Redeploy`（`Use existing Build Cache` を外す）

## 5) デプロイ確認チェック
- `/` にアクセスしてメモ画面が表示される
- テキスト入力 → `更新` で表示領域に反映される
- `クリア` で入力欄と表示領域が空になる
