import React, { useState, useRef } from "react";
import KeyVisual from "../features/KeyVisual";
import StampProgressBar from "../ui/StampProgressBar";
import StampDisplay from "../features/StampDisplay";
import SectionHeader from "../ui/SectionHeader";
import BenefitCard from "../features/BenefitCard";
import BottomNavigation from "./BottomNavigation";
import DetailModal from "../features/DetailModal";
import { getBenefitsData } from "../../utils/benefitUtils";
import { getStampsData, getStampStatus } from "../../utils/stampUtils";

const NFTBenefitsPage = () => {
  // ローカルストレージから列数を取得、デフォルトは2
  const [stampColumns, setStampColumns] = useState(() => {
    const saved = localStorage.getItem("stampColumns");
    return saved ? parseInt(saved, 10) : 2;
  });

  const [activeTab, setActiveTab] = useState("home");
  const [modalData, setModalData] = useState({
    isOpen: false,
    data: null,
    type: "stamp",
  });

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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white shadow-lg relative">
        <KeyVisual />

        {/* スタンプセクション */}
        <div
          ref={stampSectionRef}
          className="bg-white shadow-md overflow-hidden"
        >
          <div className="grid grid-cols-1 gap-4 p-4">
            <StampProgressBar
              collectedStamps={stampStatus.collected}
              totalStamps={stampStatus.total}
            />
            <StampDisplay
              collectedStamps={stampStatus.collected}
              totalStamps={stampStatus.total}
              columns={stampColumns}
              onColumnsChange={handleColumnsChange}
              locations={getStampsData().locations}
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
                    className={`absolute top-2 right-2 z-10 inline-block px-2 py-1 text-xs font-medium rounded-full shadow-sm ${
                      location.isStamped
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {location.isStamped ? "獲得済み" : "未獲得"}
                  </span>

                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="w-20 h-20 flex-shrink-0 mr-4">
                        <img
                          src={location.image || "/logo192.png"}
                          alt={location.name}
                          className="w-full h-full object-cover rounded-md"
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
                                className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors duration-200"
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
                                className="flex items-center space-x-1 px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors duration-200"
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

        {/* 下部の余白 */}
        <div className="h-20 bg-white"></div>

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
