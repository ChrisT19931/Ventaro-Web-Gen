import React, { useState } from 'react';

interface CustomDomainProps {
  websiteId?: string;
}

export default function CustomDomainConnection({ websiteId }: CustomDomainProps) {
  const [domain, setDomain] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'verified' | 'error'>('none');
  const [errorMessage, setErrorMessage] = useState('');
  
  const connectDomain = () => {
    if (!domain) return;
    
    setIsConnecting(true);
    setConnectionStatus('pending');
    
    // In a real implementation, this would initiate the domain connection process
    // For now, we'll simulate a delay and set the status to pending
    setTimeout(() => {
      setIsConnecting(false);
    }, 1500);
  };
  
  const verifyDomain = () => {
    setIsVerifying(true);
    
    // In a real implementation, this would check DNS records
    // For now, we'll simulate a delay and set the status to verified
    setTimeout(() => {
      setConnectionStatus('verified');
      setIsVerifying(false);
    }, 2000);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">CD</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Custom Domain Connection</h2>
      </div>
      
      <p className="mb-6">
        Connect your own domain name to your website for a professional online presence.
        Your visitors will see your custom domain instead of our default URL.
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Domain Name</label>
          <div className="flex">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="yourdomain.com"
              className="flex-1 p-3 bg-black border border-dark-purple rounded-l-md focus:ring-2 focus:ring-neon-blue"
              disabled={connectionStatus === 'pending' || connectionStatus === 'verified'}
            />
            <button
              onClick={connectDomain}
              disabled={!domain || isConnecting || connectionStatus === 'verified'}
              className="px-4 py-3 bg-neon-blue text-black rounded-r-md font-bold"
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Enter your domain without 'http://' or 'www.' (e.g., yourdomain.com)
          </p>
        </div>
        
        {connectionStatus === 'pending' && (
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">DNS Configuration</h3>
            <p className="text-sm mb-4">
              To connect your domain, you'll need to update your DNS records at your domain registrar.
              Add the following records:
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-dark-purple">
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Type</th>
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Name</th>
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Value</th>
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">TTL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-dark-purple">
                    <td className="py-2 text-sm">A</td>
                    <td className="py-2 text-sm">@</td>
                    <td className="py-2 text-sm">192.168.100.1</td>
                    <td className="py-2 text-sm">3600</td>
                  </tr>
                  <tr className="border-b border-dark-purple">
                    <td className="py-2 text-sm">CNAME</td>
                    <td className="py-2 text-sm">www</td>
                    <td className="py-2 text-sm">{domain}</td>
                    <td className="py-2 text-sm">3600</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm">TXT</td>
                    <td className="py-2 text-sm">@</td>
                    <td className="py-2 text-sm">website-verification=abc123</td>
                    <td className="py-2 text-sm">3600</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm mb-4">
              DNS changes can take up to 48 hours to propagate. Once you've updated your DNS records,
              click the Verify button to check if your domain is properly connected.
            </p>
            
            <button
              onClick={verifyDomain}
              disabled={isVerifying}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium"
            >
              {isVerifying ? 'Verifying...' : 'Verify Connection'}
            </button>
          </div>
        )}
        
        {connectionStatus === 'verified' && (
          <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="font-heading font-bold text-green-500">Domain Successfully Connected!</h3>
            </div>
            
            <p className="text-sm mb-4">
              Your domain {domain} is now connected to your website. Visitors can access your site at:
            </p>
            
            <div className="bg-black p-3 rounded mb-4">
              <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">
                https://{domain}
              </a>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">SSL Certificate</span>
                <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Active</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Domain Status</span>
                <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Active</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">DNS Propagation</span>
                <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Complete</span>
              </div>
            </div>
          </div>
        )}
        
        {connectionStatus === 'error' && (
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h3 className="font-heading font-bold text-red-500">Connection Error</h3>
            </div>
            
            <p className="text-sm mb-4">
              {errorMessage || "We couldn't connect your domain. Please check your DNS settings and try again."}
            </p>
            
            <button
              onClick={() => setConnectionStatus('none')}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium"
            >
              Try Again
            </button>
          </div>
        )}
        
        <div className="bg-dark-purple rounded-lg p-4">
          <h3 className="font-heading font-bold mb-2">Domain Benefits</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Professional branding with your own domain name</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Free SSL certificate for secure browsing</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Improved SEO and search engine visibility</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Email forwarding options (coming soon)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
