import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const SectionHeader = ({ title, children, rightContent }) => {
  const { currentTheme } = useTheme();
  return (
    <div className="bg-white shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <div className="flex-1"></div>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            {title}
          </h2>
          <div
            className={`w-16 h-0.5 bg-${currentTheme}-500 mx-auto mt-2`}
          ></div>
        </div>
        <div className="flex-1 flex justify-end">
          {rightContent && (
            <div className="flex items-center">{rightContent}</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">{children}</div>
    </div>
  );
};

export default SectionHeader;
