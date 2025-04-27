"use client";

import TemplateCard from "@/components/templates/TemplateCard";
import { templates } from "@/components/templates/templateData";

export default function TemplateGrid() {
  return (
    <div className="flex flex-wrap gap-8 justify-center p-8">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title || template.name} // Use title if it exists, fallback to name
          description={template.description}
          category={template.category}
          imageUrl={template.thumbnail} // <-- THIS IS THE FIX
          price={template.price}
          featured={template.tier === "elite" || template.tier === "ultimate"}
        />
      ))}
    </div>
  );
}
