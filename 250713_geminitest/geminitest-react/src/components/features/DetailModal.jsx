import React, { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const DetailModal = ({ isOpen, onClose, data, type = "stamp" }) => {
  const { currentTheme } = useTheme();

  // モーダルの開閉時にbodyのスクロールを制御
  useEffect(() => {
    if (isOpen) {
      // モーダルが開いている時はbodyのスクロールを無効化
      document.body.style.overflow = 'hidden';
    } else {
      // モーダルが閉じている時はbodyのスクロールを有効化
      document.body.style.overflow = 'unset';
    }

    // コンポーネントのアンマウント時にbodyのスクロールを復元
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  // データから表示する情報を取得
  const getDisplayData = () => {
    if (type === "stamp") {
      return {
        title: data.locationName,
        description: data.description,
        address: data.address,
        phone: data.phone,
        hours: data.hours,
        other: data.other,
        map: data.map,
        web: data.web,
        image: data.image,
        number: data.number,
        isStamped: data.isStamped,
      };
    } else {
      // spot
      return {
        title: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        hours: data.hours,
        other: data.other,
        map: data.map,
        web: data.web,
        image: data.image,
        id: data.id,
      };
    }
  };

  const displayData = getDisplayData();

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-out animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* フルスクリーンモーダル */}
      <div className="absolute inset-0 bg-white transform transition-all duration-400 ease-out animate-slideIn">
        {/* 右上のバツボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* コンテンツ */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* コンテンツコンテナ - スマホ幅に制限 */}
          <div className="w-full max-w-md mx-auto h-full">
            {/* 画像 - レスポンシブ */}
            <div className="w-full h-1/2 px-4 sm:px-6 md:px-8 flex-shrink-0">
              <div className="w-full h-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <img
                  src={displayData.image || "/logo192.png"}
                  alt={displayData.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* タイトルとアンダーバー */}
            <div className="flex flex-col items-center mt-2.5 mb-4 px-4 sm:px-6 md:px-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2.5">
                {displayData.title}
              </h2>
              <div
                className="w-16 h-0.5 mb-6"
                style={{
                  backgroundColor:
                    currentTheme === "blue"
                      ? "#3b82f6"
                      : currentTheme === "green"
                      ? "#10b981"
                      : currentTheme === "purple"
                      ? "#8b5cf6"
                      : "#ec4899", // primary (pink)
                }}
              ></div>
              <p className="text-sm text-gray-600 text-left px-6 leading-relaxed w-full">
                {displayData.description ||
                  "この場所についての詳細情報がここに表示されます。"}
              </p>

              {/* 詳細情報セクション */}
              <div className="w-full px-6 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {type === "stamp" ? "スタンプ情報" : "スポット情報"}
                </h3>
                <div className="space-y-2">
                  {displayData.address && (
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-600 w-16 flex-shrink-0">
                        住所：
                      </span>
                      <span className="text-xs text-gray-700 flex-1">
                        {displayData.address}
                      </span>
                    </div>
                  )}
                  {displayData.phone && (
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-600 w-16 flex-shrink-0">
                        電話：
                      </span>
                      <span className="text-xs text-gray-700 flex-1">
                        {displayData.phone}
                      </span>
                    </div>
                  )}
                  {displayData.hours && (
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-600 w-16 flex-shrink-0">
                        営業時間：
                      </span>
                      <span className="text-xs text-gray-700 flex-1">
                        {displayData.hours}
                      </span>
                    </div>
                  )}
                  {displayData.other && (
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-600 w-16 flex-shrink-0">
                        その他：
                      </span>
                      <span className="text-xs text-gray-700 flex-1">
                        {displayData.other}
                      </span>
                    </div>
                  )}
                  {type === "stamp" && (
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-600 w-16 flex-shrink-0">
                        獲得状況：
                      </span>
                      <span className="text-xs text-gray-700 flex-1">
                        {displayData.isStamped ? "獲得済み" : "未獲得"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* MAPとWEBボタン */}
              {(displayData.map || displayData.web) && (
                <div className="flex space-x-4 w-full justify-start px-6 mt-6 mb-6">
                  {displayData.map && (
                    <button
                      onClick={() => window.open(displayData.map, "_blank")}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">MAP</span>
                    </button>
                  )}
                  {displayData.web && (
                    <button
                      onClick={() => window.open(displayData.web, "_blank")}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                        />
                      </svg>
                      <span className="text-sm font-medium">WEB</span>
                    </button>
                  )}
                </div>
              )}

              {/* 下部の余白 */}
              <div className="h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
