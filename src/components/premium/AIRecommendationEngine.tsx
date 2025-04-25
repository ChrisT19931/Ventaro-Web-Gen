import React, { useState } from 'react';
import { Template } from '../templates/templateData';

interface AIRecommendationProps {
  userPreferences?: {
    industry?: string;
    style?: string;
    goals?: string[];
    audience?: string;
  };
  onRecommendationSelected: (templateId: string) => void;
}

export default function AIRecommendationEngine({ userPreferences, onRecommendationSelected }: AIRecommendationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState<Template[]>([]);
  
  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // In a real implementation, this would call an AI service
    // For now, we'll simulate a delay and return mock recommendations
    setTimeout(() => {
      // Mock recommendations based on user input
      const mockRecommendations = [
        {
          id: 'fashion-portfolio-1',
          title: 'Fashion Portfolio Elite',
          description: 'Recommended based on your style preferences and audience demographics.',
          category: 'fashion',
          imageUrl: '/templates/fashion-portfolio-1.jpg',
          price: 50,
          featured: true,
          tags: ['fashion', 'portfolio', 'minimalist', 'elegant']
        },
        {
          id: 'lifestyle-blog-1',
          title: 'Lifestyle Blog Elite',
          description: 'This template aligns with your content goals and engagement strategy.',
          category: 'lifestyle',
          imageUrl: '/templates/lifestyle-blog-1.jpg',
          price: 50,
          featured: true,
          tags: ['lifestyle', 'blog', 'versatile', 'multi-niche']
        },
        {
          id: 'beauty-portfolio-1',
          title: 'Beauty Portfolio',
          description: 'Based on your audience demographics and content style.',
          category: 'beauty',
          imageUrl: '/templates/beauty-portfolio-1.jpg',
          price: 50,
          featured: true,
          tags: ['beauty', 'portfolio', 'makeup', 'skincare']
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">AI</span>
        </div>
        <h2 className="text-xl font-heading font-bold">AI Template Recommendations</h2>
      </div>
      
      <p className="mb-6">
        Our AI can analyze your needs and recommend the perfect template for your influencer website.
        Describe your content, style preferences, and audience to get personalized recommendations.
      </p>
      
      <div className="space-y-4 mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your influencer niche, content style, and what you want to achieve with your website..."
          className="w-full p-4 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue h-32"
        ></textarea>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Niche</label>
            <select className="w-full p-3 bg-black border border-dark-purple rounded-md">
              <option value="">Select your niche</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="fitness">Fitness</option>
              <option value="travel">Travel</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Content Focus</label>
            <select className="w-full p-3 bg-black border border-dark-purple rounded-md">
              <option value="">Select content type</option>
              <option value="photos">Photography</option>
              <option value="videos">Video Content</option>
              <option value="blog">Written Content</option>
              <option value="products">Product Showcase</option>
              <option value="services">Services</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Audience Age</label>
            <select className="w-full p-3 bg-black border border-dark-purple rounded-md">
              <option value="">Select age range</option>
              <option value="teens">13-17</option>
              <option value="young-adults">18-24</option>
              <option value="adults">25-34</option>
              <option value="mature">35-50</option>
              <option value="senior">50+</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={generateRecommendations}
          disabled={isGenerating}
          className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
        >
          {isGenerating ? 'Analyzing Your Needs...' : 'Get AI Recommendations'}
        </button>
      </div>
      
      {recommendations.length > 0 && (
        <div className="border-t border-dark-purple pt-6">
          <h3 className="font-heading font-bold mb-4">Recommended Templates for You</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((template) => (
              <div key={template.id} className="bg-black rounded-lg overflow-hidden border border-dark-purple">
                <div className="h-40 bg-dark-purple flex items-center justify-center">
                  <span className="text-neon-blue font-bold">Template Preview</span>
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-bold mb-2">{template.title}</h4>
                  <p className="text-sm text-gray-300 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-neon-blue font-bold">${template.price}</span>
                    <button
                      onClick={() => onRecommendationSelected(template.id)}
                      className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold"
                    >
                      Select Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-dark-purple rounded-lg">
            <h4 className="font-heading font-bold mb-2">Why These Templates?</h4>
            <p className="text-sm">
              Our AI analyzed your requirements and found these templates to be the best match for your influencer profile.
              They align with your content style, audience demographics, and business goals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
