import React, { useState, useRef, useEffect } from "react";
import KeyVisual from "../features/KeyVisual";
import StampProgressBar from "../ui/StampProgressBar";
import StampDisplay from "../features/StampDisplay";
import SectionHeader from "../ui/SectionHeader";
import BenefitCard from "../features/BenefitCard";
import BottomNavigation from "./BottomNavigation";
import DetailModal from "../features/DetailModal";
import HowToParticipate from "../features/HowToParticipate";
import Footer from "./Footer";
import { getBenefitsData } from "../../utils/benefitUtils";
import { getStampsData, getStampStatus, getImageUrl, handleImageError } from "../../utils/stampUtils";
import { getThemeColors, getThemeColor, getModernButtonStyle, getStampDisplay } from "../../utils/app-utils";

const NFTBenefitsPage = ({ activeTab: externalActiveTab, onTabChange }) => {
  // テーマカラーを取得
  const themeColor = getThemeColor();
  const themeColors = getThemeColors(themeColor);
  const modernButtonStyle = getModernButtonStyle();
  
  // StampDisplayの設定を取得
  const stampDisplayConfig = getStampDisplay();

  // ローカルストレージから列数を取得、設定ファイルのデフォルト値を使用
  const [stampColumns, setStampColumns] = useState(() => {
    const saved = localStorage.getItem("stampColumns");
    return saved ? parseInt(saved, 10) : stampDisplayConfig.defaultColumns || 2;
  });

  const [activeTab, setActiveTab] = useState(externalActiveTab || "home");
  const [modalData, setModalData] = useState({
    isOpen: false,
    data: null,
    type: "stamp",
  });

  // スクロール位置に基づいてアクティブタブを更新する関数
  const updateActiveTabOnScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 各セクションの位置を取得
    const stampSectionTop = stampSectionRef.current?.offsetTop || 0;
    const benefitsSectionTop = benefitsSectionRef.current?.offsetTop || 0;
    const spotsSectionTop = spotsSectionRef.current?.offsetTop || 0;

    // スクロール位置に基づいてタブを決定
    if (scrollY < stampSectionTop - windowHeight * 0.3) {
      setActiveTab("home");
    } else if (scrollY < benefitsSectionTop - windowHeight * 0.3) {
      setActiveTab("stamps");
    } else if (scrollY < spotsSectionTop - windowHeight * 0.3) {
      setActiveTab("benefits");
    } else {
      setActiveTab("spots");
    }
  };

  // スタンプの状態を取得
  const stampStatus = getStampStatus();

  // 特典の状態を動的に計算
  const benefits = getBenefitsData().map((benefit) => ({
    ...benefit,
    isActive: stampStatus.collected >= benefit.stampCount,
    buttonText:
      stampStatus.collected >= benefit.stampCount
        ? "特典を利用する"
        : "条件未達成です",
  }));

  // 列数変更時にローカルストレージに保存
  const handleColumnsChange = (newColumns) => {
    setStampColumns(newColumns);
    localStorage.setItem("stampColumns", newColumns.toString());
  };

  const handleSpotClick = (spotData) => {
    setModalData({ isOpen: true, data: spotData, type: "spot" });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, data: null, type: "stamp" });
  };

  const stampSectionRef = useRef(null);
  const benefitsSectionRef = useRef(null);
  const spotsSectionRef = useRef(null);

  // 外部のactiveTabが変更されたときに内部状態を更新
  useEffect(() => {
    if (externalActiveTab && externalActiveTab !== activeTab) {
      setActiveTab(externalActiveTab);
    }
  }, [externalActiveTab, activeTab]);

  // スクロール監視と背景色統一のためのuseEffect
  useEffect(() => {
    // ページ全体の背景色を白に統一（最小限の設定）
    document.documentElement.style.backgroundColor = 'white';
    
    // スクロールイベントリスナーを追加
    const handleScroll = () => {
      updateActiveTabOnScroll();
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.documentElement.style.backgroundColor = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }

    // 手動クリック時は一時的にスクロール監視を無効化
    const handleScrollEnd = () => {
      setTimeout(() => {
        window.addEventListener('scroll', updateActiveTabOnScroll);
      }, 1000); // 1秒後にスクロール監視を再開
    };

    // スクロール監視を一時的に無効化
    window.removeEventListener('scroll', updateActiveTabOnScroll);

    // 即座にスムーズスクロール
    switch (tabId) {
      case "stamps":
        stampSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "benefits":
        benefitsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "spots":
        spotsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      default:
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // スクロール完了後に監視を再開
    setTimeout(handleScrollEnd, 1000);
  };

  const handleButtonClick = (benefitId) => {
    const benefit = benefits.find((b) => b.id === benefitId);
    if (benefit?.isActive) {
      console.log(`特典ID: ${benefitId} がクリックされました`);
      // ここに特典利用時の処理を実装
      alert(`${benefit.title}を利用します`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto bg-white shadow-lg relative min-h-screen">
        <KeyVisual />

        {/* スタンプセクション */}
        <div
          ref={stampSectionRef}
          className="bg-white shadow-md overflow-hidden"
        >
          <div className="grid grid-cols-1 gap-4 p-4">
            {/* プログレスバー（設定で有効な場合のみ表示） */}
            {stampDisplayConfig.showProgressBar && (
              <StampProgressBar
                collectedStamps={stampStatus.collected}
                totalStamps={stampStatus.total}
              />
            )}
            <StampDisplay
              collectedStamps={stampStatus.collected}
              totalStamps={stampStatus.total}
              columns={stampColumns}
              onColumnsChange={handleColumnsChange}
              locations={getStampsData().locations}
              config={stampDisplayConfig}
            />
          </div>
        </div>

        {/* 特典セクション */}
        <div ref={benefitsSectionRef}>
          <SectionHeader title="特典">
            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  benefit={benefit}
                  onButtonClick={handleButtonClick}
                />
              ))}
            </div>
          </SectionHeader>
        </div>

        {/* スポットセクション */}
        <div ref={spotsSectionRef}>
          <SectionHeader title="獲得スポット">
            <div className="space-y-4">
              {getStampsData().locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 relative"
                  onClick={() => handleSpotClick(location)}
                >
                  {/* 獲得状況ラベル */}
                  <span
                    className={`absolute top-2 right-2 z-10 inline-block px-2 py-1 text-xs font-bold rounded-full shadow-sm ${
                      location.isStamped
                        ? `${themeColors.primary} ${themeColors.text}`
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {location.isStamped ? "獲得済" : "未獲得"}
                  </span>

                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="w-20 h-20 flex-shrink-0 mr-4">
                        <img
                          src={getImageUrl(location.image)}
                          alt={location.name}
                          className="w-full h-full object-cover rounded-md"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-base font-semibold text-gray-800 mb-2 overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: "1.2em",
                            maxHeight: "2.4em",
                            paddingRight: "60px",
                          }}
                        >
                          {location.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          {location.address}
                        </p>

                        {/* MAPとWEBボタン */}
                        {(location.map || location.web) && (
                          <div className="flex space-x-2">
                            {location.map && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(location.map, "_blank");
                                }}
                                className={`flex items-center space-x-1 px-2 py-1 ${modernButtonStyle.base} ${modernButtonStyle.hover} ${modernButtonStyle.shadow} ${modernButtonStyle.transition} rounded text-xs font-bold`}
                              >
                                <svg
                                  className="w-3 h-3"
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
                                <span>MAP</span>
                              </button>
                            )}
                            {location.web && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(location.web, "_blank");
                                }}
                                className={`flex items-center space-x-1 px-2 py-1 ${modernButtonStyle.base} ${modernButtonStyle.hover} ${modernButtonStyle.shadow} ${modernButtonStyle.transition} rounded text-xs font-bold`}
                              >
                                <svg
                                  className="w-3 h-3"
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
                                <span>WEB</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionHeader>
        </div>

        {/* 参加方法セクション */}
        <div className="bg-white shadow-md overflow-hidden">
          <SectionHeader title="参加方法">
            <HowToParticipate />
          </SectionHeader>
        </div>

        {/* フッター */}
        <Footer />

        {/* 下部の余白 - ボトムナビゲーションの高さ分を確保 */}
        <div className="h-12 bg-white"></div>

        {/* ボトムナビゲーション */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md">
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        <DetailModal
          isOpen={modalData.isOpen}
          onClose={closeModal}
          data={modalData.data}
          type={modalData.type}
        />
      </div>
    </div>
  );
};

export default NFTBenefitsPage;
