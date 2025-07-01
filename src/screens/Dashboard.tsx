import React from 'react';
import { BarChart, Users, ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive }: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
    <div className="mt-2 flex items-center justify-between">
      <p className="text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
      <div className={`flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        <span className="ml-1">{change}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    {
      title: "Total Posts Generated",
      value: "1,284",
      change: "12%",
      isPositive: true,
      icon: BarChart
    },
    {
      title: "Audience Reached",
      value: "85.2K",
      change: "8%",
      isPositive: true,
      icon: Users
    },
    {
      title: "Engagement Rate",
      value: "4.6%",
      change: "3%",
      isPositive: false,
      icon: Users
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your content performance across platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          {/* Activity content will go here */}
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Posts</h2>
          {/* Upcoming posts content will go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;