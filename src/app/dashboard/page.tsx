"use client";

import React from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import UserProfile from '../../components/auth/UserProfile';
import OrderHistory from '../../components/payment/OrderHistory';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <header className="py-6 px-4 border-b border-dark-purple">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-heading font-bold text-neon-blue">
              Website Generator
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/templates" className="hover:text-neon-blue">
                Templates
              </Link>
              <Link href="/dashboard" className="hover:text-neon-blue">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
            <p className="text-gray-400">Manage your websites and account</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-6">My Websites</h2>
                
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-heading font-bold">Fashion Portfolio Elite</h3>
                      <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Live</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">fashion-portfolio.example.com</p>
                    <div className="flex space-x-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                        Manage
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-heading font-bold">Beauty Blog Premium</h3>
                      <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Live</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">beauty-blog.example.com</p>
                    <div className="flex space-x-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                        Manage
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-heading font-bold">Fitness Coach Pro</h3>
                      <span className="px-2 py-1 bg-yellow-900 text-yellow-500 text-xs rounded-full">In Progress</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">Not published yet</p>
                    <div className="flex space-x-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/templates" 
                    className="px-4 py-2 bg-neon-blue text-black rounded font-bold inline-block"
                  >
                    Create New Website
                  </Link>
                </div>
              </div>
              
              <OrderHistory userId={user?.id} />
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              <UserProfile userId={user?.id} />
              
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-6">Quick Stats</h2>
                
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Websites</span>
                      <span className="font-bold">3</span>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Published Websites</span>
                      <span className="font-bold">2</span>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Visitors</span>
                      <span className="font-bold">1,245</span>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Account Status</span>
                      <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="py-6 px-4 border-t border-dark-purple">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Website Generator. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
