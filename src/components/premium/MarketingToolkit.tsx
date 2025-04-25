import React, { useState } from 'react';

interface MarketingToolkitProps {
  websiteId?: string;
}

export default function MarketingToolkit({ websiteId }: MarketingToolkitProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'social' | 'seo'>('email');
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">MT</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Marketing Toolkit</h2>
      </div>
      
      <p className="mb-6">
        Promote your influencer website with our comprehensive marketing toolkit.
        Create email templates, social media graphics, and optimize your content for maximum reach.
      </p>
      
      <div className="mb-6">
        <div className="flex border-b border-dark-purple">
          <button
            onClick={() => setActiveTab('email')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'email' 
                ? 'border-b-2 border-neon-blue text-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Email Templates
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'social' 
                ? 'border-b-2 border-neon-blue text-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Social Media Graphics
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'seo' 
                ? 'border-b-2 border-neon-blue text-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SEO Content
          </button>
        </div>
      </div>
      
      {activeTab === 'email' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Welcome Email</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Welcome Email</h4>
                <p className="text-sm text-gray-300 mb-4">Introduce yourself and your brand to new subscribers.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Use Template</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">New Content Alert</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">New Content Alert</h4>
                <p className="text-sm text-gray-300 mb-4">Notify subscribers about your latest content or products.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Use Template</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Promotional Email</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Promotional Email</h4>
                <p className="text-sm text-gray-300 mb-4">Promote your services, products, or special offers.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Use Template</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-purple rounded-lg p-4 mb-6">
            <h3 className="font-heading font-bold mb-2">Email Marketing Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Personalize your emails with the subscriber's name</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Write compelling subject lines to improve open rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Include a clear call-to-action in every email</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Optimize for mobile devices as most people check email on their phones</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-dark-purple rounded">View All Templates</button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">Create Custom Email</button>
          </div>
        </div>
      )}
      
      {activeTab === 'social' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Instagram Post</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Instagram Post</h4>
                <p className="text-sm text-gray-300 mb-4">Square format graphics optimized for Instagram feed.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Create</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Instagram Story</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Instagram Story</h4>
                <p className="text-sm text-gray-300 mb-4">Vertical graphics designed for Instagram stories.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Create</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Twitter/X Post</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Twitter/X Post</h4>
                <p className="text-sm text-gray-300 mb-4">Graphics optimized for Twitter/X feed.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Create</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-purple rounded-lg p-4 mb-6">
            <h3 className="font-heading font-bold mb-2">Social Media Caption Generator</h3>
            <p className="text-sm mb-4">
              Generate engaging captions for your social media posts with our AI-powered caption generator.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Post Type</label>
                <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                  <option value="product">Product Showcase</option>
                  <option value="lifestyle">Lifestyle Content</option>
                  <option value="tutorial">Tutorial/How-To</option>
                  <option value="announcement">Announcement</option>
                  <option value="behind-scenes">Behind the Scenes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                  <option value="professional">Professional</option>
                  <option value="casual">Casual & Friendly</option>
                  <option value="inspirational">Inspirational</option>
                  <option value="humorous">Humorous</option>
                  <option value="educational">Educational</option>
                </select>
              </div>
              
              <button className="w-full py-2 bg-neon-blue text-black rounded font-bold">
                Generate Caption
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-dark-purple rounded">View All Templates</button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">Custom Design</button>
          </div>
        </div>
      )}
      
      {activeTab === 'seo' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-4">SEO Content Generator</h3>
              <p className="text-sm mb-4">
                Generate SEO-optimized content for your website to improve search engine rankings.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <select className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md">
                    <option value="about">About Me Page</option>
                    <option value="services">Services Page</option>
                    <option value="blog">Blog Post</option>
                    <option value="product">Product Description</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Keyword</label>
                  <input
                    type="text"
                    placeholder="e.g., fashion influencer, fitness coach"
                    className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md"
                  />
                </div>
                
                <button className="w-full py-2 bg-neon-blue text-black rounded font-bold">
                  Generate Content
                </button>
              </div>
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-4">Keyword Research</h3>
              <p className="text-sm mb-4">
                Find the best keywords for your niche to improve your website's visibility.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Niche</label>
                  <select className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md">
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                    <option value="fitness">Fitness</option>
                    <option value="travel">Travel</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="gaming">Gaming</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Seed Keyword</label>
                  <input
                    type="text"
                    placeholder="e.g., sustainable fashion, makeup tutorials"
                    className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md"
                  />
                </div>
                
                <button className="w-full py-2 bg-neon-blue text-black rounded font-bold">
                  Find Keywords
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-purple rounded-lg p-4 mb-6">
            <h3 className="font-heading font-bold mb-2">SEO Checklist</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="meta-tags" className="mr-2" />
                <label htmlFor="meta-tags" className="text-sm">Optimize meta title and description</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="headings" className="mr-2" />
                <label htmlFor="headings" className="text-sm">Use proper heading structure (H1, H2, H3)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="alt-text" className="mr-2" />
                <label htmlFor="alt-text" className="text-sm">Add alt text to all images</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="internal-links" className="mr-2" />
                <label htmlFor="internal-links" className="text-sm">Include internal links to other pages</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="mobile-friendly" className="mr-2" />
                <label htmlFor="mobile-friendly" className="text-sm">Ensure website is mobile-friendly</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="page-speed" className="mr-2" />
                <label htmlFor="page-speed" className="text-sm">Optimize page loading speed</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="social-meta" className="mr-2" />
                <label htmlFor="social-meta" className="text-sm">Add social media meta tags</label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-dark-purple rounded">SEO Guide</button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">Run SEO Audit</button>
          </div>
        </div>
      )}
    </div>
  );
}
