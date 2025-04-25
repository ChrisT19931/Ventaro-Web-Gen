import React, { useState } from 'react';

interface OrderSummaryProps {
  templateId: string;
  templateName: string;
  templatePrice: number;
  onCheckout: () => void;
  onCancel: () => void;
}

export default function OrderSummary({ 
  templateId, 
  templateName, 
  templatePrice, 
  onCheckout, 
  onCancel 
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const applyCoupon = () => {
    // In a real implementation, this would validate the coupon code with a backend service
    // For now, we'll simulate a valid coupon code "LAUNCH50" for 10% off
    if (couponCode.toUpperCase() === 'LAUNCH50') {
      setDiscount(templatePrice * 0.1);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      alert('Invalid coupon code');
    }
  };
  
  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
  };
  
  const calculateTotal = () => {
    return templatePrice - discount;
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-6">Order Summary</h2>
      
      <div className="space-y-6">
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="h-40 bg-dark-purple flex items-center justify-center">
            <span className="text-neon-blue font-bold">{templateName}</span>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">{templateName}</h3>
              <span className="text-neon-blue font-bold">${templatePrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Complete website package with all premium features
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>Fully customizable template</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>Responsive design for all devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>SEO optimization included</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>Premium assets and features</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Have a Coupon?</h3>
          
          {!couponApplied ? (
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 p-2 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
              />
              <button
                onClick={applyCoupon}
                disabled={!couponCode}
                className={`px-4 py-2 rounded-md ${
                  !couponCode ? 'bg-gray-600 cursor-not-allowed' : 'bg-neon-blue text-black font-bold'
                }`}
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center p-2 bg-dark-purple rounded-md">
              <div>
                <span className="text-sm font-medium">{couponCode.toUpperCase()}</span>
                <span className="text-xs text-green-500 ml-2">Applied</span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-xs text-red-500 hover:text-red-400"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Price Details</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Template Price</span>
              <span>${templatePrice.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-dark-purple my-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Proceed to Checkout
          </button>
        </div>
        
        <div className="text-center">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
