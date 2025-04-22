
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
        <div className="font-medium text-sm mb-1">Tobey's Tutor</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Thinking</span>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
