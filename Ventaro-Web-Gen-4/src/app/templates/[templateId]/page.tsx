// filepath: /Users/ventaro/Ventaro-Web-Gen/src/app/templates/[templateId]/page.tsx
import React from 'react';

interface TemplateProps {
  headline: string;
  subtext: string;
  buttonText: string;
}

const Template: React.FC<TemplateProps> = ({ headline, subtext, buttonText }) => {
  return (
    <div className="template">
      <h1 className="text-2xl font-bold">{headline}</h1>
      <p className="text-lg">{subtext}</p>
      <button className="mt-4 p-2 bg-blue-500 text-white rounded">{buttonText}</button>
    </div>
  );
};

export default Template;