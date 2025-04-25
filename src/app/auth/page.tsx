"use client";

import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-grey p-8 rounded-lg">
        <h1 className="text-3xl font-heading font-bold mb-6 text-center">
          {isLogin ? 'Log In' : 'Sign Up'}
        </h1>
        
        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-3 bg-black border border-dark-purple rounded-md"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-black border border-dark-purple rounded-md"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-black border border-dark-purple rounded-md"
              placeholder="••••••••"
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 bg-black border border-dark-purple rounded-md"
                placeholder="••••••••"
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-neon-blue hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
