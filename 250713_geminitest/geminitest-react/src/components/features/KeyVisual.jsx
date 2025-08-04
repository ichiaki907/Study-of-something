import React from "react";
import { getKeyVisual, getAppInfo, getEventPeriod, getThemeBackgroundColor, getThemeTextColor } from "../../utils/app-utils";

const KeyVisual = () => {
  const config = getKeyVisual();
  const appInfo = getAppInfo();
  const eventPeriod = getEventPeriod();
  const [imageError, setImageError] = React.useState(false);
  const themeBackgroundColor = getThemeBackgroundColor();
  const themeTextColor = getThemeTextColor();
  
  // 画像が設定されていない場合、または画像エラーの場合のフォールバック
  if (!config.image.url || imageError) {
    return (
      <div className="w-full bg-gray-200">
        <div className="w-full max-w-md mx-auto">
          <div className="aspect-square flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">キービジュアル画像を設定してください</p>
              <p className="text-sm">app-settings.json の keyVisual.image.url に画像URLを設定してください</p>
            </div>
          </div>
        </div>
        
        {/* 開催期間（画像がない場合でも表示） */}
        {eventPeriod.showOnKeyVisual && (
          <div className={`${eventPeriod.backgroundColor || themeBackgroundColor}`}>
            <div className="w-full px-3 py-3">
              <p className={`text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-center ${eventPeriod.textColor || themeTextColor}`}>
                {eventPeriod.displayFormat
                  .replace("{startDate}", eventPeriod.startDate)
                  .replace("{endDate}", eventPeriod.endDate)}
              </p>
            </div>
          </div>
        )}
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
            onError={() => setImageError(true)}
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
                {config.text.title || appInfo.name}
              </h1>
              <p className={`text-xs sm:text-sm md:text-base opacity-90 leading-relaxed ${config.text.color}`}>
                {config.text.description || appInfo.description}
              </p>
            </div>
          )}
        </div>

        {/* 開催期間 */}
        {eventPeriod.showOnKeyVisual && (
          <div className={`${eventPeriod.backgroundColor || themeBackgroundColor} backdrop-blur-sm`}>
            <div className="w-full px-3 py-3">
              <p className={`text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-center ${eventPeriod.textColor || themeTextColor}`}>
                {eventPeriod.displayFormat
                  .replace("{startDate}", eventPeriod.startDate)
                  .replace("{endDate}", eventPeriod.endDate)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyVisual;
