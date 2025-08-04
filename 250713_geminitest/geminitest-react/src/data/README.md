# データ入力ガイド

このフォルダには、アプリケーションの情報を設定するファイルが含まれています。
プログラミングの知識がなくても、これらのファイルを編集するだけでアプリケーションをカスタマイズできます。

## ファイル一覧

### 1. `app-settings.json` - アプリケーション基本設定（編集可能）
アプリケーションの基本情報を設定します。
**注意**: `.jsonc`ファイルはコメント付きJSONファイルです。各設定項目にコメントが付いているので、設定の意味が分かりやすくなっています。

#### 編集可能な項目：
- **アプリ名**: `appInfo.name`
- **アプリの説明**: `appInfo.description`
- **ページタイトル**: `appInfo.pageTitle`
- **テーマカラー**: `appInfo.themeColor` ("red", "blue", "green", "purple", "orange", "teal", "indigo", "pink")
- **ファビコン**: `appInfo.favicon` (ファビコンファイルを`public`フォルダに配置)
- **開催期間**: `eventPeriod.startDate`, `eventPeriod.endDate`
- **キービジュアル画像**: `keyVisual.image.url` (画像ファイルを`public`フォルダに配置)
- **スタンプ表示列数**: `stampDisplay.defaultColumns` (1, 2, 3)

#### 例：
```json
{
  "appInfo": {
    "name": "私のスタンプラリー",
    "description": "楽しいスタンプ集めをしましょう！",
    "pageTitle": "私のスタンプラリー",
    "themeColor": "green",
    "favicon": "/favicon.ico"
  },
  "eventPeriod": {
    "startDate": "2025年1月1日",
    "endDate": "2025年12月31日"
  }
}
```

### 2. `stamps.json` - スタンプデータ（編集可能）
スタンプラリーで使用するスタンプの情報を設定します。

#### 各スタンプに必要な情報：
- **locationName**: 場所の名前
- **description**: 場所の説明
- **address**: 住所
- **phone**: 電話番号
- **hours**: 営業時間
- **image**: 画像ファイル名（`public`フォルダに配置）
- **map**: GoogleマップのURL
- **web**: 公式サイトのURL

#### 例：
```json
{
  "locationName": "東京タワー",
  "description": "東京のシンボルタワー",
  "address": "東京都港区芝公園4-2-8",
  "phone": "03-3433-5111",
  "hours": "9:00-23:00",
  "image": "tokyo-tower.jpg",
  "map": "https://maps.google.com/...",
  "web": "https://www.tokyotower.co.jp/"
}
```

### 3. `benefits.json` - 特典データ（編集可能）
スタンプを集めた際の特典情報を設定します。

### 4. テーマ設定について
アプリケーションの色合いを変更できます。

#### 利用可能なテーマ：
- **red**: レッド系（情熱的な赤系）
- **blue**: ブルー系（爽やかな青系）
- **green**: グリーン系（自然な緑系）
- **purple**: パープル系（高級感のある紫系）
- **orange**: オレンジ系（温かみのあるオレンジ系）
- **teal**: ティール系（落ち着いた青緑系）
- **indigo**: インディゴ系（深みのある藍系）
- **pink**: ピンク系（可愛らしいピンク系）

#### テーマの変更方法：
`app-settings.json`の`appInfo.themeColor`を変更するだけです：
```json
{
  "appInfo": {
    "themeColor": "green"
  }
}
```

#### カスタムテーマの追加：
新しいテーマを追加する場合は、`src/utils/app-utils.js`の`getAvailableThemes()`関数を編集してください：
```javascript
export const getAvailableThemes = () => {
  return {
    // 既存のテーマ...
    custom: {
      name: "カスタム",
      description: "オリジナルテーマ",
      backgroundColor: "bg-orange-500/80",
      textColor: "text-white"
    }
  };
};

#### 各特典に必要な情報：
- **name**: 特典の名前
- **description**: 特典の説明
- **image**: 特典の画像ファイル名
- **requiredStamps**: 必要なスタンプ数

#### 例：
```json
{
  "name": "オリジナルステッカー",
  "description": "限定デザインのステッカー",
  "image": "sticker.jpg",
  "requiredStamps": 5
}
```

## 画像ファイルの配置

画像ファイルは`public`フォルダに配置してください：
- キービジュアル画像: `public/key.png`
- スタンプ画像: `public/stamp1.jpg`, `public/stamp2.jpg` など
- 特典画像: `public/benefit1.jpg`, `public/benefit2.jpg` など

## 注意事項

1. **JSON形式**: すべてのファイルはJSON形式で記述してください
2. **文字エンコーディング**: UTF-8で保存してください
3. **画像ファイル**: 画像ファイルは事前に`public`フォルダに配置してください
4. **URL**: 外部リンクは完全なURL（https://...）で記述してください

## 編集手順

1. ファイルをテキストエディタで開く
2. 必要な情報を編集
3. ファイルを保存
4. アプリケーションを再起動（必要に応じて）

これで、プログラミングの知識がなくてもアプリケーションをカスタマイズできます！ 