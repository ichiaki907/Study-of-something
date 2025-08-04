import React from 'react';
import { 
  getThemeColors, 
  getThemeColor, 
  getAppInfo, 
  getCopyrightInfo 
} from '../../utils/app-utils';
import { 
  getFooterLinks, 
  getSocialMediaLinks, 
  getSocialMediaIcon 
} from '../../utils/footerUtils';

const Footer = () => {
  const themeColor = getThemeColor();
  const themeColors = getThemeColors(themeColor);

  const footerLinks = getFooterLinks();
  const socialMediaLinks = getSocialMediaLinks();
  const appInfo = getAppInfo();
  const copyrightInfo = getCopyrightInfo();

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
              {socialMediaLinks.map((social, index) => (
                <button
                  key={index}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => {
                    console.log(`${social.name} がクリックされました`);
                  }}
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={getSocialMediaIcon(social.icon)}/>
                  </svg>
                </button>
              ))}
            </div>

            {/* アプリ情報 */}
            <div className="text-center">
              <h4 
                className="text-sm font-semibold mb-2"
                style={{ color: themeColors.textPrimary }}
              >
                {appInfo.title}
              </h4>
              <p className="text-xs text-gray-500">
                {appInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="text-center mb-2">
          <p className="text-xs text-gray-400">
            {copyrightInfo.text}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 