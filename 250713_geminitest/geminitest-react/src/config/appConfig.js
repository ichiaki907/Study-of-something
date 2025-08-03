// デフォルト設定
const DEFAULT_CONFIG = {
  // アプリケーション情報
  appInfo: {
    name: "スタンプラリー",
    description: "スタンプを集めて素敵な特典をゲットしよう！",
  },

  // 開催期間設定
  eventPeriod: {
    startDate: "2025年10月29日(日)",
    endDate: "2025年12月11日(火)",
    displayFormat: "開催期間：{startDate}～{endDate}",
  },

  // ページタイトル設定
  pageTitles: {
    main: "xxNFTスタンプラリー",
  },

  // ファビコン設定
  favicon: {
    path: "/favicon.ico",
    sizes: ["16x16", "32x32", "192x192", "512x512"],
    type: "image/x-icon",
  },
};

// アプリケーション基本設定（デフォルト設定）
export const APP_CONFIG = DEFAULT_CONFIG;

// ページタイトルを設定する関数
export const setPageTitle = (pageType = "main") => {
  const title = APP_CONFIG.pageTitles[pageType] || APP_CONFIG.pageTitles.main;
  document.title = title;
  return title;
};

// ファビコンを設定する関数
export const setFavicon = () => {
  const favicon = APP_CONFIG.favicon;

  // 既存のファビコンリンクを削除
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach((link) => link.remove());

  // 新しいファビコンリンクを追加
  favicon.sizes.forEach((size) => {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = favicon.type;
    link.href = favicon.path;
    if (size !== "16x16") {
      link.sizes = size;
    }
    document.head.appendChild(link);
  });
};

// アプリケーション初期化時に呼び出す関数
export const initializeApp = () => {
  setPageTitle();
  setFavicon();
  console.log("アプリケーション設定を初期化しました");
};
