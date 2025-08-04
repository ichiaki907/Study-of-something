import React from 'react';
import { getThemeColors, getThemeColor } from '../../utils/app-utils';

const HowToParticipate = () => {
  const themeColor = getThemeColor();
  const themeColors = getThemeColors(themeColor);

  const steps = [
    {
      id: 1,
      title: "スポットを訪れる",
      description: "東京の観光スポットを実際に訪れて、その場所の魅力を体験してください。",
      icon: "📍",
      details: [
        "8つの指定されたスポットのいずれかに行く",
        "現地で写真を撮る",
        "その場所の雰囲気を楽しむ"
      ]
    },
    {
      id: 2,
      title: "スタンプを獲得",
      description: "スポットに到着したら、アプリでスタンプを押して獲得してください。",
      icon: "🎯",
      details: [
        "アプリを開いて該当スポットを選択",
        "「スタンプを押す」ボタンをタップ",
        "位置情報で到着を確認"
      ]
    },
    {
      id: 3,
      title: "特典を確認",
      description: "スタンプを集めることで、様々な特典がアンロックされます。",
      icon: "🎁",
      details: [
        "スタンプ数に応じて特典が解放",
        "NFT特典の獲得",
        "限定コンテンツへのアクセス"
      ]
    },
    {
      id: 4,
      title: "完了を目指す",
      description: "全てのスポットを制覇して、スタンプラリーを完成させましょう！",
      icon: "🏆",
      details: [
        "8つのスポット全てを制覇",
        "コンプリート特典の獲得",
        "達成感を味わう"
      ]
    }
  ];

  return (
    <div className="space-y-6">

        {/* ステップ */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-4 text-center">
                <div className="mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: themeColors.primary,
                      color: themeColors.onPrimary
                    }}
                  >
                    ステップ {step.id}
                  </span>
                </div>
                
                <h3 
                  className="text-base font-semibold text-gray-800 mb-2"
                >
                  {step.title}
                </h3>
                
                <p 
                  className="text-sm text-gray-600"
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 
            className="text-sm font-semibold mb-2 text-yellow-800"
          >
            ⚠️ 注意事項
          </h3>
          <ul className="space-y-1">
            <li className="text-xs text-yellow-700">
              • スタンプを押すには、実際にその場所にいる必要があります
            </li>
            <li className="text-xs text-yellow-700">
              • 位置情報の許可が必要です
            </li>
            <li className="text-xs text-yellow-700">
              • 各スポットは一度だけスタンプを押すことができます
            </li>
            <li className="text-xs text-yellow-700">
              • 安全に楽しんでください
            </li>
          </ul>
        </div>


    </div>
  );
};

export default HowToParticipate; 