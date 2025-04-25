"use client";

import React, { useState } from 'react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Checkout</h1>
          <p className="text-gray-400">Complete your purchase</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-grey rounded-lg p-6">
              <div className="flex items-center mb-8">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-neon-blue text-black' : 'bg-dark-purple text-white'}`}>
                  1
                </div>
                <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-neon-blue' : 'bg-dark-purple'}`}></div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-neon-blue text-black' : 'bg-dark-purple text-white'}`}>
                  2
                </div>
              </div>
              
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-black rounded-lg">
                      <div className="flex items-center">
                        <div className="h-16 w-16 bg-dark-purple rounded flex items-center justify-center mr-4">
                          <span className="text-neon-blue">Template</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Fashion Portfolio Elite</h3>
                          <p className="text-sm text-gray-400">Premium template for fashion influencers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-neon-blue font-bold">$50.00</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-dark-purple pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>$50.00</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-neon-blue">$50.00</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">Payment Information</h2>
                  
                  <form className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-black border border-dark-purple rounded-md"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiration Date</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-black border border-dark-purple rounded-md"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVC</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-black border border-dark-purple rounded-md"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Name on Card</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-black border border-dark-purple rounded-md"
                        placeholder="John Doe"
                      />
                    </div>
                  </form>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-dark-purple border border-neon-blue rounded-md"
                    >
                      Back
                    </button>
                    <button
                      className="flex-1 py-3 bg-neon-blue text-black rounded-md font-bold"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$50.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-neon-blue">$50.00</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dark-purple">
                <h3 className="font-medium mb-2">Have a coupon?</h3>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-2 bg-black border border-dark-purple rounded-l-md"
                    placeholder="Enter code"
                  />
                  <button className="px-4 py-2 bg-dark-purple rounded-r-md">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Need Help?</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about your purchase, feel free to contact our support team.
              </p>
              <a
                href="/templates"
                className="block w-full px-4 py-2 bg-dark-purple border border-neon-blue rounded text-center hover:bg-opacity-80"
              >
                Back to Templates
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
