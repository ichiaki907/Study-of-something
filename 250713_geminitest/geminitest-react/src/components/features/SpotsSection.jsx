import React, { useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import DetailModal from "./DetailModal";
import { getStampsData, getImageUrl, handleImageError } from "../../utils/stampUtils";

const SpotsSection = () => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    data: null,
  });

  // stamps.jsonからデータを取得
  const spots = getStampsData().locations;

  const handleSpotClick = (spot) => {
    setModalData({ isOpen: true, data: spot });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, data: null });
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="スポット情報">
        <div className="space-y-4">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSpotClick(spot)}
            >
              <div className="flex">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={getImageUrl(spot.image)}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {spot.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {spot.description}
                  </p>
                  <p className="text-xs text-gray-500">{spot.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionHeader>

      {/* 詳細モーダル */}
      <DetailModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        data={modalData.data}
        type="spot"
      />
    </div>
  );
};

export default SpotsSection;
