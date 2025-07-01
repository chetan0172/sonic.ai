import React from 'react';
import EnhancedUpload from '../components/EnhancedUpload';

const Upload = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Content</h1>
        <p className="text-gray-600 dark:text-gray-300">Upload your content to create AI-powered drip campaigns</p>
      </div>
      <EnhancedUpload />
    </div>
  );
};

export default Upload;