import React from 'react';
import { 
  getCopyrightInfo 
} from '../../utils/app-utils';
import { 
  getFooterLinks, 
  getSocialMediaLinks, 
  getSocialMediaIcon 
} from '../../utils/footerUtils';

const Footer = () => {
  const footerLinks = getFooterLinks();
  const socialMediaLinks = getSocialMediaLinks();
  const copyrightInfo = getCopyrightInfo();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* フッターリンク */}
        {footerLinks.length > 0 && (
          <div className="text-center mb-6">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <ul className="flex justify-center space-x-6">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          console.log(`${link.name} がクリックされました: ${link.url}`);
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
        )}

        {/* 区切り線 */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <div className="flex flex-col items-center space-y-4">
            {/* ソーシャルメディアリンク */}
            {socialMediaLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialMediaLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      console.log(`${social.name} がクリックされました: ${social.url}`);
                    }}
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={getSocialMediaIcon(social.icon)}/>
                    </svg>
                  </a>
                ))}
              </div>
            )}


          </div>
        </div>

        {/* 会社名とコピーライト */}
        <div className="text-center mb-2">
          {copyrightInfo.company && (
            <p className="text-xs text-gray-400 mb-1">
              {copyrightInfo.company}
            </p>
          )}
          <p className="text-xs text-gray-400">
            {copyrightInfo.text}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 