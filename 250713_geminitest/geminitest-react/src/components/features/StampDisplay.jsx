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
}) => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    data: null,
  });

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
            locationName={location.name}
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
