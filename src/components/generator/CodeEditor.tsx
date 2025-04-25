import React, { useState } from 'react';
import { Template } from '../templates/templateData';
import { TemplateCustomization } from './types';

interface CodeEditorProps {
  template: Template;
  customization: TemplateCustomization;
  onCodeChange: (type: 'html' | 'css' | 'js', code: string) => void;
}

export default function CodeEditor({ template, customization, onCodeChange }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(customization.customHtml || '');
  const [cssCode, setCssCode] = useState(customization.customCss || '');
  const [jsCode, setJsCode] = useState(customization.customJs || '');
  
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setHtmlCode(newCode);
    onCodeChange('html', newCode);
  };
  
  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCssCode(newCode);
    onCodeChange('css', newCode);
  };
  
  const handleJsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setJsCode(newCode);
    onCodeChange('js', newCode);
  };
  
  return (
    <div className="bg-grey rounded-lg overflow-hidden">
      <div className="border-b border-dark-purple">
        <nav className="flex">
          <button
            className={`py-3 px-4 font-medium ${
              activeTab === 'html' 
                ? 'bg-dark-purple text-neon-blue border-b-2 border-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button
            className={`py-3 px-4 font-medium ${
              activeTab === 'css' 
                ? 'bg-dark-purple text-neon-blue border-b-2 border-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
          <button
            className={`py-3 px-4 font-medium ${
              activeTab === 'js' 
                ? 'bg-dark-purple text-neon-blue border-b-2 border-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('js')}
          >
            JavaScript
          </button>
        </nav>
      </div>
      
      <div className="p-4">
        {activeTab === 'html' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">HTML Editor</h3>
              <div className="flex space-x-2">
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Format</button>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Reset</button>
              </div>
            </div>
            <textarea
              value={htmlCode}
              onChange={handleHtmlChange}
              className="w-full h-96 bg-black text-white font-mono p-4 border border-dark-purple rounded"
              placeholder="Enter custom HTML here..."
            ></textarea>
          </div>
        )}
        
        {activeTab === 'css' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">CSS Editor</h3>
              <div className="flex space-x-2">
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Format</button>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Reset</button>
              </div>
            </div>
            <textarea
              value={cssCode}
              onChange={handleCssChange}
              className="w-full h-96 bg-black text-white font-mono p-4 border border-dark-purple rounded"
              placeholder="Enter custom CSS here..."
            ></textarea>
          </div>
        )}
        
        {activeTab === 'js' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">JavaScript Editor</h3>
              <div className="flex space-x-2">
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Format</button>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Reset</button>
              </div>
            </div>
            <textarea
              value={jsCode}
              onChange={handleJsChange}
              className="w-full h-96 bg-black text-white font-mono p-4 border border-dark-purple rounded"
              placeholder="Enter custom JavaScript here..."
            ></textarea>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-dark-purple bg-black">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400">
              {activeTab === 'html' ? 'HTML' : activeTab === 'css' ? 'CSS' : 'JavaScript'} Editor
            </span>
          </div>
          <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
