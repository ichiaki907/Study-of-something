# プロジェクトのフォルダ構造

```
src/
├── App.jsx                    # ルートコンポーネント
├── components/               # コンポーネントフォルダ
│   ├── NFTBenefitsPage.jsx  # メインページコンポーネント
│   ├── Header.jsx           # ヘッダーコンポーネント
│   ├── BenefitCard.jsx      # 特典カードコンポーネント
│   └── benefitsData.js      # 特典データ
├── index.js                 # エントリーポイント
└── index.css               # グローバルスタイル（Tailwind CSS）
```

## 各ファイルの役割

### 1. **App.jsx**
- アプリケーションのルートコンポーネント
- NFTBenefitsPageをインポートして表示

### 2. **NFTBenefitsPage.jsx**
- 特典ページ全体のレイアウトと状態管理
- HeaderとBenefitCardコンポーネントを組み合わせて表示
- 特典ボタンのクリックイベントを処理

### 3. **Header.jsx**
- ページ上部の固定ヘッダー
- 「特典」タイトルを表示

### 4. **BenefitCard.jsx**
- 個別の特典カードコンポーネント
- プロップスで受け取った特典情報を表示
- ボタンのアクティブ/非アクティブ状態を制御

### 5. **benefitsData.js**
- 特典データの定義ファイル
- 新しい特典を追加する際はこのファイルを編集

## 使用方法

1. 上記のフォルダ構造でファイルを配置
2. Tailwind CSSをプロジェクトに設定
3. `npm start`または`yarn start`でアプリケーションを起動

## カスタマイズ方法

- **新しい特典を追加**: `benefitsData.js`に新しいオブジェクトを追加
- **スタイルの変更**: 各コンポーネント内のTailwind CSSクラスを編集
- **機能の追加**: `NFTBenefitsPage.jsx`の`handleButtonClick`メソッドを拡張