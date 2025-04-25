"use client";

import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-grey p-8 rounded-lg">
        <h1 className="text-3xl font-heading font-bold mb-6 text-center">Log In</h1>
        
        <form className="space-y-6">
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-black border-dark-purple rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm text-neon-blue hover:underline">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Log In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth" className="text-neon-blue hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
