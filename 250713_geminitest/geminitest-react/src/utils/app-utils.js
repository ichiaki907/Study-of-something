import appSettings from '../data/app-settings.json';
import imageConfig from '../config/image-config.json';
import howToParticipateConfig from '../data/how-to-participate.json';

// ===== 設定関連の関数 =====

// 設定を取得する関数
export const getSettings = () => appSettings;

// 特定の設定セクションを取得する関数
export const getAppInfo = () => appSettings.appInfo;
export const getEventPeriod = () => appSettings.eventPeriod;
export const getKeyVisual = () => appSettings.keyVisual;
export const getImages = () => imageConfig;
export const getStampDisplay = () => appSettings.stampDisplay;
export const getFavicon = () => appSettings.appInfo.favicon;
export const getHowToParticipate = () => howToParticipateConfig;

// フッター関連の設定を取得する関数
export const getFooterConfig = () => appSettings.footer;
export const getFooterLinksConfig = () => appSettings.footer.links;
export const getSocialMediaConfig = () => appSettings.footer.socialMedia;
export const getCopyrightInfo = () => appSettings.footer.copyright;

// ページタイトルを設定する関数
export const setPageTitle = () => {
  const title = appSettings.appInfo.pageTitle;
  document.title = title;
  return title;
};

// ファビコンを設定する関数
export const setFavicon = () => {
  const faviconPath = getFavicon();
  
  // 固定のファビコン設定
  const faviconConfig = {
    path: faviconPath,
    sizes: ["16x16", "32x32", "192x192", "512x512"],
    type: "image/x-icon"
  };

  // 既存のファビコンリンクを削除
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach((link) => link.remove());

  // 新しいファビコンリンクを追加
  faviconConfig.sizes.forEach((size) => {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = faviconConfig.type;
    link.href = faviconConfig.path;
    if (size !== "16x16") {
      link.sizes = size;
    }
    document.head.appendChild(link);
  });
};

// 画像URLを生成する関数
export const generateImageUrl = (baseUrl, size = 'medium', quality = 'medium') => {
  if (!baseUrl) return imageConfig.defaults.stamp;
  
  const sizeParams = imageConfig.sizes[size];
  const qualityParams = imageConfig.quality[quality];
  
  // 既にパラメータが含まれている場合はそのまま返す
  if (baseUrl.includes('?')) {
    return baseUrl;
  }
  
  return `${baseUrl}?${sizeParams}${qualityParams}`;
};

// デフォルト画像を取得する関数
export const getDefaultImage = (type = 'stamp') => {
  return imageConfig.defaults[type] || imageConfig.defaults.stamp;
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
  const themeColor = getThemeColor();
  
  // 開催期間用の背景色（primaryより少し薄い色）
  const backgroundMap = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    teal: 'bg-teal-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500'
  };
  
  return backgroundMap[themeColor] || backgroundMap.green;
};

// テーマに応じたテキスト色を取得する関数
export const getThemeTextColor = () => {
  // 開催期間用のテキスト色（白文字で統一）
  return 'text-white';
};

// キーカラーに基づいて動的に配色を生成する関数
export const getThemeColors = (themeColor = 'green') => {
  const colorMap = {
    green: {
      primary: 'bg-green-600',
      primaryText: 'text-green-600',
      primaryHover: 'hover:bg-green-700',
      secondary: 'bg-emerald-500',
      secondaryHover: 'hover:bg-emerald-600',
      accent: 'bg-teal-500',
      accentHover: 'hover:bg-teal-600',
      text: 'text-white'
    },
    blue: {
      primary: 'bg-blue-600',
      primaryText: 'text-blue-600',
      primaryHover: 'hover:bg-blue-700',
      secondary: 'bg-cyan-500',
      secondaryHover: 'hover:bg-cyan-600',
      accent: 'bg-indigo-500',
      accentHover: 'hover:bg-indigo-600',
      text: 'text-white'
    },
    purple: {
      primary: 'bg-purple-600',
      primaryText: 'text-purple-600',
      primaryHover: 'hover:bg-purple-700',
      secondary: 'bg-violet-500',
      secondaryHover: 'hover:bg-violet-600',
      accent: 'bg-fuchsia-500',
      accentHover: 'hover:bg-fuchsia-600',
      text: 'text-white'
    },
    red: {
      primary: 'bg-red-600',
      primaryText: 'text-red-600',
      primaryHover: 'hover:bg-red-700',
      secondary: 'bg-pink-500',
      secondaryHover: 'hover:bg-pink-600',
      accent: 'bg-rose-500',
      accentHover: 'hover:bg-rose-600',
      text: 'text-white'
    },
    orange: {
      primary: 'bg-orange-600',
      primaryText: 'text-orange-600',
      primaryHover: 'hover:bg-orange-700',
      secondary: 'bg-amber-500',
      secondaryHover: 'hover:bg-amber-600',
      accent: 'bg-yellow-500',
      accentHover: 'hover:bg-yellow-600',
      text: 'text-white'
    },
    teal: {
      primary: 'bg-teal-600',
      primaryText: 'text-teal-600',
      primaryHover: 'hover:bg-teal-700',
      secondary: 'bg-cyan-500',
      secondaryHover: 'hover:bg-cyan-600',
      accent: 'bg-blue-500',
      accentHover: 'hover:bg-blue-600',
      text: 'text-white'
    },
    indigo: {
      primary: 'bg-indigo-600',
      primaryText: 'text-indigo-600',
      primaryHover: 'hover:bg-indigo-700',
      secondary: 'bg-blue-500',
      secondaryHover: 'hover:bg-blue-600',
      accent: 'bg-purple-500',
      accentHover: 'hover:bg-purple-600',
      text: 'text-white'
    },
    pink: {
      primary: 'bg-pink-600',
      primaryText: 'text-pink-600',
      primaryHover: 'hover:bg-pink-700',
      secondary: 'bg-rose-500',
      secondaryHover: 'hover:bg-rose-600',
      accent: 'bg-fuchsia-500',
      accentHover: 'hover:bg-fuchsia-600',
      text: 'text-white'
    }
  };

  return colorMap[themeColor] || colorMap.green;
};

// モダンな白黒ベースのボタンスタイルを取得する関数
export const getModernButtonStyle = () => {
  return {
    base: 'bg-white border border-gray-300 text-gray-700',
    hover: 'hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900',
    shadow: 'shadow-sm',
    transition: 'transition-all duration-200 ease-in-out'
  };
};

// キーカラーを取得する関数
export const getThemeColor = () => {
  const appSettings = require('../data/app-settings.json');
  return appSettings.appInfo.themeColor || 'green';
};

// キーカラーに基づいたテキスト色を取得する関数
export const getThemeTextColorForButtons = () => {
  const themeColor = getThemeColor();
  
  const textColorMap = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
    teal: 'text-teal-600',
    indigo: 'text-indigo-600',
    pink: 'text-pink-600'
  };
  
  return textColorMap[themeColor] || textColorMap.green;
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