"use client";

import { useState } from 'react';

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Mock template data
  const templates = [
    {
      id: 'template-1',
      name: 'Fashion Portfolio Elite',
      category: 'fashion',
      thumbnail: '/assets/templates/fashion1.jpg',
      downloads: 245,
      rating: 4.8,
      date: '2025-03-15'
    },
    {
      id: 'template-2',
      name: 'Beauty Blog Premium',
      category: 'beauty',
      thumbnail: '/assets/templates/beauty1.jpg',
      downloads: 189,
      rating: 4.7,
      date: '2025-03-10'
    },
    {
      id: 'template-3',
      name: 'Fitness Coach Pro',
      category: 'fitness',
      thumbnail: '/assets/templates/fitness1.jpg',
      downloads: 156,
      rating: 4.6,
      date: '2025-03-05'
    },
    {
      id: 'template-4',
      name: 'Travel Explorer',
      category: 'travel',
      thumbnail: '/assets/templates/travel1.jpg',
      downloads: 132,
      rating: 4.5,
      date: '2025-02-28'
    },
    {
      id: 'template-5',
      name: 'Gaming Streamer Hub',
      category: 'gaming',
      thumbnail: '/assets/templates/gaming1.jpg',
      downloads: 118,
      rating: 4.4,
      date: '2025-02-20'
    }
  ];
  
  const filteredTemplates = templates.filter(template => {
    // Filter by category
    if (activeTab !== 'all' && template.category !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return template.name.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'popular') {
      return b.downloads - a.downloads;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Templates</h1>
          <p className="text-gray-400">Manage and create website templates</p>
        </div>
        
        <div className="bg-grey rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold">Template Library</h2>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Add New Template
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex overflow-x-auto pb-2 md:pb-0">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'all' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('fashion')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'fashion' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Fashion
              </button>
              <button 
                onClick={() => setActiveTab('beauty')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'beauty' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Beauty
              </button>
              <button 
                onClick={() => setActiveTab('fitness')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'fitness' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Fitness
              </button>
              <button 
                onClick={() => setActiveTab('travel')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'travel' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Travel
              </button>
              <button 
                onClick={() => setActiveTab('gaming')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'gaming' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Gaming
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full md:w-64 p-2 pl-8 bg-black border border-dark-purple rounded-md"
                />
                <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTemplates.map(template => (
              <div key={template.id} className="bg-black rounded-lg overflow-hidden">
                <div className="h-40 bg-dark-purple flex items-center justify-center">
                  <span className="text-neon-blue font-bold">{template.name}</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-heading font-bold">{template.name}</h3>
                    <span className="px-2 py-1 bg-dark-purple rounded-full text-xs capitalize">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>{template.downloads} downloads</span>
                    <span>★ {template.rating}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      Edit
                    </button>
                    <button className="flex-1 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      Preview
                    </button>
                    <button className="flex-1 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sortedTemplates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No templates found matching your filters</p>
            </div>
          )}
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-6">Template Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-2">Most Popular Template</h3>
              <p className="text-lg">{templates.sort((a, b) => b.downloads - a.downloads)[0].name}</p>
              <p className="text-sm text-gray-400">{templates.sort((a, b) => b.downloads - a.downloads)[0].downloads} downloads</p>
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-2">Highest Rated Template</h3>
              <p className="text-lg">{templates.sort((a, b) => b.rating - a.rating)[0].name}</p>
              <p className="text-sm text-gray-400">★ {templates.sort((a, b) => b.rating - a.rating)[0].rating}</p>
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-2">Total Templates</h3>
              <p className="text-lg">{templates.length}</p>
              <p className="text-sm text-gray-400">Across {new Set(templates.map(t => t.category)).size} categories</p>
            </div>
          </div>
          
          <div className="h-64 bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Template analytics chart will display here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
