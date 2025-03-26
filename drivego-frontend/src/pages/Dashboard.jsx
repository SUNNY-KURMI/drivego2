import React from 'react';
import Footer from './Footer';
import { useTheme } from './theme';

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white dark:bg-gray-900 shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isDarkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Statistics</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;