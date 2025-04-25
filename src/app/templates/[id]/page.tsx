"use client";

import React, { useState, useEffect } from 'react';
import { templates } from '../../../components/templates/templateData';

export default function TemplatePage({ params }: { params: { id: string } }) {
  const [template, setTemplate] = useState(templates.find(t => t.id === params.id) || templates[0]);
  
  // Enhanced template features display
  const renderFeatures = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {template.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-neon-blue">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="ml-3 text-gray-300">{feature}</p>
          </div>
        ))}
      </div>
    );
  };
  
  // Enhanced template preview with interactive elements
  const renderPreview = () => {
    return (
      <div className="bg-dark-purple rounded-lg overflow-hidden">
        <div className="h-96 bg-grey flex items-center justify-center">
          <h3 className="text-3xl font-heading text-neon-blue">{template.name}</h3>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {template.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-black rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          <h2 className="text-2xl font-heading font-bold mb-4">Template Preview</h2>
          <p className="text-gray-300 mb-6">
            This template is designed specifically for {template.category} influencers. It includes all the sections you need to showcase your work and connect with your audience.
          </p>
          
          <h3 className="text-xl font-heading font-bold mb-3">Key Sections</h3>
          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
            <li>Professional header with navigation</li>
            <li>Hero section with call-to-action</li>
            <li>About section to tell your story</li>
            <li>Portfolio/Gallery to showcase your work</li>
            <li>Services section to highlight what you offer</li>
            <li>Testimonials from clients or followers</li>
            <li>Contact form for inquiries</li>
            <li>Footer with social media links</li>
          </ul>
          
          <h3 className="text-xl font-heading font-bold mb-3">Customization Options</h3>
          <p className="text-gray-300 mb-6">
            You can customize colors, typography, layout, and content to match your personal brand. The template is fully responsive and works on all devices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href={`/templates/${params.id}/customize`}
              className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold text-center"
            >
              Customize This Template
            </a>
            <a
              href="/templates"
              className="px-6 py-3 bg-dark-purple border border-neon-blue rounded-md text-center"
            >
              Back to Templates
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold">{template.name}</h1>
          <p className="text-gray-400">{template.description}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderPreview()}
          </div>
          
          <div className="space-y-6">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-2xl font-heading font-bold mb-4">Template Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Category</h3>
                  <p className="text-neon-blue capitalize">{template.category}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Best For</h3>
                  <p className="text-gray-300">
                    {template.category === 'fashion' && 'Fashion bloggers, models, stylists, and designers'}
                    {template.category === 'beauty' && 'Makeup artists, beauty bloggers, and cosmetic reviewers'}
                    {template.category === 'fitness' && 'Personal trainers, fitness coaches, and wellness influencers'}
                    {template.category === 'travel' && 'Travel bloggers, photographers, and adventure guides'}
                    {template.category === 'gaming' && 'Streamers, esports players, and gaming content creators'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  {renderFeatures()}
                </div>
                
                <div className="pt-4">
                  <a
                    href={`/templates/${params.id}/customize`}
                    className="w-full block px-6 py-3 bg-neon-blue text-black rounded-md font-bold text-center"
                  >
                    Start Customizing
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-2xl font-heading font-bold mb-4">Wix Integration</h2>
              <p className="text-gray-300 mb-4">
                This template can be easily integrated with your Wix website. After customization, you can export the code and add it to your Wix site using the HTML iFrame component.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Fully compatible with Wix</li>
                <li>One-click export for Wix</li>
                <li>Easy integration instructions</li>
                <li>Responsive on all devices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
