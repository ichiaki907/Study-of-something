import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { getImageUrl, handleImageError } from "../../utils/stampUtils";

const StampIcon = ({ number, isStamped, locationName, onClick, image }) => {
  const { currentTheme } = useTheme();
  const stampedClasses = `bg-${currentTheme}-500 text-white`;
  const unstampedClasses = "bg-gray-200 text-gray-400";

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-full aspect-square rounded-lg flex items-center justify-center font-bold text-3xl cursor-pointer transition-transform hover:scale-105 ${
          isStamped ? stampedClasses : unstampedClasses
        }`}
        onClick={onClick}
      >
        {isStamped ? (
          <img
            src={getImageUrl(image)}
            alt={`スタンプ${number}`}
            className="w-full h-full object-cover rounded-lg"
            onError={handleImageError}
          />
        ) : (
          number
        )}
      </div>
      <p
        className="text-xs text-gray-600 mt-2 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          lineHeight: "1.2em",
          maxHeight: "2.4em",
        }}
      >
        {locationName}
      </p>
    </div>
  );
};

export default StampIcon;
