import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const StampProgressBar = ({ collectedStamps, totalStamps }) => {
  const { currentTheme } = useTheme();
  const progressPercentage = (collectedStamps / totalStamps) * 100;

  return (
    <div className="px-4 pb-4">
      <div className="mt-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">
            スタンプ獲得数
          </span>
          <span className="text-sm font-semibold text-gray-700">
            {collectedStamps}/{totalStamps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`bg-${currentTheme}-500 h-2.5 rounded-full`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StampProgressBar;
