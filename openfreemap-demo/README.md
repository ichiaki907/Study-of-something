# openfreemap-demo

OpenFreeMap + MapLibre GL JS を使った、**地図表示品質・操作感の検証専用デモアプリ**。

本番アプリへの組み込みを目的としたものではなく、「OpenFreeMap ＋
MapLibre でどの程度の地図アプリを作れるか」を確認するための、独立した
小さなプロジェクトです。バックエンド・データベースは使用していません。

## 何を確認するためのデモか

- OpenFreeMap の地図品質は十分か
- スマートフォンでの操作感（ドラッグ・ピンチズーム・タップ）は問題ないか
- 保存スポット主体のアプリとして使えそうか
- Liberty / Positron / Bright のどのスタイルが適しているか
- Google Maps API を使わなくても十分な UX を作れそうか
- MapLibre を今後の本番アプリの地図基盤として採用できそうか

## 技術構成

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)（ビルドツール）
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)（地図描画）
- [OpenFreeMap](https://openfreemap.org/)（背景地図タイル・スタイル）
- [Cloudflare Workers（Static Assets）](https://developers.cloudflare.com/workers/static-assets/) へのデプロイを想定

スポットデータは API・DB を使わず、`src/data/spots.ts` に固定データとして
持たせています。

## プロジェクト構成

```
src/
  types.ts                    # Spot / カテゴリ / 地図スタイルの型定義
  data/
    spots.ts                  # 仮スポットの固定データ（将来 D1 等に差し替え想定）
  map/
    mapStyles.ts               # OpenFreeMap のスタイル URL 一覧（将来 PMTiles 等に差し替え想定）
    categoryStyle.ts            # カテゴリごとの色・アイコン定義
    MapView.tsx                 # MapLibre GL JS を直接扱う唯一のコンポーネント
  components/
    TopBar.tsx                  # 上部バー（アプリ名・保存スポット件数・スタイル切替）
    StyleSwitcher.tsx           # Liberty / Positron / Bright の切り替え UI
    CategoryFilter.tsx          # カテゴリ別フィルターチップ
    SpotDetailCard.tsx          # マーカータップ時の詳細カード
  App.tsx / App.css             # 画面全体のレイアウト
  main.tsx / index.css          # エントリーポイント
```

地図（MapLibre GL JS）に関する処理はすべて `src/map/MapView.tsx` に
集約しています。呼び出し側（`App.tsx`）は「スポットの配列」と
「選択・スタイル変更のコールバック」だけをやり取りする形にしているため、
以下のような将来的な差し替えがしやすい構成を意図しています。

- 固定スポット（`src/data/spots.ts`） → Cloudflare D1 などの実データ
- OpenFreeMap のホスト型タイル（`src/map/mapStyles.ts`） → PMTiles 等の自前配信
- 仮スポット → ユーザーが実際に保存したスポット

## ローカル起動方法

```bash
npm install
npm run dev
```

`http://localhost:5173` を開くと地図が表示されます。スマートフォンで
確認する場合は `npm run dev -- --host` で起動し、同一ネットワーク内の
端末から表示された IP アドレスにアクセスしてください。

## ビルド方法

```bash
npm run build
```

`dist/` に静的ファイル一式が出力されます。ビルド結果をローカルで
確認する場合は以下を実行します。

```bash
npm run preview
```

## Cloudflare へのデプロイ方法

このプロジェクトは Cloudflare Workers の **Static Assets** 機能
（`wrangler.jsonc` の `assets` 設定）を使って配信する構成になっています。
バックエンド用の Worker スクリプトは持たず、`dist` の内容を
SPA として配信するだけの最小構成です。

1. Cloudflare アカウントにログインします（初回のみ）。

   ```bash
   npx wrangler login
   ```

2. ビルドしてデプロイします。

   ```bash
   npm run deploy
   ```

   （内部的には `npm run build && wrangler deploy` を実行しています）

3. デプロイ後に表示される `https://openfreemap-demo.<あなたのサブドメイン>.workers.dev`
   のような URL でアクセスできます。

ローカルで Cloudflare Workers 環境に近い形で動作確認したい場合は、
ビルド後に以下を実行します。

```bash
npm run build
npm run cf:dev
```

## 使用している OpenFreeMap のスタイル URL

`src/map/mapStyles.ts` にまとめています。

| スタイル | URL |
| --- | --- |
| Liberty | `https://tiles.openfreemap.org/styles/liberty` |
| Positron | `https://tiles.openfreemap.org/styles/positron` |
| Bright | `https://tiles.openfreemap.org/styles/bright` |

いずれも OpenFreeMap がホストしているスタイル JSON をそのまま
`maplibregl.Map` の `style` に渡しているだけで、自前のタイルサーバーや
PMTiles は使用していません。

## 仮スポットデータについて

`src/data/spots.ts` に、大阪駅・梅田周辺を想定した架空のスポットを
10 件用意しています。**すべて実在の店舗・施設とは無関係のサンプル
データ**です（一部、梅田スカイビルや太融寺など実在の地名をイメージした
名称を含みますが、位置・情報は仮のものです）。

## 実装して気づいた制約・懸念（例）

実際に動かして確認した際の所感をここに追記していく想定です。特に
以下の観点を確認してください。

- 地図全体の見栄え・道路や駅名の見やすさ（Liberty / Positron / Bright の比較）
- 情報量の多さ・独自マーカーとの重なり方
- 一般的な地図アプリ（Google マップ等）と比較した際の違和感の有無
- スマートフォンでの操作感（ドラッグ・ピンチズーム・タップ判定）
- オフライン・通信不良時の挙動（タイル取得に失敗してもアプリ自体は
  クラッシュしないことを確認済み）
- 現在地取得を拒否した場合でもエラーにならないことを確認済み
  （`GeolocateControl` の `error` イベントを捕捉し、コンソール警告のみに
  留めている）

## 本番利用する場合に追加検討が必要な点（例）

- スポット数が多くなった場合のマーカーのクラスタリング
- OpenFreeMap のフェアユースポリシーの確認、または自前 PMTiles 配信への切り替え
- スポットデータの D1 等への移行、API 経由での取得
- 詳細ページ・検索・保存機能などの本格的な実装
- アクセシビリティ・多言語対応
