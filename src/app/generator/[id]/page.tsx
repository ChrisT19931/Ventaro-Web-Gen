"use client";

import React, { useState, useEffect } from 'react';
import { templates } from '../../../components/templates/templateData';
import { WebsiteGeneratorServiceImpl } from '../../../components/generator/WebsiteGeneratorService';

export default function GeneratorPage({ params }: { params: { id: string } }) {
  // Find the template by ID
  const template = templates.find(t => t.id === params.id) || templates[0];
  
  const [activeTab, setActiveTab] = useState('preview');
  const [generatedCode, setGeneratedCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [customizations, setCustomizations] = useState({
    colorScheme: 'dark',
    typography: 'modern',
    layout: 'default',
    sections: {
      header: { enabled: true },
      hero: { enabled: true },
      about: { enabled: true },
      portfolio: { enabled: true },
      gallery: { enabled: true },
      services: { enabled: true },
      testimonials: { enabled: true },
      contact: { enabled: true },
      footer: { enabled: true }
    },
    title: template.title || template.name,
    category: template.category
  });
  
  const generatorService = new WebsiteGeneratorServiceImpl();
  
  // Generate website code on component mount
  useEffect(() => {
    const generateWebsite = async () => {
      try {
        const generated = await generatorService.generateWebsite(template, customizations);
        setGeneratedCode({
          html: generated.html,
          css: generated.css,
          js: generated.js
        });
      } catch (error) {
        console.error('Error generating website:', error);
      }
    };
    
    generateWebsite();
  }, [template, customizations]);
  
  // Handle customization changes
  const handleCustomizationChange = (key: string, value: any) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle section toggle
  const toggleSection = (sectionName: string) => {
    setCustomizations(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: { 
          ...prev.sections[sectionName as keyof typeof prev.sections],
          enabled: !prev.sections[sectionName as keyof typeof prev.sections].enabled 
        }
      }
    }));
  };
  
  // Export code for Wix
  const exportForWix = () => {
    // Create a combined HTML file with inline CSS and JS
    const wixHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${customizations.title}</title>
  <style>
${generatedCode.css}
  </style>
</head>
<body>
${generatedCode.html}
  <script>
${generatedCode.js}
  </script>
</body>
</html>
    `;
    
    // Create a download link
    const blob = new Blob([wixHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}-for-wix.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">{template.name}</h1>
          <p className="text-gray-400">Customize and generate your website</p>
        </div>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'customize' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
              onClick={() => setActiveTab('customize')}
            >
              Customize
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'preview' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'code' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
          </div>
        </div>
        
        {activeTab === 'customize' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Template Options</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Scheme</label>
                    <select
                      value={customizations.colorScheme}
                      onChange={(e) => handleCustomizationChange('colorScheme', e.target.value)}
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                    >
                      <option value="dark">Dark Theme</option>
                      <option value="light">Light Theme</option>
                      <option value="colorful">Colorful</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Typography</label>
                    <select
                      value={customizations.typography}
                      onChange={(e) => handleCustomizationChange('typography', e.target.value)}
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                    >
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="bold">Bold</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Layout</label>
                    <select
                      value={customizations.layout}
                      onChange={(e) => handleCustomizationChange('layout', e.target.value)}
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                    >
                      <option value="default">Default</option>
                      <option value="alternative">Alternative</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Sections</h2>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(customizations.sections).map((section) => (
                    <div key={section} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`section-${section}`}
                        className="mr-2"
                        checked={customizations.sections[section as keyof typeof customizations.sections].enabled}
                        onChange={() => toggleSection(section)}
                      />
                      <label htmlFor={`section-${section}`} className="capitalize">
                        {section}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'preview' && (
          <div className="bg-grey rounded-lg p-6">
            <div className="bg-black rounded-lg h-[600px] overflow-hidden">
              <iframe
                srcDoc={`
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${customizations.title}</title>
                    <style>${generatedCode.css}</style>
                  </head>
                  <body>
                    ${generatedCode.html}
                    <script>${generatedCode.js}</script>
                  </body>
                  </html>
                `}
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts"
              ></iframe>
            </div>
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">HTML</h2>
              <div className="bg-black p-4 rounded-lg h-[400px] overflow-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {generatedCode.html}
                </pre>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">CSS</h2>
              <div className="bg-black p-4 rounded-lg h-[400px] overflow-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {generatedCode.css}
                </pre>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">JavaScript</h2>
              <div className="bg-black p-4 rounded-lg h-[400px] overflow-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {generatedCode.js}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <a
            href={`/templates/${params.id}/customize`}
            className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
          >
            Back to Customization
          </a>
          
          <button
            onClick={exportForWix}
            className="px-4 py-2 bg-neon-blue text-black rounded font-bold"
          >
            Export for Wix
          </button>
        </div>
      </div>
    </div>
  );
}
