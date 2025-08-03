import stampsData from "../data/stamps.json";

// スタンプの状態を管理する関数
export const getStampStatus = () => {
  const total = stampsData.locations.length;
  const collected = stampsData.locations.filter(
    (location) => location.isStamped
  ).length;
  return {
    total: total,
    collected: collected,
    remaining: total - collected,
    progress: (collected / total) * 100,
  };
};

// スタンプを獲得する関数
export const collectStamp = (stampId) => {
  const stamp = stampsData.locations.find(
    (location) => location.id === stampId
  );
  if (stamp && !stamp.isStamped) {
    stamp.isStamped = true;
    return true;
  }
  return false;
};

// スタンプの場所名のみを取得する関数
export const getLocationNames = () => {
  return stampsData.locations.map((location) => location.name);
};

// スタンプデータを取得する関数
export const getStampsData = () => {
  return stampsData;
};
