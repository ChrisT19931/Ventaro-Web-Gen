import React, { useState } from 'react';
import { Template } from '../templates/templateData';
import { TemplateCustomization } from './types';

interface ResponsivePreviewProps {
  template: Template;
  customization: TemplateCustomization;
  previewHtml: string;
}

export default function ResponsivePreview({ template, customization, previewHtml }: ResponsivePreviewProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const getPreviewWidth = () => {
    switch (deviceType) {
      case 'desktop':
        return 'w-full max-w-6xl';
      case 'tablet':
        return 'w-full max-w-md';
      case 'mobile':
        return 'w-full max-w-xs';
    }
  };
  
  return (
    <div className="bg-grey rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button 
            onClick={() => setDeviceType('desktop')}
            className={`p-2 rounded ${
              deviceType === 'desktop' ? 'bg-dark-purple text-neon-blue' : 'hover:bg-dark-purple'
            }`}
          >
            Desktop
          </button>
          <button 
            onClick={() => setDeviceType('tablet')}
            className={`p-2 rounded ${
              deviceType === 'tablet' ? 'bg-dark-purple text-neon-blue' : 'hover:bg-dark-purple'
            }`}
          >
            Tablet
          </button>
          <button 
            onClick={() => setDeviceType('mobile')}
            className={`p-2 rounded ${
              deviceType === 'mobile' ? 'bg-dark-purple text-neon-blue' : 'hover:bg-dark-purple'
            }`}
          >
            Mobile
          </button>
        </div>
        <button className="p-2 bg-dark-purple rounded">
          Preview Live
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-auto bg-black">
        <div className={`mx-auto ${getPreviewWidth()}`}>
          <div className="bg-white text-black rounded overflow-hidden">
            <iframe
              srcDoc={previewHtml}
              className="w-full min-h-[800px] border-0"
              title="Website Preview"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 border-t border-dark-purple">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">
              Previewing: <span className="text-neon-blue">{template.title}</span>
            </span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-dark-purple rounded border border-neon-blue">
              Edit Template
            </button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Export Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
