import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import StampIcon from "../ui/StampIcon";
import DetailModal from "./DetailModal";

const StampDisplay = ({
  collectedStamps,
  totalStamps,
  columns = 2,
  onColumnsChange,
  locations = [],
  config = {},
}) => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    data: null,
  });
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(false);

  const handleStampClick = (stampData) => {
    setModalData({ isOpen: true, data: stampData });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, data: null });
  };
  const { currentTheme } = useTheme();

  const handleColumnChange = (newColumns) => {
    if (onColumnsChange) {
      onColumnsChange(newColumns);
    }
  };

  return (
    <div className="w-full">
      {/* 列数切り替えボタン（設定で有効な場合のみ表示） */}
      {config.allowColumnToggle && (
        <div className="flex justify-end mb-4 space-x-1">
          <button
            onClick={() => handleColumnChange(2)}
            className={`p-1.5 rounded transition-all duration-200 ${
              columns === 2
                ? `bg-${currentTheme}-500 text-white shadow-sm`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="2列表示"
          >
          <div className="w-3 h-3">
            <div className="grid grid-cols-2 gap-0.5 w-full h-full">
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 2 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 2 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 2 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 2 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
            </div>
          </div>
        </button>
        <button
          onClick={() => handleColumnChange(3)}
          className={`p-1.5 rounded transition-all duration-200 ${
            columns === 3
              ? `bg-${currentTheme}-500 text-white shadow-sm`
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          title="3列表示"
        >
          <div className="w-3 h-3">
            <div className="grid grid-cols-3 gap-0.5 w-full h-full">
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 3 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 3 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 3 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 3 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 3 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`w-full h-full rounded-sm ${
                  columns === 3 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
            </div>
          </div>
        </button>
        </div>
      )}
      <div
        className={`grid gap-4 ${
          columns === 2 ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {locations.map((location, index) => (
          <StampIcon
            key={location.id}
            number={location.id}
            isStamped={location.isStamped}
            locationName={config.showLocationNames ? location.name : undefined}
            image={location.image}
            onClick={() =>
              handleStampClick({
                number: location.id,
                locationName: location.name,
                isStamped: location.isStamped,
                description: location.description,
                address: location.address,
                phone: location.phone,
                hours: location.hours,
                other: location.other,
                map: location.map,
                web: location.web,
                image: location.image,
              })
            }
          />
        ))}
      </div>

      {/* 注意書き */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <button
          onClick={() => setIsNoticeExpanded(!isNoticeExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="text-xs font-semibold text-gray-800">
            もしスタンプが反映されていない場合
          </h4>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              isNoticeExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isNoticeExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-xs text-gray-700 mt-2">
            スタンプ獲得から反映まで30秒程度要することがあります。反映されていない場合はしばらく後に更新してください。
          </p>
        </div>
      </div>

      {/* 共通モーダル */}
      <DetailModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        data={modalData.data}
        type="stamp"
      />
    </div>
  );
};

export default StampDisplay;
