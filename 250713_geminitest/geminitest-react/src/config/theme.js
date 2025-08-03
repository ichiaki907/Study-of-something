// テーマ設定
export const THEME_CONFIG = {
  // 使用するテーマ: "primary", "blue", "green", "purple"
  currentTheme: "blue",

  // 利用可能なテーマ
  availableThemes: {
    primary: {
      name: "ピンク",
      description: "元のデザイン",
    },
    blue: {
      name: "ブルー",
      description: "爽やかな青系",
    },
    green: {
      name: "グリーン",
      description: "自然な緑系",
    },
    purple: {
      name: "パープル",
      description: "高級感のある紫系",
    },
  },
};

// テーマを変更する関数
export const setTheme = (newTheme) => {
  if (THEME_CONFIG.availableThemes[newTheme]) {
    THEME_CONFIG.currentTheme = newTheme;
    console.log(`テーマを ${newTheme} に変更しました`);
  } else {
    console.error(`無効なテーマ: ${newTheme}`);
  }
};

// 現在のテーマを取得する関数
export const getCurrentTheme = () => {
  return THEME_CONFIG.currentTheme;
};
