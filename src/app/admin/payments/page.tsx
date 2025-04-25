"use client";

import { useState } from 'react';

export default function PaymentsPage() {
  const [dateRange, setDateRange] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock payment data
  const payments = [
    {
      id: 'PAY-001',
      date: '2025-04-20',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 50.00,
      status: 'completed',
      website: 'Fashion Portfolio Elite'
    },
    {
      id: 'PAY-002',
      date: '2025-04-15',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 45.00, // With discount
      status: 'completed',
      website: 'Beauty Blog Premium'
    },
    {
      id: 'PAY-003',
      date: '2025-04-10',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: 50.00,
      status: 'processing',
      website: 'Fitness Coach Pro'
    },
    {
      id: 'PAY-004',
      date: '2025-04-05',
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      amount: 50.00,
      status: 'completed',
      website: 'Travel Blog Elite'
    },
    {
      id: 'PAY-005',
      date: '2025-04-01',
      customer: 'David Brown',
      email: 'david@example.com',
      amount: 50.00,
      status: 'failed',
      website: 'Gaming Streamer Pro'
    }
  ];
  
  const filteredPayments = payments.filter(payment => {
    // Filter by date range
    if (dateRange !== 'all') {
      const paymentDate = new Date(payment.date);
      const today = new Date();
      
      if (dateRange === 'today') {
        const isToday = paymentDate.toDateString() === today.toDateString();
        if (!isToday) return false;
      } else if (dateRange === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        if (paymentDate < oneWeekAgo) return false;
      } else if (dateRange === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        if (paymentDate < oneMonthAgo) return false;
      }
    }
    
    // Filter by payment status
    if (paymentStatus !== 'all' && payment.status !== paymentStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.id.toLowerCase().includes(query) ||
        payment.customer.toLowerCase().includes(query) ||
        payment.email.toLowerCase().includes(query) ||
        payment.website.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const totalRevenue = filteredPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Payments</h1>
          <p className="text-gray-400">Manage and track all payment transactions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-grey rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-neon-blue">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-400">From {filteredPayments.filter(p => p.status === 'completed').length} completed payments</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {filteredPayments.filter(p => p.status === 'processing').length}
            </p>
            <p className="text-sm text-gray-400">Payments awaiting processing</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold mb-2">Failed Payments</h3>
            <p className="text-3xl font-bold text-red-500">
              {filteredPayments.filter(p => p.status === 'failed').length}
            </p>
            <p className="text-sm text-gray-400">Payments that failed to process</p>
          </div>
        </div>
        
        <div className="bg-grey rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full md:w-auto p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full md:w-auto p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, customer, email..."
                className="w-full md:w-64 p-2 bg-black border border-dark-purple rounded-md"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-purple">
                  <th className="py-3 text-left">ID</th>
                  <th className="py-3 text-left">Date</th>
                  <th className="py-3 text-left">Customer</th>
                  <th className="py-3 text-left">Website</th>
                  <th className="py-3 text-left">Amount</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => (
                  <tr key={payment.id} className="border-b border-dark-purple">
                    <td className="py-3">{payment.id}</td>
                    <td className="py-3">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <div>{payment.customer}</div>
                      <div className="text-xs text-gray-400">{payment.email}</div>
                    </td>
                    <td className="py-3">{payment.website}</td>
                    <td className="py-3 font-bold">${payment.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'completed' 
                          ? 'bg-green-900 text-green-500' 
                          : payment.status === 'processing'
                            ? 'bg-yellow-900 text-yellow-500'
                            : 'bg-red-900 text-red-500'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No payments found matching your filters</p>
            </div>
          )}
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-6">Payment Analytics</h2>
          
          <div className="h-64 bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Payment analytics chart will display here</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Conversion Rate</p>
              <p className="text-xl font-bold">92%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Avg. Order Value</p>
              <p className="text-xl font-bold">$49.00</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Monthly Growth</p>
              <p className="text-xl font-bold text-green-500">+15%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Refund Rate</p>
              <p className="text-xl font-bold text-green-500">0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
