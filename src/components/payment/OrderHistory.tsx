import React, { useState } from 'react';

interface OrderHistoryProps {
  userId?: string;
}

export default function OrderHistory({ userId }: OrderHistoryProps) {
  // Mock order data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2025-04-20',
      templateName: 'Fashion Portfolio Elite',
      amount: 50.00,
      status: 'completed',
      websiteUrl: 'https://fashion-portfolio.example.com'
    },
    {
      id: 'ORD-002',
      date: '2025-04-15',
      templateName: 'Beauty Blog Premium',
      amount: 45.00, // With discount
      status: 'completed',
      websiteUrl: 'https://beauty-blog.example.com'
    },
    {
      id: 'ORD-003',
      date: '2025-04-10',
      templateName: 'Fitness Coach Pro',
      amount: 50.00,
      status: 'processing',
      websiteUrl: null
    }
  ]);
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-6">Order History</h2>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-heading font-bold">{order.templateName}</h3>
                  <p className="text-xs text-gray-400">Order ID: {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.amount.toFixed(2)}</p>
                  <p className="text-xs">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'completed' 
                      ? 'bg-green-900 text-green-500' 
                      : 'bg-yellow-900 text-yellow-500'
                  }`}>
                    {order.status === 'completed' ? 'Completed' : 'Processing'}
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  {order.websiteUrl && (
                    <a 
                      href={order.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80"
                    >
                      View Website
                    </a>
                  )}
                  
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                    {order.status === 'completed' ? 'Download Files' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center">
            <button className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80">
              View All Orders
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
          <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
            Browse Templates
          </button>
        </div>
      )}
    </div>
  );
}
