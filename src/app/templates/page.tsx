"use client";

import { templates } from "@/components/templates/templateData";
import TemplateCard from "@/components/templates/TemplateCard";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Website Template</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              title={template.name}
              description={template.description}
              category={template.category}
              imageUrl={template.thumbnail}
              price={template.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
