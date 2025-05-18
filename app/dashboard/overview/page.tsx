"use client";
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from 'recharts';

interface DataItem {
  name: string;
  value: number;
  total?: number;
}

interface AnalyticsData {
  taxFilingStats: DataItem[];
  ageGroupStats: DataItem[];
  profileCompletionStats: DataItem[];
  financialInfoStats: DataItem[];
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
}

const fetchUserAnalytics = async (): Promise<AnalyticsData> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    taxFilingStats: [
      { name: 'Filed Taxes', value: 5 },
      { name: 'Not Filed', value: 2 }
    ],
    ageGroupStats: [
      { name: 'Below 60 years', value: 4 },
      { name: '60-80 years', value: 2 },
      { name: 'Above 80 years', value: 1 }
    ],
    profileCompletionStats: [
      { name: 'Complete Profile', value: 6 },
      { name: 'Incomplete Profile', value: 1 }
    ],
    financialInfoStats: [
      { name: 'Added Income Details', value: 10 },
      { name: 'Added Bank Accounts', value: 8 },
      { name: 'Missing Financial Info', value: 2 }
    ]
  };
};

const COLORS = {
  taxFiling: ['#4ade80', '#f87171'],
  ageGroups: ['#60a5fa', '#a78bfa', '#fb7185'],
  profileCompletion: ['#34d399', '#fb923c'],
  financialInfo: ['#38bdf8', '#818cf8', '#f472b6']
};

export default function UserAnalytics(): React.ReactElement {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await fetchUserAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Custom tooltip component for the charts
  const CustomTooltip = ({ active, payload }: CustomTooltipProps): React.ReactElement | null => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-sm text-gray-600">
            {`${((payload[0].value / (payload[0].payload.total || 1)) * 100).toFixed(1)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Add total to each dataset for percentage calculations
  if (analytics) {
    const addTotalToData = (dataArray: DataItem[]): DataItem[] => {
      const total = dataArray.reduce((sum, item) => sum + item.value, 0);
      return dataArray.map(item => ({ ...item, total }));
    };

    analytics.taxFilingStats = addTotalToData(analytics.taxFilingStats);
    analytics.ageGroupStats = addTotalToData(analytics.ageGroupStats);
    analytics.profileCompletionStats = addTotalToData(analytics.profileCompletionStats);
    analytics.financialInfoStats = addTotalToData(analytics.financialInfoStats);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-700">Error Loading Data</h2>
          <p className="mt-2 text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">User Overview Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Visualizing user demographics and platform engagement metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Tax Filing Status Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tax Filing Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.taxFilingStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analytics.taxFilingStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.taxFiling[index % COLORS.taxFiling.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-xl font-semibold">{analytics.taxFilingStats[0].total}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Filing Rate</p>
                <p className="text-xl font-semibold">
                  {((analytics.taxFilingStats[0].value / (analytics.taxFilingStats[0].total || 1)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Age Demographics Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Age Demographics</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.ageGroupStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analytics.ageGroupStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.ageGroups[index % COLORS.ageGroups.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Senior Citizens (60+ years)</p>
                <p className="text-xl font-semibold">
                  {analytics.ageGroupStats[1].value + analytics.ageGroupStats[2].value} users 
                  ({((analytics.ageGroupStats[1].value + analytics.ageGroupStats[2].value) / 
                     (analytics.ageGroupStats[0].total || 1) * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          </div>

          {/* Profile Completion Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Completion</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.profileCompletionStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analytics.profileCompletionStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.profileCompletion[index % COLORS.profileCompletion.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800 font-medium">Insight</p>
                <p className="text-gray-700">
                  {((analytics.profileCompletionStats[0].value / (analytics.profileCompletionStats[0].total || 1)) * 100).toFixed(0)}% of users have completed their profiles. 
                  {((analytics.profileCompletionStats[0].value / (analytics.profileCompletionStats[0].total || 1)) * 100) < 70 ? 
                    " Consider implementing profile completion incentives." : 
                    " Excellent profile completion rate!"}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Information Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Information Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.financialInfoStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analytics.financialInfoStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.financialInfo[index % COLORS.financialInfo.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Income Details</p>
                <p className="text-xl font-semibold">
                  {((analytics.financialInfoStats[0].value / (analytics.financialInfoStats[0].total || 1)) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Bank Accounts</p>
                <p className="text-xl font-semibold">
                  {((analytics.financialInfoStats[1].value / (analytics.financialInfoStats[0].total || 1)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">Filed Tax Returns</p>
              <p className="text-2xl font-bold text-green-700">{analytics.taxFilingStats[0].value}</p>
              <p className="text-sm text-green-600">
                {((analytics.taxFilingStats[0].value / (analytics.taxFilingStats[0].total || 1)) * 100).toFixed(1)}% of users
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800">Senior Citizens (60+)</p>
              <p className="text-2xl font-bold text-purple-700">
                {analytics.ageGroupStats[1].value + analytics.ageGroupStats[2].value}
              </p>
              <p className="text-sm text-purple-600">
                {((analytics.ageGroupStats[1].value + analytics.ageGroupStats[2].value) / 
                  (analytics.ageGroupStats[0].total || 1) * 100).toFixed(1)}% of users
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">Complete Profiles</p>
              <p className="text-2xl font-bold text-blue-700">{analytics.profileCompletionStats[0].value}</p>
              <p className="text-sm text-blue-600">
                {((analytics.profileCompletionStats[0].value / (analytics.profileCompletionStats[0].total || 1)) * 100).toFixed(1)}% of users
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-indigo-800">Bank Accounts Added</p>
              <p className="text-2xl font-bold text-indigo-700">{analytics.financialInfoStats[1].value}</p>
              <p className="text-sm text-indigo-600">
                {((analytics.financialInfoStats[1].value / (analytics.financialInfoStats[0].total || 1)) * 100).toFixed(1)}% of users
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}