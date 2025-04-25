import React, { useState } from 'react';

interface SocialMediaIntegrationProps {
  websiteId?: string;
}

export default function SocialMediaIntegration({ websiteId }: SocialMediaIntegrationProps) {
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const connectAccount = (platform: string) => {
    setIsConnecting(true);
    
    // In a real implementation, this would open OAuth flow for the platform
    // For now, we'll simulate a delay and add the platform to connected accounts
    setTimeout(() => {
      setConnectedAccounts(prev => [...prev, platform]);
      setIsConnecting(false);
    }, 1500);
  };
  
  const disconnectAccount = (platform: string) => {
    setConnectedAccounts(prev => prev.filter(p => p !== platform));
  };
  
  const isConnected = (platform: string) => {
    return connectedAccounts.includes(platform);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">SM</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Social Media Integration</h2>
      </div>
      
      <p className="mb-6">
        Connect your social media accounts to enhance your website with live feeds, automatic post sharing,
        and seamless content integration.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Instagram */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">IG</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">Instagram</h3>
              <p className="text-sm text-gray-400">Connect your Instagram feed</p>
            </div>
          </div>
          
          {isConnected('instagram') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('instagram')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest posts</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show post captions</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Auto-share new website content</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('instagram')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect Instagram'}
            </button>
          )}
        </div>
        
        {/* TikTok */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TT</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">TikTok</h3>
              <p className="text-sm text-gray-400">Embed your TikTok videos</p>
            </div>
          </div>
          
          {isConnected('tiktok') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('tiktok')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest videos</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Autoplay videos</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show video stats</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('tiktok')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect TikTok'}
            </button>
          )}
        </div>
        
        {/* YouTube */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">YT</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">YouTube</h3>
              <p className="text-sm text-gray-400">Showcase your YouTube channel</p>
            </div>
          </div>
          
          {isConnected('youtube') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('youtube')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest videos</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show video descriptions</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Enable channel subscription</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('youtube')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect YouTube'}
            </button>
          )}
        </div>
        
        {/* Twitter/X */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-gray-700">
              <span className="text-white font-bold">X</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">Twitter/X</h3>
              <p className="text-sm text-gray-400">Display your Twitter feed</p>
            </div>
          </div>
          
          {isConnected('twitter') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('twitter')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest tweets</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show retweets</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Auto-share new website content</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('twitter')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect Twitter/X'}
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-dark-purple rounded-lg p-6">
        <h3 className="font-heading font-bold mb-4">Social Feed Preview</h3>
        
        {connectedAccounts.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-black aspect-square rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">Post Preview {item}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm">Connected accounts: {connectedAccounts.length}</span>
              </div>
              <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
                Customize Layout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Connect at least one social media account to preview your feed</p>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Connect Accounts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
