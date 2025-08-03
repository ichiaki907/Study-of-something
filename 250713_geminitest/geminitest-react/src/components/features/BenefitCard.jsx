import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const BenefitCard = ({ benefit, onButtonClick }) => {
  const { currentTheme } = useTheme();
  const [showUsage, setShowUsage] = useState(false);
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full">
      <div className="w-full aspect-square bg-gray-400"></div>
      <div className="p-5">
        <h3 className="text-base font-bold text-gray-800 mb-4">
          {benefit.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          取得条件：{benefit.condition}
        </p>

        {/* 利用方法トグル */}
        <div className="mb-5">
          <button
            onClick={() => setShowUsage(!showUsage)}
            className="flex items-center justify-between w-full text-left text-sm text-gray-600 transition-colors"
          >
            <span>利用方法・注意事項</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                showUsage ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showUsage && (
            <div className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">{benefit.description}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            console.log(
              "Button clicked:",
              benefit.id,
              "isActive:",
              benefit.isActive,
              "url:",
              benefit.url
            );
            if (benefit.isActive && benefit.url) {
              console.log("Opening URL:", benefit.url);
              window.open(benefit.url, "_blank");
            } else {
              console.log("Calling onButtonClick");
              onButtonClick(benefit.id);
            }
          }}
          disabled={!benefit.isActive}
          className={`w-full py-4 px-6 rounded-full font-bold text-white transition-all duration-300 ${
            benefit.isActive
              ? `bg-${currentTheme}-600 hover:bg-${currentTheme}-700 cursor-pointer`
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {benefit.buttonText}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
          ※条件達成後ボタン先ページで利用できます
        </p>
      </div>
    </div>
  );
};

export default BenefitCard;
