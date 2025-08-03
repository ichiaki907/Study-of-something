import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { APP_CONFIG } from "../../config/appConfig";

const KeyVisual = () => {
  const { currentTheme } = useTheme();
  return (
    <div
      className={`w-full bg-gradient-to-br from-${currentTheme}-400 to-${currentTheme}-600`}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="aspect-square flex items-center justify-center relative overflow-hidden">
          {/* 背景の装飾要素 */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${currentTheme}-300/20 to-${currentTheme}-500/20`}
          ></div>

          {/* メインコンテンツ */}
          <div className="relative z-10 text-center text-white px-6">
            <div className="mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {APP_CONFIG.appInfo.name}
            </h1>

            <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">
              {APP_CONFIG.appInfo.description}
            </p>

            {/* 装飾的な要素 */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/3 right-6 w-3 h-3 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* 開催期間 */}
        <div className="bg-white/10 backdrop-blur-sm">
          <div className="w-full px-3 py-3">
            <p className="text-white text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-center">
              {APP_CONFIG.eventPeriod.displayFormat
                .replace("{startDate}", APP_CONFIG.eventPeriod.startDate)
                .replace("{endDate}", APP_CONFIG.eventPeriod.endDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyVisual;
