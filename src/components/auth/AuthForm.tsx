"use client";

import React from 'react';

export default function AuthForm({ isLogin = true, onSubmit }) {
  return (
    <div className="space-y-4">
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            placeholder="John Doe"
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          placeholder="your@email.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          placeholder="••••••••"
        />
      </div>
      
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            placeholder="••••••••"
          />
        </div>
      )}
      
      <button
        type="submit"
        className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
        onClick={onSubmit}
      >
        {isLogin ? 'Log In' : 'Create Account'}
      </button>
    </div>
  );
}
