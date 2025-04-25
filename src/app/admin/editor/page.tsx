"use client";

import { useState } from 'react';

export default function WebsiteEditor() {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedElement, setSelectedElement] = useState(null);
  const [showCode, setShowCode] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Website Editor</h1>
          <p className="text-gray-400">Customize your website design and content</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 space-y-6">
            <div className="bg-grey rounded-lg p-4">
              <h3 className="font-heading font-bold mb-4">Tools</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('design')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'design' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Design
                </button>
                <button 
                  onClick={() => setActiveTab('elements')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'elements' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Elements
                </button>
                <button 
                  onClick={() => setActiveTab('pages')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'pages' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Pages
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'settings' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Settings
                </button>
                <button 
                  onClick={() => setShowCode(!showCode)}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    showCode 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Code Editor
                </button>
              </div>
            </div>
            
            {activeTab === 'design' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Design Options</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Scheme</label>
                    <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                      <option value="dark">Dark Theme</option>
                      <option value="light">Light Theme</option>
                      <option value="colorful">Colorful</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Typography</label>
                    <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="bold">Bold</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Layout</label>
                    <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                      <option value="default">Default</option>
                      <option value="alternative">Alternative</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'elements' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Elements</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Header
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Hero Section
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    About Section
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Gallery
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Services
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Testimonials
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Contact Form
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Footer
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'pages' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Pages</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-neon-blue text-black rounded-md font-bold">
                    Home
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    About
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Services
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Portfolio
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Contact
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full py-2 bg-dark-purple rounded-md hover:bg-opacity-80">
                    + Add New Page
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Website Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Website Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                      placeholder="My Fashion Portfolio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tagline</label>
                    <input 
                      type="text" 
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                      placeholder="Fashion Influencer & Stylist"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Favicon</label>
                    <button className="w-full py-2 bg-dark-purple rounded-md hover:bg-opacity-80">
                      Upload Favicon
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">SEO Settings</label>
                    <button className="w-full py-2 bg-dark-purple rounded-md hover:bg-opacity-80">
                      Configure SEO
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="bg-grey rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                    Desktop
                  </button>
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                    Tablet
                  </button>
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                    Mobile
                  </button>
                </div>
                <div>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                    Preview
                  </button>
                </div>
              </div>
              
              {!showCode ? (
                <div className="bg-black rounded-lg h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Website Preview</p>
                    <p className="text-sm text-gray-500">Visual editor will display here</p>
                  </div>
                </div>
              ) : (
                <div className="bg-black rounded-lg h-[600px] p-4">
                  <div className="flex space-x-2 mb-4">
                    <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      HTML
                    </button>
                    <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      CSS
                    </button>
                    <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      JavaScript
                    </button>
                  </div>
                  <div className="font-mono text-sm text-gray-300 overflow-auto h-[520px] p-2">
                    <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fashion Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <div class="container">
      <h1>Fashion Portfolio</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section id="hero">
    <div class="container">
      <h2>Fashion Influencer & Stylist</h2>
      <p>Creating trends and inspiring styles since 2020</p>
      <a href="#portfolio" class="btn">View My Work</a>
    </div>
  </section>

  <!-- More sections would be here -->

  <footer>
    <div class="container">
      <p>&copy; 2025 Fashion Portfolio. All rights reserved.</p>
    </div>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>`}</pre>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
