import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { getImageUrl, handleImageError } from "../../utils/stampUtils";
import { getModernButtonStyle } from "../../utils/app-utils";

const DetailModal = ({ isOpen, onClose, data, type = "stamp" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const modalRef = useRef(null);
  const { currentTheme } = useTheme();
  
  // モダンボタンスタイルを取得
  const modernButtonStyle = getModernButtonStyle();

  // モーダルの開閉時にbodyのスクロールを制御
  useEffect(() => {
    if (isOpen) {
      // モーダルが開いている時はbodyのスクロールを無効化
      document.body.style.overflow = 'hidden';
      // 初期化フラグを設定
      setTimeout(() => setIsInitialized(true), 10);
    } else {
      // モーダルが閉じている時はbodyのスクロールを有効化
      document.body.style.overflow = 'unset';
      setIsInitialized(false);
    }

    // コンポーネントのアンマウント時にbodyのスクロールを復元
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // グラブバーのタッチイベントハンドラー
  const handleGrabBarTouchStart = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleGrabBarTouchMove = (e) => {
    e.stopPropagation();
    if (!isDragging) return;
    const touchY = e.touches[0].clientY;
    setCurrentY(touchY);
  };

  const handleGrabBarTouchEnd = (e) => {
    e.stopPropagation();
    if (!isDragging) return;

    const deltaY = currentY - startY;
    const threshold = 100; // 閉じるための閾値

    if (deltaY > threshold) {
      // 閉じるアニメーションを開始
      setIsClosing(true);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 300); // アニメーション時間
    }

    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

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

  // ドラッグ中のスタイル計算
  const getModalStyle = () => {
    if (isClosing) {
      return {
        transform: 'translateY(100%)',
        transition: 'transform 0.3s ease-out',
      };
    }
    
    if (isDragging) {
      const translateY = Math.max(0, currentY - startY);
      return {
        transform: `translateY(${translateY}px)`,
        transition: 'none',
        opacity: Math.max(0.7, 1 - translateY / 500),
      };
    }
    
    return {
      transform: isOpen && isInitialized ? 'translateY(0)' : 'translateY(100%)',
      transition: isInitialized ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
    };
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300 ease-out"
        style={{
          opacity: isOpen ? 0.5 : 0,
        }}
        onClick={onClose}
      ></div>

      {/* ボトムシートモーダル */}
      <div
        ref={modalRef}
        className="absolute inset-0 bg-white transform"
        style={{
          ...getModalStyle(),
          touchAction: 'none',
        }}
      >
        {/* グラブバー */}
        <div 
          className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleGrabBarTouchStart}
          onTouchMove={handleGrabBarTouchMove}
          onTouchEnd={handleGrabBarTouchEnd}
          style={{ touchAction: 'none' }}
        >
          <div
            className={`w-12 h-1 rounded-full transition-colors duration-200 ${
              isDragging ? "bg-gray-500" : "bg-gray-300"
            }`}
          ></div>
        </div>

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
        <div 
          className="flex flex-col h-full overflow-y-auto"
          style={{ 
            touchAction: 'pan-y' // 縦方向のスクロールのみ許可
          }}
        >
          {/* コンテンツコンテナ - スマホ幅に制限 */}
          <div className="w-full max-w-md mx-auto h-full">
            {/* 画像 - レスポンシブ */}
            <div className="w-full h-64 px-4 sm:px-6 md:px-8 flex-shrink-0">
              <div className="w-full h-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <img
                  src={getImageUrl(displayData.image)}
                  alt={displayData.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  onError={handleImageError}
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
                        {displayData.isStamped ? "獲得済" : "未獲得"}
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
                      className={`flex items-center space-x-2 px-4 py-2 ${modernButtonStyle.base} ${modernButtonStyle.hover} ${modernButtonStyle.shadow} ${modernButtonStyle.transition} rounded-lg`}
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
                      <span className="text-sm font-bold">MAP</span>
                    </button>
                  )}
                  {displayData.web && (
                    <button
                      onClick={() => window.open(displayData.web, "_blank")}
                      className={`flex items-center space-x-2 px-4 py-2 ${modernButtonStyle.base} ${modernButtonStyle.hover} ${modernButtonStyle.shadow} ${modernButtonStyle.transition} rounded-lg`}
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
                      <span className="text-sm font-bold">WEB</span>
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
