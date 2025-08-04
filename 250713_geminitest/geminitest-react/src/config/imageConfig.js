// 画像設定の一元管理
export const IMAGE_CONFIG = {
  // デフォルト画像URL
  defaults: {
    stamp: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop",
    benefit: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop",
    nft: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
  },
  
  // 画像サイズ設定
  sizes: {
    small: "w=200&h=150&fit=crop",
    medium: "w=400&h=300&fit=crop",
    large: "w=800&h=600&fit=crop",
  },
  
  // 画像品質設定
  quality: {
    low: "&q=50",
    medium: "&q=75",
    high: "&q=100",
  }
};

// 画像URLを生成する関数
export const generateImageUrl = (baseUrl, size = 'medium', quality = 'medium') => {
  if (!baseUrl) return IMAGE_CONFIG.defaults.stamp;
  
  const sizeParams = IMAGE_CONFIG.sizes[size];
  const qualityParams = IMAGE_CONFIG.quality[quality];
  
  // 既にパラメータが含まれている場合はそのまま返す
  if (baseUrl.includes('?')) {
    return baseUrl;
  }
  
  return `${baseUrl}?${sizeParams}${qualityParams}`;
};

// 画像の種類に応じたデフォルト画像を取得
export const getDefaultImage = (type = 'stamp') => {
  return IMAGE_CONFIG.defaults[type] || IMAGE_CONFIG.defaults.stamp;
}; 