# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 画像設定について

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

`src/config/imageConfig.js` ファイルで、デフォルト画像や画像サイズの設定を変更できます。

## キービジュアル設定について

キービジュアルは画像を設定するだけで完結します。`src/config/appConfig.js` ファイルで簡単にカスタマイズできます。

### 基本的な設定方法

```javascript
// src/config/appConfig.js
const DEFAULT_CONFIG = {
  keyVisual: {
    // キービジュアル画像
    image: {
      url: "https://example.com/keyvisual.jpg", // 画像URLを設定
      alt: "キービジュアル",
      overlay: "rgba(0, 0, 0, 0.3)", // オーバーレイ（必要に応じて調整）
    },
    

    
    // 開催期間表示設定
    eventPeriod: {
      enabled: true,
      color: "text-white",
    },
    
    // アスペクト比設定
    aspectRatio: "aspect-square", // "aspect-square", "aspect-video", "aspect-[4/3]"
  },
};
```

### 画像設定の詳細

#### 1. 基本的な画像設定
```javascript
image: {
  url: "https://example.com/image.jpg",
  alt: "キービジュアル",
  overlay: "rgba(0, 0, 0, 0.3)", // テキストの視認性を向上
}
```

#### 2. オーバーレイなしの設定
```javascript
image: {
  url: "https://example.com/image.jpg",
  alt: "キービジュアル",
  overlay: "", // オーバーレイなし
}
```

#### 3. カスタムオーバーレイ
```javascript
image: {
  url: "https://example.com/image.jpg",
  alt: "キービジュアル",
  overlay: "rgba(59, 130, 246, 0.6)", // 青系のオーバーレイ
}
```

### アスペクト比の設定

```javascript
aspectRatio: "aspect-square", // 正方形
aspectRatio: "aspect-video", // 横長（16:9）
aspectRatio: "aspect-[4/3]", // カスタム比率
```

### 開催期間表示の設定

```javascript
eventPeriod: {
  enabled: true, // 表示する
  color: "text-white",
}

// または

eventPeriod: {
  enabled: false, // 非表示にする
}
```

### 簡単な設定方法

#### 画像URLのみを設定
```javascript
import { setKeyVisualImage } from './config/appConfig';

// 画像URLのみを設定（他の設定はデフォルト）
setKeyVisualImage("https://example.com/keyvisual.jpg");
```

#### サンプル設定を適用
```javascript
import { basicImageExample } from './config/keyVisualExamples';
import { updateKeyVisualConfig } from './config/appConfig';

// サンプル設定を適用
updateKeyVisualConfig(basicImageExample);
```

### サンプル設定

`src/config/keyVisualExamples.js` ファイルに様々なサンプル設定が用意されています：

- `basicImageExample`: 基本的な画像設定
- `noOverlayExample`: オーバーレイなしの設定
- `imageOnlyExample`: テキストなしの設定
- `wideAspectExample`: ワイドアスペクト比の設定
- `customTextColorExample`: カスタムテキストカラーの設定
- `noEventPeriodExample`: 開催期間表示なしの設定
- `fullCustomExample`: 完全カスタムの設定

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
