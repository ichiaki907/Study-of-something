import appSettings from '../data/app-settings.json';

// ===== 設定関連の関数 =====

// 設定を取得する関数
export const getSettings = () => appSettings;

// 特定の設定セクションを取得する関数
export const getAppInfo = () => appSettings.appInfo;
export const getEventPeriod = () => appSettings.eventPeriod;
export const getKeyVisual = () => appSettings.keyVisual;
export const getImages = () => appSettings.images;
export const getStampDisplay = () => appSettings.stampDisplay;
export const getFavicon = () => appSettings.favicon;

// ページタイトルを設定する関数
export const setPageTitle = () => {
  const title = appSettings.appInfo.pageTitle;
  document.title = title;
  return title;
};

// ファビコンを設定する関数
export const setFavicon = () => {
  const favicon = appSettings.favicon;

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

// 画像URLを生成する関数
export const generateImageUrl = (baseUrl, size = 'medium', quality = 'medium') => {
  if (!baseUrl) return appSettings.images.defaults.stamp;
  
  const sizeParams = appSettings.images.sizes[size];
  const qualityParams = appSettings.images.quality[quality];
  
  // 既にパラメータが含まれている場合はそのまま返す
  if (baseUrl.includes('?')) {
    return baseUrl;
  }
  
  return `${baseUrl}?${sizeParams}${qualityParams}`;
};

// デフォルト画像を取得する関数
export const getDefaultImage = (type = 'stamp') => {
  return appSettings.images.defaults[type] || appSettings.images.defaults.stamp;
};

// アプリケーション初期化
export const initializeApp = () => {
  setPageTitle();
  setFavicon();
  console.log("アプリケーション設定を初期化しました");
};

// ===== テーマ関連の関数 =====

// 現在のテーマを取得する関数
export const getCurrentTheme = () => {
  const appInfo = getAppInfo();
  return appInfo.themeColor || 'blue';
};

// テーマを変更する関数
export const setTheme = (newTheme) => {
  const appInfo = getAppInfo();
  const availableThemes = getAvailableThemes();
  
  if (availableThemes[newTheme]) {
    appInfo.themeColor = newTheme;
    console.log(`テーマを ${newTheme} に変更しました`);
  } else {
    console.error(`無効なテーマ: ${newTheme}`);
  }
};

// テーマに応じた背景色を取得する関数
export const getThemeBackgroundColor = () => {
  const currentTheme = getCurrentTheme();
  const availableThemes = getAvailableThemes();
  
  if (availableThemes[currentTheme]) {
    return availableThemes[currentTheme].backgroundColor;
  }
  
  // フォールバック
  return availableThemes.blue.backgroundColor;
};

// テーマに応じたテキスト色を取得する関数
export const getThemeTextColor = () => {
  const currentTheme = getCurrentTheme();
  const availableThemes = getAvailableThemes();
  
  if (availableThemes[currentTheme]) {
    return availableThemes[currentTheme].textColor;
  }
  
  // フォールバック
  return availableThemes.blue.textColor;
};

// 利用可能なテーマを取得する関数
export const getAvailableThemes = () => {
  return {
    primary: {
      name: "ピンク",
      description: "元のデザイン",
      backgroundColor: "bg-pink-500/80",
      textColor: "text-white"
    },
    blue: {
      name: "ブルー",
      description: "爽やかな青系",
      backgroundColor: "bg-blue-500/80",
      textColor: "text-white"
    },
    green: {
      name: "グリーン",
      description: "自然な緑系",
      backgroundColor: "bg-green-500/80",
      textColor: "text-white"
    },
    purple: {
      name: "パープル",
      description: "高級感のある紫系",
      backgroundColor: "bg-purple-500/80",
      textColor: "text-white"
    }
  };
}; 