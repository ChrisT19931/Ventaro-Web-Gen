"use client";

import React, { useState } from "react";
import { templates } from "../../components/templates/templateData";
import WebsiteGeneratorService from "../../components/generator/WebsiteGeneratorService";

export default function CustomizeTemplatePage({ params }: { params: { id: string } }) {
  const templateId = params.id;
  const template = templates.find(t => t.id === templateId);
  const [customData, setCustomData] = useState(template?.defaults || {});

  if (!template) {
    return <div className="p-6 text-red-500">Template not found.</div>;
  }

  const handleGenerate = async () => {
    const result = await WebsiteGeneratorService.generate(templateId, customData);
    // do something with result...
    console.log(result);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-heading font-bold mb-4">
        Customize {template.name}
      </h1>
      {/* Render your customization form fields */}
      <div className="space-y-4 mb-6">
        {template.fields.map(field => (
          <div key={field.key}>
            <label className="block mb-1">{field.label}</label>
            <input
              type="text"
              value={(customData as any)[field.key] || ''}
              onChange={e =>
                setCustomData(prev => ({ ...prev, [field.key]: e.target.value }))
              }
              className="w-full px-3 py-2 bg-dark-purple rounded-md"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold"
      >
        Generate Site
      </button>
    </div>
  );
}
