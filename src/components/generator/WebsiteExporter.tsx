import React, { useState } from 'react';
import { WebsiteGeneratorServiceImpl } from './WebsiteGeneratorService';
import { TemplateCustomization, ExportOptions } from './types';
import { Template } from '../templates/templateData';

interface WebsiteExporterProps {
  template: Template;
  customization: TemplateCustomization;
}

export default function WebsiteExporter({ template, customization }: WebsiteExporterProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  
  const generatorService = new WebsiteGeneratorServiceImpl();
  
  const handleExport = async (options: ExportOptions) => {
    try {
      setIsExporting(true);
      setExportError(null);
      
      // Generate the website
      const generatedWebsite = await generatorService.generateWebsite(template, customization);
      
      // Export the website
      const url = await generatorService.exportWebsite(generatedWebsite, options);
      
      setExportUrl(url);
      setIsExporting(false);
    } catch (error) {
      setExportError('Failed to export website. Please try again.');
      setIsExporting(false);
      console.error('Export error:', error);
    }
  };
  
  const exportAsZip = () => {
    handleExport({
      format: 'zip',
      includeAssets: true,
      minify: true
    });
  };
  
  const deployWebsite = () => {
    handleExport({
      format: 'deploy',
      includeAssets: true,
      minify: true
    });
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-4">Export Your Website</h2>
      
      <div className="space-y-6">
        <div>
          <p className="mb-4">Choose how you want to export your customized website:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-dark-purple rounded-lg">
              <h3 className="font-heading font-bold mb-2">Download as ZIP</h3>
              <p className="text-sm mb-4">Get all the files needed to host your website anywhere.</p>
              <button 
                onClick={exportAsZip}
                disabled={isExporting}
                className="w-full py-2 bg-neon-blue text-black rounded font-bold"
              >
                {isExporting ? 'Preparing Download...' : 'Download ZIP'}
              </button>
            </div>
            
            <div className="p-4 bg-dark-purple rounded-lg">
              <h3 className="font-heading font-bold mb-2">Deploy Online</h3>
              <p className="text-sm mb-4">Publish your website online with one click.</p>
              <button 
                onClick={deployWebsite}
                disabled={isExporting}
                className="w-full py-2 bg-neon-blue text-black rounded font-bold"
              >
                {isExporting ? 'Deploying...' : 'Deploy Website'}
              </button>
            </div>
          </div>
        </div>
        
        {exportError && (
          <div className="p-4 bg-red-900 text-white rounded-lg">
            {exportError}
          </div>
        )}
        
        {exportUrl && (
          <div className="p-4 bg-green-900 text-white rounded-lg">
            <p className="mb-2">Your website is ready!</p>
            <a 
              href={exportUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-blue font-bold hover:underline"
            >
              {exportUrl.includes('download') ? 'Download Now' : 'Visit Your Website'}
            </a>
          </div>
        )}
        
        <div className="border-t border-dark-purple pt-4">
          <h3 className="font-heading font-bold mb-2">Advanced Options</h3>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="minify-code" className="mr-2" defaultChecked />
              <label htmlFor="minify-code">Minify code for faster loading</label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="include-assets" className="mr-2" defaultChecked />
              <label htmlFor="include-assets">Include all assets (images, fonts, etc.)</label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="include-source" className="mr-2" />
              <label htmlFor="include-source">Include source files for future editing</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
