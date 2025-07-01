import React from 'react';

function Campaign() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Manager</h1>
        <p className="text-gray-600 dark:text-gray-300">Create and manage your content drip campaigns</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Builder</h2>
        <p className="text-gray-600 dark:text-gray-300">Advanced campaign management interface coming soon. Create automated drip sequences, schedule posts, and optimize timing across platforms.</p>
      </div>
    </div>
  );
}

export default Campaign;