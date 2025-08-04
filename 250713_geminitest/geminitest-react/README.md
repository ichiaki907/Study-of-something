# 東京スタンプラリー React アプリケーション

このプロジェクトは、スタンプラリー機能を持つReactアプリケーションです。プログラミングの知識がなくても、JSONファイルを編集するだけでアプリケーションをカスタマイズできます。

## 📋 目次

- [プロジェクト概要](#プロジェクト概要)
- [クイックスタート](#クイックスタート)
- [設定ファイル](#設定ファイル)
- [カスタマイズ方法](#カスタマイズ方法)
- [画像設定](#画像設定)
- [テーマ設定](#テーマ設定)
- [フッター設定](#フッター設定)
- [開発者向け情報](#開発者向け情報)

## 🎯 プロジェクト概要

このアプリケーションは以下の機能を提供します：

- **スタンプラリー**: 各地のスポットを巡ってスタンプを集める
- **特典システム**: スタンプを集めることで特典を獲得
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **テーマカスタマイズ**: 色合いの変更が可能
- **設定ファイル管理**: JSONファイルで簡単カスタマイズ

## 🚀 クイックスタート

### インストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

### 本番ビルド

```bash
# 本番用ビルド
npm run build
```

## ⚙️ 設定ファイル

このアプリケーションでは、すべての設定がJSONファイルで管理されています。

### 📁 ファイル構成

```
src/
├── data/                    # 編集可能な設定ファイル
│   ├── app-settings.json   # アプリケーション基本設定
│   ├── stamps.json         # スタンプデータ
│   ├── benefits.json       # 特典データ
│   └── how-to-participate.json # 参加方法データ
├── config/                  # 技術的設定ファイル（原則変更不可）
│   ├── image-config.json   # 画像設定
│   └── settings.js         # アプリケーション設定
└── utils/                   # ユーティリティ関数
    ├── app-utils.js        # アプリケーション設定関連
    └── footerUtils.js      # フッター設定関連
```

## 🎨 カスタマイズ方法

### 1. アプリケーション基本設定 (`src/data/app-settings.json`)

アプリケーションの基本情報を設定します：

```json
{
  "appInfo": {
    "name": "私のスタンプラリー",
    "pageTitle": "私のスタンプラリー",
    "description": "楽しいスタンプ集めをしましょう！",
    "themeColor": "green",
    "favicon": "/favicon.ico"
  },
  "eventPeriod": {
    "startDate": "2025年1月1日",
    "endDate": "2025年12月31日",
    "displayFormat": "開催期間：{startDate}～{endDate}",
    "showOnKeyVisual": true
  },
  "keyVisual": {
    "image": {
      "url": "/key.png",
      "alt": "キービジュアル - スタンプラリーのメイン画像"
    },
    "aspectRatio": "aspect-square"
  },
  "stampDisplay": {
    "defaultColumns": 3,
    "allowColumnToggle": true,
    "showLocationNames": true,
    "showProgressBar": true
  },
  "footer": {
    "links": {
      "terms": { "url": "#" },
      "privacy": { "url": "#" }
    },
    "socialMedia": {
      "twitter": { "url": "#" },
      "instagram": { "url": "#" },
      "facebook": { "url": "#" }
    },
    "copyright": {
      "text": "© 2024 私のスタンプラリー. All rights reserved.",
      "company": "私のスタンプラリー"
    }
  }
}
```

### 2. スタンプデータ (`src/data/stamps.json`)

スタンプラリーで使用するスタンプの情報を設定します：

```json
{
  "locations": [
    {
      "id": 1,
      "name": "東京タワー",
      "description": "東京のシンボルタワー",
      "address": "東京都港区芝公園4-2-8",
      "phone": "03-3433-5111",
      "hours": "9:00-23:00",
      "image": "tokyo-tower.jpg",
      "map": "https://maps.google.com/...",
      "web": "https://www.tokyotower.co.jp/",
      "isStamped": false
    }
  ]
}
```

### 3. 特典データ (`src/data/benefits.json`)

スタンプを集めた際の特典情報を設定します：

```json
[
  {
    "id": 1,
    "title": "オリジナルステッカー",
    "description": "限定デザインのステッカー",
    "image": "sticker.jpg",
    "requiredStamps": 5
  }
]
```

## 🖼️ 画像設定

このアプリケーションでは、画像はJSONファイルで一元管理されています。

### 画像の設定方法

#### 1. スタンプ画像の設定
`src/data/stamps.json` ファイルで各スタンプの画像を設定できます：

```json
{
  "locations": [
    {
      "id": 1,
      "name": "渋谷スクランブル交差点",
      "image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop",
      "isStamped": true
    }
  ]
}
```

#### 2. 特典画像の設定
`src/data/benefits.json` ファイルで各特典の画像を設定できます：

```json
[
  {
    "id": 1,
    "title": "3% OFFクーポン",
    "image": "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop"
  }
]
```

### 画像の自動反映

- JSONファイルで画像を設定すると、以下の場所に自動的に反映されます：
  - スタンプアイコン（獲得済みの場合）
  - 詳細モーダル
  - スポット情報セクション
  - 特典カード

### フォールバック画像

画像の読み込みに失敗した場合や、画像が設定されていない場合は、自動的にデフォルト画像が表示されます。

### 画像設定のカスタマイズ

`src/config/image-config.json` ファイルで、デフォルト画像や画像サイズの設定を変更できます。

## 🎨 テーマ設定

アプリケーションの色合いを変更できます。

### 利用可能なテーマ

- **red**: レッド系（情熱的な赤系）
- **blue**: ブルー系（爽やかな青系）
- **green**: グリーン系（自然な緑系）
- **purple**: パープル系（高級感のある紫系）
- **orange**: オレンジ系（温かみのあるオレンジ系）
- **teal**: ティール系（落ち着いた青緑系）
- **indigo**: インディゴ系（深みのある藍系）
- **pink**: ピンク系（可愛らしいピンク系）

### テーマの変更方法

`app-settings.json`の`appInfo.themeColor`を変更するだけです：

```json
{
  "appInfo": {
    "themeColor": "green"
  }
}
```

### カスタムテーマの追加

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
```

## 🔗 フッター設定

フッターの設定は `app-settings.json` ファイルの `footer` セクションで管理されます。

### 設定項目

#### 1. フッターリンク
フッターリンクのURL設定です。リンク名は固定で、URLのみ設定可能です。

```json
{
  "footer": {
    "links": {
      "terms": {
        "url": "利用規約のURL"
      },
      "privacy": {
        "url": "プライバシーポリシーのURL"
      }
    }
  }
}
```

#### 2. ソーシャルメディア
ソーシャルメディアのURL設定です。サービス名とアイコンは固定で、URLのみ設定可能です。

```json
{
  "footer": {
    "socialMedia": {
      "twitter": {
        "url": "TwitterのURL"
      },
      "instagram": {
        "url": "InstagramのURL"
      },
      "facebook": {
        "url": "FacebookのURL"
      }
    }
  }
}
```

#### 3. コピーライト
- `text`: コピーライトテキスト
- `company`: 会社名

### 設定例

```json
{
  "footer": {
    "links": {
      "terms": {
        "url": "https://example.com/terms"
      },
      "privacy": {
        "url": "https://example.com/privacy"
      }
    },
    "socialMedia": {
      "twitter": {
        "url": "https://twitter.com/yourcompany"
      },
      "instagram": {
        "url": "https://instagram.com/yourcompany"
      },
      "facebook": {
        "url": "https://facebook.com/yourcompany"
      }
    },
    "copyright": {
      "text": "© 2024 ABCスタンプラリー. All rights reserved.",
      "company": "ABCスタンプラリー"
    }
  }
}
```

### 使用方法

1. `app-settings.json` ファイルの `footer` セクションを編集して、必要なURLを設定します
2. アプリケーションを再起動すると、変更が反映されます
3. フッターコンポーネントは自動的に設定ファイルから情報を読み込みます

### 注意事項

- JSONファイルの形式を正しく保ってください
- リンク名やソーシャルメディアの名称は固定で変更できません
- URLは実際のリンク先に変更してください
- アプリ情報とコピーライトは自由に変更可能です

## 🖼️ キービジュアル設定

キービジュアルは画像を設定するだけで完結します。`app-settings.json` ファイルで簡単にカスタマイズできます。

### 基本的な設定方法

```json
{
  "keyVisual": {
    "image": {
      "url": "/key.png",
      "alt": "キービジュアル - スタンプラリーのメイン画像"
    },
    "aspectRatio": "aspect-square"
  }
}
```

### 画像設定の詳細

#### 1. 基本的な画像設定
```json
{
  "keyVisual": {
    "image": {
      "url": "https://example.com/image.jpg",
      "alt": "キービジュアル"
    }
  }
}
```

#### 2. アスペクト比の設定
```json
{
  "keyVisual": {
    "aspectRatio": "aspect-square"  // 正方形
    // "aspect-video"  // 横長（16:9）
    // "aspect-[4/3]"  // カスタム比率
  }
}
```

### 開催期間表示の設定

```json
{
  "eventPeriod": {
    "startDate": "2025年1月1日",
    "endDate": "2025年12月31日",
    "displayFormat": "開催期間：{startDate}～{endDate}",
    "showOnKeyVisual": true
  }
}
```

## 🛠️ 開発者向け情報

### 利用可能なスクリプト

プロジェクトディレクトリで以下のコマンドを実行できます：

#### `npm start`
開発モードでアプリを起動します。\
ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

変更を加えるとページが自動的にリロードされます。\
コンソールにlintエラーが表示される場合があります。

#### `npm test`
インタラクティブウォッチモードでテストランナーを起動します。

#### `npm run build`
本番用にアプリをビルドします。`build`フォルダに出力されます。\
Reactが本番モードで正しくバンドルされ、最高のパフォーマンスに最適化されます。

ビルドは最小化され、ファイル名にハッシュが含まれます。\
アプリのデプロイ準備が完了します！

#### `npm run eject`
**注意: これは一方向の操作です。一度`eject`すると、元に戻すことはできません！**

ビルドツールと設定の選択に満足できない場合は、いつでも`eject`できます。このコマンドは、プロジェクトから単一のビルド依存関係を削除します。

代わりに、すべての設定ファイルと推移的依存関係（webpack、Babel、ESLintなど）をプロジェクトにコピーして、完全に制御できるようになります。`eject`以外のすべてのコマンドは引き続き動作しますが、コピーされたスクリプトを指すようになるので、必要に応じて調整できます。

`eject`を使用する必要はありません。キュレーションされた機能セットは小規模から中規模のデプロイメントに適しており、この機能を使用する義務を感じる必要はありません。

## 📝 画像ファイルの配置

画像ファイルは`public`フォルダに配置してください：

- **キービジュアル画像**: `public/key.png`
- **スタンプ画像**: `public/stamp1.jpg`, `public/stamp2.jpg` など
- **特典画像**: `public/benefit1.jpg`, `public/benefit2.jpg` など
- **ファビコン**: `public/favicon.ico`

## ⚠️ 注意事項

### 編集可能なファイル
- `src/data/app-settings.json` - アプリケーション基本設定
- `src/data/stamps.json` - スタンプデータ
- `src/data/benefits.json` - 特典データ
- `src/data/how-to-participate.json` - 参加方法データ

### 原則変更不可のファイル
- `src/config/image-config.json` - 画像設定（技術的な設定）
- `src/config/settings.js` - アプリケーション設定（技術的な設定）

### ファイル形式とエンコーディング
1. **JSON形式**: すべてのファイルはJSON形式で記述してください
2. **文字エンコーディング**: UTF-8で保存してください
3. **画像ファイル**: 画像ファイルは事前に`public`フォルダに配置してください
4. **URL**: 外部リンクは完全なURL（https://...）で記述してください

## 🔄 編集手順

1. ファイルをテキストエディタで開く
2. 必要な情報を編集
3. ファイルを保存
4. アプリケーションを再起動（必要に応じて）

## 📚 参考資料

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)

## 🤝 貢献

このプロジェクトへの貢献を歓迎します。バグレポートや機能リクエスト、プルリクエストを送信してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
