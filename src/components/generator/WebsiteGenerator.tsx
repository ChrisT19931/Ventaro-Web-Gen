"use client";

import React, { useState, useEffect } from 'react';
import { WebsiteGeneratorServiceImpl } from './WebsiteGeneratorService';

interface WebsiteGeneratorProps {
  templateId: string;
  customizations: any;
  onPreviewUpdate?: (previewHtml: string) => void;
}

export default function WebsiteGenerator({ templateId, customizations, onPreviewUpdate }: WebsiteGeneratorProps) {
  const [generatedCode, setGeneratedCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  
  const generatorService = new WebsiteGeneratorServiceImpl();
  
  useEffect(() => {
    const generatePreview = async () => {
      try {
        // Find the template from the templateId
        const template = {
          id: templateId,
          name: customizations.title || 'Website Template',
          category: customizations.category || 'general',
          title: customizations.title || 'Website Template'
        };
        
        // Generate the website code
        const generated = await generatorService.generateWebsite(template, customizations);
        
        setGeneratedCode({
          html: generated.html,
          css: generated.css,
          js: generated.js
        });
        
        // Create a preview HTML that combines everything
        const previewHtml = `
          <html>
            <head>
              <style>${generated.css}</style>
            </head>
            <body>
              ${generated.html}
              <script>${generated.js}</script>
            </body>
          </html>
        `;
        
        // Call the callback with the preview HTML if provided
        if (onPreviewUpdate) {
          onPreviewUpdate(previewHtml);
        }
      } catch (error) {
        console.error('Error generating website preview:', error);
      }
    };
    
    generatePreview();
  }, [templateId, customizations]);
  
  return (
    <div className="hidden">
      {/* This is a utility component that doesn't render UI */}
    </div>
  );
}
