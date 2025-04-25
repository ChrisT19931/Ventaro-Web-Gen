"use client";

import { useState } from 'react';

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Mock user data
  const users = [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      websites: 3,
      joined: '2025-03-15',
      lastActive: '2025-04-23'
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      websites: 2,
      joined: '2025-03-10',
      lastActive: '2025-04-22'
    },
    {
      id: 'user-3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      status: 'inactive',
      websites: 1,
      joined: '2025-03-05',
      lastActive: '2025-04-10'
    },
    {
      id: 'user-4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'admin',
      status: 'active',
      websites: 5,
      joined: '2025-02-28',
      lastActive: '2025-04-24'
    },
    {
      id: 'user-5',
      name: 'David Brown',
      email: 'david@example.com',
      role: 'user',
      status: 'pending',
      websites: 0,
      joined: '2025-04-20',
      lastActive: '2025-04-20'
    }
  ];
  
  const filteredUsers = users.filter(user => {
    // Filter by status/role
    if (activeTab === 'active' && user.status !== 'active') {
      return false;
    } else if (activeTab === 'inactive' && user.status !== 'inactive') {
      return false;
    } else if (activeTab === 'pending' && user.status !== 'pending') {
      return false;
    } else if (activeTab === 'admin' && user.role !== 'admin') {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.joined).getTime() - new Date(a.joined).getTime();
    } else if (sortBy === 'active') {
      return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    } else if (sortBy === 'websites') {
      return b.websites - a.websites;
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Users</h1>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-neon-blue">{users.length}</p>
            <p className="text-sm text-gray-400">Registered accounts</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-500">
              {users.filter(u => u.status === 'active').length}
            </p>
            <p className="text-sm text-gray-400">Currently active accounts</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Websites Created</h3>
            <p className="text-3xl font-bold text-neon-blue">
              {users.reduce((sum, user) => sum + user.websites, 0)}
            </p>
            <p className="text-sm text-gray-400">Total websites by all users</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Admins</h3>
            <p className="text-3xl font-bold text-purple-500">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-gray-400">Administrator accounts</p>
          </div>
        </div>
        
        <div className="bg-grey rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold">User Management</h2>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Add New User
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex overflow-x-auto pb-2 md:pb-0">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'all' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                All Users
              </button>
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'active' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setActiveTab('inactive')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'inactive' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Inactive
              </button>
              <button 
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'pending' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'admin' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Admins
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="newest">Newest</option>
                  <option value="active">Recently Active</option>
                  <option value="websites">Most Websites</option>
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full md:w-64 p-2 pl-8 bg-black border border-dark-purple rounded-md"
                />
                <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-purple">
                  <th className="py-3 text-left">User</th>
                  <th className="py-3 text-left">Role</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Websites</th>
                  <th className="py-3 text-left">Joined</th>
                  <th className="py-3 text-left">Last Active</th>
                  <th className="py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map(user => (
                  <tr key={user.id} className="border-b border-dark-purple">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-dark-purple flex items-center justify-center mr-3">
                          <span className="text-sm font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-purple-900 text-purple-500' 
                          : 'bg-dark-purple text-gray-300'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-900 text-green-500' 
                          : user.status === 'inactive'
                            ? 'bg-red-900 text-red-500'
                            : 'bg-yellow-900 text-yellow-500'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">{user.websites}</td>
                    <td className="py-3">{new Date(user.joined).toLocaleDateString()}</td>
                    <td className="py-3">{new Date(user.lastActive).toLocaleDateString()}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-dark-purple rounded text-xs hover:bg-opacity-80">
                          View
                        </button>
                        <button className="px-2 py-1 bg-dark-purple rounded text-xs hover:bg-opacity-80">
                          Edit
                        </button>
                        <button className="px-2 py-1 bg-neon-blue text-black rounded text-xs font-bold">
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No users found matching your filters</p>
            </div>
          )}
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-6">User Activity</h2>
          
          <div className="h-64 bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-400">User activity chart will display here</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Avg. Websites per User</p>
              <p className="text-xl font-bold">
                {(users.reduce((sum, user) => sum + user.websites, 0) / users.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">User Growth</p>
              <p className="text-xl font-bold text-green-500">+24%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Retention Rate</p>
              <p className="text-xl font-bold">85%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Active Today</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
