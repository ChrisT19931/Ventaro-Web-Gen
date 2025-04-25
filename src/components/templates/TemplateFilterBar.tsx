import React, { useState } from 'react';
import { TemplateCategory } from './types';

interface TemplateFilterBarProps {
  categories: TemplateCategory[];
  popularTags: string[];
  onFilterChange: (filter: any) => void;
}

export default function TemplateFilterBar({ 
  categories, 
  popularTags, 
  onFilterChange 
}: TemplateFilterBarProps) {
  const [selectedCategories, setSelectedCategories] = useState<TemplateCategory[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  const handleCategoryToggle = (category: TemplateCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFeaturedToggle = () => {
    setShowFeaturedOnly(prev => !prev);
  };
  
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      tags: selectedTags,
      featured: showFeaturedOnly,
      search: searchTerm
    });
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchTerm('');
    setShowFeaturedOnly(false);
    onFilterChange({
      categories: [],
      tags: [],
      featured: false,
      search: ''
    });
  };
  
  return (
    <div className="bg-grey rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold mb-4 md:mb-0">Filter Templates</h2>
        <div className="flex space-x-4">
          <button 
            onClick={applyFilters}
            className="btn-primary px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
          <button 
            onClick={resetFilters}
            className="bg-dark-purple px-4 py-2 rounded-md border border-neon-blue"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search templates..." 
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          />
        </div>
        
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium mb-2">Categories</label>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category}`} className="capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Popular Tags</label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-xs ${
                  selectedTags.includes(tag)
                    ? 'bg-neon-blue text-black'
                    : 'bg-dark-purple text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured */}
        <div>
          <label className="block text-sm font-medium mb-2">Options</label>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="featured-only"
              checked={showFeaturedOnly}
              onChange={handleFeaturedToggle}
              className="mr-2"
            />
            <label htmlFor="featured-only">
              Featured templates only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
