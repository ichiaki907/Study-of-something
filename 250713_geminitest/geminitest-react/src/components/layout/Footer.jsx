import React from 'react';
import { getThemeColors, getThemeColor } from '../../utils/app-utils';

const Footer = () => {
  const themeColor = getThemeColor();
  const themeColors = getThemeColors(themeColor);

  const footerLinks = [
    {
      title: "サービス",
      links: [
        { name: "利用規約", url: "#" },
        { name: "プライバシーポリシー", url: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* フッターリンク */}
        <div className="text-center mb-6">
                      {footerLinks.map((section, index) => (
              <div key={index}>
                <ul className="flex justify-center space-x-6">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          // ここに各リンクの処理を追加
                          console.log(`${link.name} がクリックされました`);
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <div className="flex flex-col items-center space-y-4">
            {/* ソーシャルメディアリンク */}
            <div className="flex space-x-4">
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={() => {
                  console.log("Twitter がクリックされました");
                }}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={() => {
                  console.log("Instagram がクリックされました");
                }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.796-1.418-1.947-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                </svg>
              </button>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={() => {
                  console.log("Facebook がクリックされました");
                }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>

            {/* アプリ情報 */}
            <div className="text-center">
              <h4 
                className="text-sm font-semibold mb-2"
                style={{ color: themeColors.textPrimary }}
              >
                東京スタンプラリー
              </h4>
              <p className="text-xs text-gray-500">
                東京の観光スポットを巡って楽しいスタンプラリーに参加しよう！
              </p>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="text-center mb-2">
          <p className="text-xs text-gray-400">
            © 2024 東京スタンプラリー. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 