// キービジュアル設定のサンプル例（画像設定のみ）

// 1. 基本的な画像設定
export const basicImageExample = {
  image: {
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop",
    alt: "東京の街並み",
    overlay: "rgba(0, 0, 0, 0.3)",
  },
  text: {
    enabled: true,
    title: "スタンプラリー",
    description: "スタンプを集めて素敵な特典をゲットしよう！",
    color: "text-white",
  },
};

// 2. オーバーレイなしの設定
export const noOverlayExample = {
  image: {
    url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop",
    alt: "桜の公園",
    overlay: "", // オーバーレイなし
  },
  text: {
    enabled: true,
    title: "春のスタンプラリー",
    description: "桜の季節にスタンプを集めよう！",
    color: "text-white",
  },
};

// 3. テキストなしの設定
export const imageOnlyExample = {
  image: {
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    alt: "アニメ・ゲーム",
    overlay: "rgba(0, 0, 0, 0.2)",
  },
  text: {
    enabled: false, // テキストを無効化
  },
};

// 4. ワイドアスペクト比の設定
export const wideAspectExample = {
  image: {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    alt: "海辺の景色",
    overlay: "rgba(0, 0, 0, 0.4)",
  },
  aspectRatio: "aspect-video", // 横長のアスペクト比
  text: {
    enabled: true,
    title: "海辺のスタンプラリー",
    description: "海の風を感じながらスタンプを集めよう！",
    color: "text-white",
  },
};

// 5. カスタムテキストカラーの設定
export const customTextColorExample = {
  image: {
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    alt: "アート作品",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    enabled: true,
    title: "アートスタンプラリー",
    description: "芸術作品を巡ってスタンプを集めよう！",
    color: "text-yellow-300", // カスタムテキストカラー
  },
};

// 6. 開催期間表示なしの設定
export const noEventPeriodExample = {
  image: {
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
    alt: "伝統建築",
    overlay: "rgba(0, 0, 0, 0.3)",
  },
  text: {
    enabled: true,
    title: "伝統文化スタンプラリー",
    description: "日本の伝統文化を巡ってスタンプを集めよう！",
    color: "text-white",
  },
  eventPeriod: {
    enabled: false, // 開催期間表示を無効化
  },
};

// 7. 完全カスタムの設定
export const fullCustomExample = {
  image: {
    url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    alt: "NFTアート",
    overlay: "rgba(59, 130, 246, 0.6)", // 青系のオーバーレイ
  },
  aspectRatio: "aspect-[4/3]", // カスタムアスペクト比
  text: {
    enabled: true,
    title: "NFTスタンプラリー",
    description: "デジタルアートを集めて特別なNFTをゲット！",
    color: "text-white",
  },
  eventPeriod: {
    enabled: true,
    color: "text-white",
  },
}; 