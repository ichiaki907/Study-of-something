import benefitsData from "../data/benefits.json";

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
