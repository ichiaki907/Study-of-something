import benefitsData from "../data/benefits.json";

// デフォルトの特典画像URL
export const DEFAULT_BENEFIT_IMAGE_URL = "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop";

// 特典画像URLを取得する関数（フォールバック処理付き）
export const getBenefitImageUrl = (imageUrl) => {
  return imageUrl || DEFAULT_BENEFIT_IMAGE_URL;
};

// 特典画像エラーハンドリング関数
export const handleBenefitImageError = (event) => {
  event.target.src = DEFAULT_BENEFIT_IMAGE_URL;
};

// 特典データを取得する関数
export const getBenefitsData = () => {
  return benefitsData;
};

// 特典の状態を更新する関数
export const updateBenefitStatus = (benefitId, isActive) => {
  const benefit = benefitsData.find((b) => b.id === benefitId);
  if (benefit) {
    benefit.isActive = isActive;
    return true;
  }
  return false;
};
