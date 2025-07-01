import React from 'react';
import FileLibrary from '../components/FileLibrary';

const ContentLibrary = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Library</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage and organize your uploaded content</p>
      </div>
      <FileLibrary />
    </div>
  );
};

export default ContentLibrary;