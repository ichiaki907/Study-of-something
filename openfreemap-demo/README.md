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

## 配色テーマについて

背景地図の配色は上部バーで切り替えられる（`src/map/colorThemes.ts`）。

| テーマ | 内容 |
| --- | --- |
| デフォルト | OpenFreeMap 本来の配色（スタイルをそのまま表示） |
| Google風 | 一般的な地図アプリに寄せた配色（**起動時はこちら**） |
| 高コントラスト | 屋外・直射日光下でも判別しやすい強めの配色 |

地図スタイルの初期値は **Bright**（`DEFAULT_MAP_STYLE`）。

高コントラストは、スタンプラリーのように屋外で使う場面を想定したもの。
陸地を純白にして、その上に乗る道路・緑・水との明度差を最大化している。
Google風との比較（街区との明度差）:

| | Google風 | 高コントラスト |
| --- | --- | --- |
| 生活道路 | 10.6 | 39.8 |
| 緑 | 21.5 | 45.2 |
| 水 | 39.0 | 84.4 |
| ラベルのコントラスト比 | 3.1:1 | 8.2:1 |

Google風テーマは、Google マップのスクリーンショットの画素値を実測して
組み立てている。主な方針は以下のとおり。

- 街区を明るく、道路を暗くする（実測: 街区 #f3f3f3 / 生活道路 #e2e7ed 前後）
  逆にすると道路だけが浮いて見慣れた地図と印象が変わる
- 道路を3階層で塗り分ける
  生活道路 → 県道 → 国道 の順に濃くし、高速のみ橙系を残す
- 森林・農地の緑を強調する
  OpenFreeMap 既定は森林の不透明度が非常に低く（bright=0.1）、
  農地に至っては描画レイヤーがそもそも無いため、山間部が白くなる
- POI・道路名ラベルの文字色と白フチを補強する

適用前の配色はスナップショットに退避しており、デフォルトに戻すと
元の配色へ復元される（テーマ適用時に追加した農地レイヤーも取り除かれる）。

パターンを増やす場合は `ColorThemeKey` にキーを足し、
`COLOR_THEMES`（表示名）と `THEME_CONFIGS`（配色定義）に定義を追加する。
配色はパレットとして値だけを持たせているので、色を差し替えるだけで
新しいテーマを作れる。

## 地図上の施設（OSM POI）について

OpenFreeMap のタイルは OpenMapTiles スキーマなので、`poi` レイヤーに
OpenStreetMap 由来の施設が入っている。「施設表示」トグルをONにすると
背景地図に施設が表示され、**タップすると詳細カードが出る**。
駅・バス停も選択できる（Google Maps / Places API は使用していない）。

取得できるフィールドは以下のみ。

- `name`（日本語名）／`class`／`subclass`／`rank`／`level`／`indoor`

**営業時間・電話番号・評価・レビュー・写真・混雑状況は含まれない。**
この範囲を超える情報が必要なら Google Places API 等の別データソースが要る、
というのが本デモで確認したかった線引きである。

表示ズームについて、OpenFreeMap 既定では `poi_r1`=z15 / `poi_r7`=z16 /
`poi_r20`=z17 からしか出ず、初期表示の z14 ではバス停しか見えない。
カバレッジを確認しやすいよう `src/map/labelStyle.ts` の
`lowerPoiMinzoom()` で1段階ずつ早めている（poi データ自体が z14 以上に
しか無いため、これ以上は下げても増えない）。

施設カードの分類は保存スポットのカテゴリとは独立に持たせている
（`poiDisplayFor()`）。OpenMapTiles の `class` は37種あり仮スポットの
4カテゴリには収まらないため、交通／カフェ／飲食店／店舗／宿泊／
観光・文化／公共・その他 に振り分け、元の `class` / `subclass` は
カード上に併記して判別できるようにしている。

## Google マップへの遷移について

詳細カードから Google マップへ遷移できるようにしている
（`src/lib/googleMapsLink.ts`）。使っているのは Google の
「Maps URLs」という**単なる URL スキーム**で、Google Maps API /
Places API とは別物。**API キーも課金も不要**で、スマートフォンでは
Google マップアプリが直接開く。

| 用途 | URL |
| --- | --- |
| 場所検索 | `https://www.google.com/maps/search/?api=1&query=<検索語>` |
| 経路案内 | `https://www.google.com/maps/dir/?api=1&destination=<lat,lng>` |

緯度経度のカンマは URL エンコードしない（`%2C` にすると Google マップ側で
正しく解釈されないことがある）。

チェーン店（ユニクロ等）は名前だけで検索すると別の支店が開いてしまうため、
検索語に座標を添えて検索をその地点へ寄せている（`googleMapsUrlByNameNear`）。
ただし Maps URLs に検索範囲を指定するパラメータは無いため、
必ず目的の店舗が選ばれる保証はない。位置だけを確実に開きたい場合は
座標のみで検索する（`googleMapsUrlByCoords`）。

これにより「**地図表示は OpenFreeMap（無料）／営業時間・口コミ・写真などの
詳細は Google マップへ委ねる**」というハイブリッド構成が取れる。
OSM に無い情報を Places API の課金なしで補える点が、本デモで確認できた
実用的な落としどころ。

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
