import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { name: 'Jan', value: 2000 },
  { name: 'Feb', value: 2400 },
  { name: 'Mar', value: 2100 },
  { name: 'Apr', value: 1800 },
  { name: 'May', value: 2200 },
  { name: 'Jun', value: 2300 },
];

const categoryData = [
  { name: 'Food & Beverages', value: 30, color: '#4ade80' },
  { name: 'Transport', value: 25, color: '#fb923c' },
  { name: 'Entertainment', value: 25, color: '#164e63' },
  { name: 'Others', value: 20, color: '#fcd34d' },
];

const ExpenseDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">ARC</h1>
          <p className="text-sm text-gray-500">Easily manage your monthly expenses with our powerful app</p>
        </div>
        <button className="px-4 py-2 bg-white text-black rounded-lg border shadow-sm hover:bg-gray-50">
          + Upload Bill
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Monthly Expenses Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Monthly Expenses</h2>
            <p className="text-sm text-gray-500">Your total expenses for the current month</p>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">₹2,354</span>
            <span className="ml-2 text-sm text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12% from last month
            </span>
          </div>
        </div>

        {/* Expense Breakdown Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Expense Breakdown</h2>
            <p className="text-sm text-gray-500">See how your expenses are distributed across categories</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Expense Categories</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Expense History */}
      <div>
        <h2 className="text-xl font-bold mb-4">Expense History</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Electricity Bill */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Electricity Bill</p>
                <p className="text-sm text-gray-500">Updated on Jun 15, 2024</p>
              </div>
              <span className="font-bold">₹235</span>
            </div>
          </div>

          {/* Grocery Receipt */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Grocery Receipt</p>
                <p className="text-sm text-gray-500">Updated on May 25, 2024</p>
              </div>
              <span className="font-bold">₹435</span>
            </div>
          </div>

          {/* Internet Bill */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Internet Bill</p>
                <p className="text-sm text-gray-500">Updated on May 15, 2024</p>
              </div>
              <span className="font-bold">₹555</span>
            </div>
          </div>

          {/* Restaurant Bill */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Restaurant Bill</p>
                <p className="text-sm text-gray-500">Updated on May 4, 2024</p>
              </div>
              <span className="font-bold">₹955</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;