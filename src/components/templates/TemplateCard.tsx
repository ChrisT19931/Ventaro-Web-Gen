import React from 'react';
import Link from 'next/link';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  featured?: boolean;
}

export default function TemplateCard({
  id,
  title,
  description,
  category,
  imageUrl,
  price,
  featured = false,
}: TemplateCardProps) {
  return (
    <div className={`template-card bg-grey rounded-lg overflow-hidden transition-all duration-300 ${
      featured ? 'border-2 border-neon-blue' : ''
    }`}>
      <div 
        className="h-48 bg-dark-purple relative overflow-hidden"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neon-blue font-bold">Template Preview</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-0 right-0 bg-neon-blue text-black px-3 py-1 text-xs font-bold">
            Featured
          </div>
        )}
        <div className="absolute top-2 left-2 bg-dark-purple bg-opacity-80 text-white px-2 py-1 text-xs rounded">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-neon-blue font-bold">${price}</span>
          <div className="flex space-x-2">
            <Link 
              href={`/templates/${id}/preview`}
              className="p-2 bg-dark-purple rounded hover:bg-opacity-80 text-sm"
            >
              Preview
            </Link>
            <Link 
              href={`/templates/${id}/customize`}
              className="p-2 bg-neon-blue text-black rounded hover:bg-opacity-80 text-sm font-medium"
            >
              Use Template
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
