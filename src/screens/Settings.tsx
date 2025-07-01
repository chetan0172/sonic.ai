import React from 'react';
import S3Test from '../components/S3Test';

function Settings() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Configure your account and integration settings</p>
      </div>
      <div className="space-y-6">
        <S3Test />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Platform Integrations</h2>
          <p className="text-gray-600 dark:text-gray-300">Connect your social media accounts and configure posting preferences</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;