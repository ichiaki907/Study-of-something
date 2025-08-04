import React from "react";
import { getKeyVisualConfig, APP_CONFIG } from "../../config/appConfig";

const KeyVisual = () => {
  const config = getKeyVisualConfig();
  
  // 画像が設定されていない場合のフォールバック
  if (!config.image.url) {
    return (
      <div className="w-full bg-gray-200">
        <div className="w-full max-w-md mx-auto">
          <div className="aspect-square flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">キービジュアル画像を設定してください</p>
              <p className="text-sm">appConfig.js の keyVisual.image.url に画像URLを設定してください</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto">
        <div className={`${config.aspectRatio} relative overflow-hidden`}>
          {/* 背景画像 */}
          <img
            src={config.image.url}
            alt={config.image.alt}
            className="w-full h-full object-cover"
          />
          
          {/* オーバーレイ */}
          {config.image.overlay && (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: config.image.overlay }}
            />
          )}

          {/* テキストコンテンツ */}
          {config.text.enabled && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${config.text.color}`}>
                {config.text.title || APP_CONFIG.appInfo.name}
              </h1>
              <p className={`text-xs sm:text-sm md:text-base opacity-90 leading-relaxed ${config.text.color}`}>
                {config.text.description || APP_CONFIG.appInfo.description}
              </p>
            </div>
          )}
        </div>

        {/* 開催期間 */}
        {config.eventPeriod.enabled && (
          <div className="bg-white/10 backdrop-blur-sm">
            <div className="w-full px-3 py-3">
              <p className={`text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-center ${config.eventPeriod.color}`}>
                {APP_CONFIG.eventPeriod.displayFormat
                  .replace("{startDate}", APP_CONFIG.eventPeriod.startDate)
                  .replace("{endDate}", APP_CONFIG.eventPeriod.endDate)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyVisual;
