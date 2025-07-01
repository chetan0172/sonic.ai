import React from 'react';

function Analytics() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your content performance and engagement metrics</p>
      </div>
      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h2>
          <p className="text-gray-600 dark:text-gray-300">Detailed analytics dashboard coming soon. Track engagement, reach, and conversion metrics across all platforms.</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;