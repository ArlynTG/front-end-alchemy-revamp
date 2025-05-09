
import React from 'react';

const TestingBanner: React.FC = () => {
  return (
    <div className="w-full bg-blue-600 rounded-lg p-4 mb-4 md:mb-8">
      <p className="text-center text-white font-medium text-lg md:text-xl">
        TESTING VERSION: For Supabase integration testing only
      </p>
    </div>
  );
};

export default TestingBanner;
