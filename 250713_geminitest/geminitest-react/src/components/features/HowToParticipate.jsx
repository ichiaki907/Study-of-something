import React, { useState, useEffect } from 'react';
import { getThemeBackgroundColor, getHowToParticipate } from '../../utils/app-utils';

const HowToParticipate = () => {
  const [imageStates, setImageStates] = useState({});
  const themeBackgroundColor = getThemeBackgroundColor();
  const config = getHowToParticipate();

  // アイコンマップ（基本設定）
  const iconMap = {
    "location": {
      "svg": "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    },
    "check": {
      "svg": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    "gift": {
      "svg": "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    },
    "trophy": {
      "svg": "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    }
  };

  // アイコンを生成する関数
  const renderIcon = (iconName) => {
    const iconData = iconMap[iconName];
    if (!iconData) {
      return null;
    }

    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={iconData.svg} 
        />
      </svg>
    );
  };

  // 配置クラスを取得する関数
  const getAlignmentClass = () => {
    return config.alignment === 'center' ? 'text-center' : 'text-left';
  };

  // 画像の状態を更新する関数
  const updateImageState = (stepId, state) => {
    setImageStates(prev => ({
      ...prev,
      [stepId]: state
    }));
  };

  // コンポーネントマウント時に画像の初期状態を設定
  useEffect(() => {
    const initialStates = {};
    config.steps.forEach(step => {
      if (step.image && step.image.url) {
        initialStates[step.id] = 'loading';
      }
    });
    setImageStates(initialStates);
  }, [config.steps]);

  return (
    <div className="space-y-6">
      {/* セクション説明 */}
      <div className={getAlignmentClass()}>
        <p className="text-base text-gray-600">
          {config.description}
        </p>
      </div>

      {/* ステップ */}
      <div className="space-y-4">
        {config.steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6 relative">
              {/* アイコン（絶対配置で右端に固定） */}
              {config.showIcons && (
                <div className="absolute top-6 right-6 text-gray-600">
                  {renderIcon(step.icon)}
                </div>
              )}
              
              {/* ステップ番号ラベル */}
              <div className={`mb-4 ${getAlignmentClass()}`}>
                <div
                  className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg text-white ${themeBackgroundColor}`}
                >
                  <span className="mr-1">STEP</span>
                  <span className="text-lg">{step.id}</span>
                </div>
              </div>

              {/* 画像（タイトルの上に表示） */}
              {step.image && step.image.url && (
                <div className={`mb-4 ${getAlignmentClass()}`}>
                  <div className="relative w-full max-w-md mx-auto">
                    {imageStates[step.id] === 'loading' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                      </div>
                    )}
                    <img
                      src={step.image.url}
                      alt={step.image.alt || `${step.title}の画像`}
                      className={`w-full rounded-lg shadow-sm object-cover transition-opacity duration-300 ${
                        imageStates[step.id] === 'loaded' ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ maxHeight: '200px' }}
                      onLoad={() => {
                        updateImageState(step.id, 'loaded');
                        console.log(`画像が正常に読み込まれました: ${step.image.url}`);
                      }}
                      onError={(e) => {
                        updateImageState(step.id, 'error');
                        console.warn(`画像の読み込みに失敗しました: ${step.image.url}`);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* タイトルと説明 */}
              <div className={getAlignmentClass()}>
                <h3 
                  className="text-xl font-bold text-gray-800 mb-3 leading-tight"
                >
                  {step.title}
                </h3>
                
                <p 
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  {step.description}
                </p>

                {/* 詳細情報（設定で切り替え可能） */}
                {config.showDetails && step.details && step.details.length > 0 && (
                  <div className="mt-4">
                    <ul className="space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-xs text-gray-500 flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToParticipate; 