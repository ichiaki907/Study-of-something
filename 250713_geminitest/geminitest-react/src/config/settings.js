import appSettings from '../data/app-settings.json';

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