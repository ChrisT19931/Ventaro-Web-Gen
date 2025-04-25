import React, { useState, useEffect } from 'react';
import { templates } from './templateData';
import { TemplateCategory, TemplateFilter } from './types';
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  filter?: Partial<TemplateFilter>;
  limit?: number;
}

export default function TemplateGrid({ filter, limit }: TemplateGridProps) {
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  
  useEffect(() => {
    let result = [...templates];
    
    if (filter) {
      // Filter by categories
      if (filter.categories && filter.categories.length > 0) {
        result = result.filter(template => 
          filter.categories.includes(template.category as TemplateCategory)
        );
      }
      
      // Filter by tags
      if (filter.tags && filter.tags.length > 0) {
        result = result.filter(template => 
          filter.tags.some(tag => template.tags.includes(tag))
        );
      }
      
      // Filter by featured
      if (filter.featured) {
        result = result.filter(template => template.featured);
      }
      
      // Filter by search term
      if (filter.search && filter.search.trim() !== '') {
        const searchTerm = filter.search.toLowerCase().trim();
        result = result.filter(template => 
          template.title.toLowerCase().includes(searchTerm) || 
          template.description.toLowerCase().includes(searchTerm) ||
          template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      result = result.slice(0, limit);
    }
    
    setFilteredTemplates(result);
  }, [filter, limit]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.length > 0 ? (
        filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            id={template.id}
            title={template.title}
            description={template.description}
            category={template.category}
            imageUrl={template.imageUrl}
            price={template.price}
            featured={template.featured}
          />
        ))
      ) : (
        <div className="col-span-3 py-12 text-center">
          <p className="text-gray-400">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
