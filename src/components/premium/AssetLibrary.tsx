import React, { useState } from 'react';

interface AssetLibraryProps {
  websiteId?: string;
}

export default function AssetLibrary({ websiteId }: AssetLibraryProps) {
  const [activeCategory, setActiveCategory] = useState('images');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  
  // Mock asset data
  const assets = {
    images: [
      { id: 'img1', name: 'Fashion Model 1', category: 'fashion', thumbnail: '/assets/fashion1.jpg', premium: true },
      { id: 'img2', name: 'Fashion Model 2', category: 'fashion', thumbnail: '/assets/fashion2.jpg', premium: true },
      { id: 'img3', name: 'Fitness Trainer', category: 'fitness', thumbnail: '/assets/fitness1.jpg', premium: true },
      { id: 'img4', name: 'Travel Landscape', category: 'travel', thumbnail: '/assets/travel1.jpg', premium: true },
      { id: 'img5', name: 'Beauty Product', category: 'beauty', thumbnail: '/assets/beauty1.jpg', premium: true },
      { id: 'img6', name: 'Gaming Setup', category: 'gaming', thumbnail: '/assets/gaming1.jpg', premium: true },
      { id: 'img7', name: 'Lifestyle Shot', category: 'lifestyle', thumbnail: '/assets/lifestyle1.jpg', premium: false },
      { id: 'img8', name: 'Food Photography', category: 'food', thumbnail: '/assets/food1.jpg', premium: false },
    ],
    icons: [
      { id: 'icon1', name: 'Social Media Icons', category: 'social', thumbnail: '/assets/icons1.jpg', premium: true },
      { id: 'icon2', name: 'E-commerce Icons', category: 'ecommerce', thumbnail: '/assets/icons2.jpg', premium: true },
      { id: 'icon3', name: 'UI Elements', category: 'ui', thumbnail: '/assets/icons3.jpg', premium: true },
      { id: 'icon4', name: 'Line Icons', category: 'line', thumbnail: '/assets/icons4.jpg', premium: false },
    ],
    fonts: [
      { id: 'font1', name: 'Montserrat', category: 'sans-serif', thumbnail: '/assets/font1.jpg', premium: true },
      { id: 'font2', name: 'Nunito Sans', category: 'sans-serif', thumbnail: '/assets/font2.jpg', premium: true },
      { id: 'font3', name: 'Playfair Display', category: 'serif', thumbnail: '/assets/font3.jpg', premium: true },
      { id: 'font4', name: 'Roboto', category: 'sans-serif', thumbnail: '/assets/font4.jpg', premium: false },
    ],
    graphics: [
      { id: 'graphic1', name: 'Abstract Shapes', category: 'abstract', thumbnail: '/assets/graphic1.jpg', premium: true },
      { id: 'graphic2', name: 'Background Patterns', category: 'patterns', thumbnail: '/assets/graphic2.jpg', premium: true },
      { id: 'graphic3', name: 'Gradients', category: 'gradients', thumbnail: '/assets/graphic3.jpg', premium: true },
      { id: 'graphic4', name: 'Textures', category: 'textures', thumbnail: '/assets/graphic4.jpg', premium: false },
    ]
  };
  
  const getFilteredAssets = () => {
    const categoryAssets = assets[activeCategory as keyof typeof assets] || [];
    
    if (!searchQuery) return categoryAssets;
    
    return categoryAssets.filter(asset => 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const toggleAssetSelection = (assetId: string) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter(id => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">AL</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Premium Asset Library</h2>
      </div>
      
      <p className="mb-6">
        Access our curated collection of premium assets to enhance your website.
        High-quality images, icons, fonts, and graphics designed specifically for influencers.
      </p>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setActiveCategory('images')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'images' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Images
            </button>
            <button 
              onClick={() => setActiveCategory('icons')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'icons' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Icons
            </button>
            <button 
              onClick={() => setActiveCategory('fonts')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'fonts' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Fonts
            </button>
            <button 
              onClick={() => setActiveCategory('graphics')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'graphics' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Graphics
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeCategory}...`}
              className="w-full md:w-64 p-2 pl-8 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            />
            <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {getFilteredAssets().map(asset => (
            <div 
              key={asset.id}
              onClick={() => toggleAssetSelection(asset.id)}
              className={`bg-black rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedAssets.includes(asset.id) ? 'ring-2 ring-neon-blue' : 'hover:bg-dark-purple'
              }`}
            >
              <div className="h-32 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">{asset.name}</span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium truncate">{asset.name}</h4>
                  {asset.premium && (
                    <span className="px-2 py-0.5 bg-neon-blue text-black rounded text-xs font-bold">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 capitalize">{asset.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        {getFilteredAssets().length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No assets found matching your search</p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">{selectedAssets.length} assets selected</span>
          </div>
          <div className="flex space-x-3">
            <button 
              disabled={selectedAssets.length === 0}
              className={`px-4 py-2 rounded-md ${
                selectedAssets.length > 0 
                  ? 'bg-dark-purple hover:bg-opacity-80' 
                  : 'bg-dark-purple opacity-50 cursor-not-allowed'
              }`}
            >
              Preview
            </button>
            <button 
              disabled={selectedAssets.length === 0}
              className={`px-4 py-2 rounded-md ${
                selectedAssets.length > 0 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple opacity-50 cursor-not-allowed'
              }`}
            >
              Add to Website
            </button>
          </div>
        </div>
        
        <div className="bg-dark-purple rounded-lg p-4">
          <h3 className="font-heading font-bold mb-2">Premium Assets</h3>
          <p className="text-sm mb-4">
            Our premium asset library includes over 5,000 high-quality assets specifically designed for influencer websites.
            All assets are licensed for commercial use and regularly updated with new content.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <p className="font-bold text-2xl text-neon-blue">2,500+</p>
              <p>Stock Photos</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-neon-blue">1,000+</p>
              <p>Icons</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-neon-blue">200+</p>
              <p>Premium Fonts</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-neon-blue">1,500+</p>
              <p>Graphics & Elements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
