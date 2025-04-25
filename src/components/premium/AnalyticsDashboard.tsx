import React, { useState } from 'react';

interface AnalyticsDashboardProps {
  websiteId?: string;
  dateRange?: 'day' | 'week' | 'month' | 'year';
}

export default function AnalyticsDashboard({ websiteId, dateRange = 'month' }: AnalyticsDashboardProps) {
  const [selectedDateRange, setSelectedDateRange] = useState(dateRange);
  const [selectedMetric, setSelectedMetric] = useState('visitors');
  
  // In a real implementation, this would fetch actual analytics data
  // For now, we'll use mock data
  const analyticsData = {
    visitors: {
      total: 1254,
      change: 12.5,
      data: [120, 145, 160, 180, 210, 205, 234]
    },
    pageviews: {
      total: 3842,
      change: 8.2,
      data: [350, 420, 480, 510, 590, 620, 872]
    },
    bounceRate: {
      total: 42.3,
      change: -5.1,
      data: [48, 46, 45, 44, 43, 42, 42.3]
    },
    avgTime: {
      total: 2.4,
      change: 15.3,
      data: [1.8, 1.9, 2.1, 2.2, 2.3, 2.4, 2.4]
    }
  };
  
  const getMetricData = () => {
    return analyticsData[selectedMetric as keyof typeof analyticsData];
  };
  
  const getMetricUnit = () => {
    switch (selectedMetric) {
      case 'visitors':
      case 'pageviews':
        return '';
      case 'bounceRate':
        return '%';
      case 'avgTime':
        return ' min';
      default:
        return '';
    }
  };
  
  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'visitors':
        return 'Unique Visitors';
      case 'pageviews':
        return 'Page Views';
      case 'bounceRate':
        return 'Bounce Rate';
      case 'avgTime':
        return 'Avg. Time on Site';
      default:
        return selectedMetric;
    }
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-bold">Website Analytics Dashboard</h2>
        <div className="flex space-x-4">
          <select 
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value as any)}
            className="p-2 bg-black border border-dark-purple rounded"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-dark-purple rounded border border-neon-blue">
            Export Report
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Object.entries(analyticsData).map(([key, value]) => (
          <div 
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedMetric === key 
                ? 'bg-dark-purple border-2 border-neon-blue' 
                : 'bg-black hover:bg-dark-purple'
            }`}
          >
            <h3 className="text-sm font-medium mb-2 capitalize">
              {key === 'avgTime' ? 'Avg. Time on Site' : key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold">
                {value.total}{key === 'bounceRate' ? '%' : key === 'avgTime' ? ' min' : ''}
              </p>
              <p className={`text-sm ${value.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {value.change >= 0 ? '+' : ''}{value.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="bg-black rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading font-bold">{getMetricLabel()}</h3>
          <div className="flex space-x-4">
            <button className="text-xs px-2 py-1 bg-dark-purple rounded">Daily</button>
            <button className="text-xs px-2 py-1 bg-dark-purple rounded">Weekly</button>
            <button className="text-xs px-2 py-1 bg-neon-blue text-black rounded">Monthly</button>
          </div>
        </div>
        
        <div className="h-64 flex items-end space-x-2">
          {getMetricData().data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full ${index === getMetricData().data.length - 1 ? 'bg-neon-blue' : 'bg-dark-purple'}`} 
                style={{ height: `${(value / Math.max(...getMetricData().data)) * 80}%` }}
              ></div>
              <div className="text-xs mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Traffic Sources & Visitor Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black rounded-lg p-6">
          <h3 className="font-heading font-bold mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-neon-blue rounded-full mr-2"></div>
                <span>Social Media</span>
              </div>
              <span>45%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-neon-blue h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Direct</span>
              </div>
              <span>30%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                <span>Search</span>
              </div>
              <span>15%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Referral</span>
              </div>
              <span>10%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-black rounded-lg p-6">
          <h3 className="font-heading font-bold mb-4">Visitor Demographics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Age Groups</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>18-24</span>
                  <span>35%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>25-34</span>
                  <span>42%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>35-44</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>45+</span>
                  <span>8%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Devices</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Mobile</span>
                  <span>68%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Desktop</span>
                  <span>27%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Tablet</span>
                  <span>5%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Gender</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Female</span>
                  <span>62%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Male</span>
                  <span>36%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Other</span>
                  <span>2%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Top Locations</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>United States</span>
                  <span>45%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>United Kingdom</span>
                  <span>12%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Canada</span>
                  <span>8%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Australia</span>
                  <span>6%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Content */}
      <div className="mt-8 bg-black rounded-lg p-6">
        <h3 className="font-heading font-bold mb-4">Popular Content</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-dark-purple">
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Page</th>
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Views</th>
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Avg. Time</th>
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/home</td>
                <td className="py-3 text-sm">1,245</td>
                <td className="py-3 text-sm">2:15</td>
                <td className="py-3 text-sm">32%</td>
              </tr>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/portfolio</td>
                <td className="py-3 text-sm">876</td>
                <td className="py-3 text-sm">3:42</td>
                <td className="py-3 text-sm">28%</td>
              </tr>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/about</td>
                <td className="py-3 text-sm">654</td>
                <td className="py-3 text-sm">1:50</td>
                <td className="py-3 text-sm">45%</td>
              </tr>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/contact</td>
                <td className="py-3 text-sm">432</td>
                <td className="py-3 text-sm">1:05</td>
                <td className="py-3 text-sm">38%</td>
              </tr>
              <tr>
                <td className="py-3 text-sm">/blog/latest-post</td>
                <td className="py-3 text-sm">321</td>
                <td className="py-3 text-sm">4:20</td>
                <td className="py-3 text-sm">22%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
