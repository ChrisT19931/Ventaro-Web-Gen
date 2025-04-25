"use client";

import React, { useState } from 'react';

interface PaymentProcessingProps {
  amount: number;
  productName: string;
  onSuccess?: (transactionId: string) => void;
  onCancel?: () => void;
}

export default function PaymentProcessing({ amount, productName, onSuccess, onCancel }: PaymentProcessingProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [transactionId, setTransactionId] = useState('');
  
  // Card payment form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    
    return digits;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(formatExpiry(e.target.value));
  };
  
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to 3-4 digits
    const cvc = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(cvc);
  };
  
  const processPayment = () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call a payment processing service
    // For now, we'll simulate a delay and set the status to success
    setTimeout(() => {
      setPaymentStatus('success');
      setTransactionId(`TX-${Date.now()}`);
      setIsProcessing(false);
      
      if (onSuccess) {
        onSuccess(`TX-${Date.now()}`);
      }
    }, 2000);
  };
  
  const validateCardForm = () => {
    return (
      cardName.trim() !== '' &&
      cardNumber.replace(/\s/g, '').length === 16 &&
      cardExpiry.length === 5 &&
      cardCvc.length >= 3
    );
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-6">Checkout</h2>
      
      {paymentStatus === 'pending' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-black rounded-lg">
            <div>
              <h3 className="font-heading font-bold">{productName}</h3>
              <p className="text-sm text-gray-400">Website Template Package</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">${amount.toFixed(2)}</p>
              <p className="text-xs text-gray-400">One-time payment</p>
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Payment Method</h3>
            
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 rounded-md ${
                  paymentMethod === 'card' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 py-3 rounded-md ${
                  paymentMethod === 'paypal' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                PayPal
              </button>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={processPayment}
                    disabled={isProcessing || !validateCardForm()}
                    className={`w-full py-3 rounded-md font-bold ${
                      isProcessing || !validateCardForm()
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-neon-blue text-black'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 text-center">
                  Your payment information is secure and encrypted
                </p>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="space-y-4">
                <div className="p-6 text-center">
                  <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-md font-bold ${
                      isProcessing
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-neon-blue text-black'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Continue to PayPal'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      )}
      
      {paymentStatus === 'success' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-heading font-bold mb-2">Payment Successful!</h3>
          <p className="text-gray-400 mb-6">Thank you for your purchase.</p>
          
          <div className="bg-black rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Amount Paid:</span>
              <span className="font-bold">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Transaction ID:</span>
              <span className="text-xs text-gray-400">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Date:</span>
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Go to Dashboard
          </button>
        </div>
      )}
      
      {paymentStatus === 'failed' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h3 className="text-xl font-heading font-bold mb-2">Payment Failed</h3>
          <p className="text-gray-400 mb-6">There was an issue processing your payment. Please try again.</p>
          
          <button
            onClick={() => setPaymentStatus('pending')}
            className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
